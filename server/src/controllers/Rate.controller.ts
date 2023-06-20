import { Request, Response } from "express";
import {
  convertJoiToString,
  showError,
  showInternal,
  showSuccess,
} from "../utils";
import Rate from "../models/Rate.model";
import RateImage from "../models/RateImage.model";
import Joi from "joi";
import { RequestHasLogin } from "../types/Request.type";
import User from "../models/User.model";

const rateSchema = Joi.object({
  productId: Joi.number().integer().required(),
  star: Joi.number().integer().min(1).max(5).required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.array().items(Joi.string()).min(1).max(3).required(),
});

const updateSchema = Joi.object({
  star: Joi.number().integer().min(1).max(5),
  title: Joi.string(),
  description: Joi.string(),
  images: Joi.array().items(Joi.string()).min(1).max(3),
});

const RateController = {
  getAllByProductId: async (req: Request, res: Response) => {
    try {
      const productId = req.params.productId;

      const rates = await Rate.findAll({
        where: { productId: productId },
        include: [{ model: RateImage },{model:User, attributes:['id','name','email']}],
      });

      return showSuccess(res, rates);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  add: async (req: RequestHasLogin, res: Response) => {
    try {
      const productId = req.params.productId;
      const { error, value } = rateSchema.validate({ ...req.body, productId });

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const newRate = await Rate.create({
        productId: value.productId,
        userId: req.userId,
        title: value.title,
        description: value.description,
        star: value.star,
      });

      await RateImage.bulkCreate(
        value.images.map((item: any) => ({ rateId: newRate.id, src: item }))
      );

      const result = await Rate.findOne({
        where: { id: newRate.id },
        include: [
          { model: RateImage },
          { model: User, attributes: ["email", "name"] },
        ],
      });

      return showSuccess(res, result);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  update: async (req: RequestHasLogin, res: Response) => {
    try {
      const id = req.params.id;

      const { error, value } = updateSchema.validate(req.body);

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const currentRate = await Rate.findByPk(id);
      if (!currentRate) {
        return showError(res, "rateId is invalid");
      }

      if (currentRate.userId !== req.userId) {
        return showError(res, "you do not have access");
      }

      if (value.images) {
        await RateImage.destroy({ where: { rateId: id } });
        await RateImage.bulkCreate(
          value.images.map((item:string) => ({ rateId: id, src: item }))
        );
        delete value["images"];
      }

      await Rate.update(value, { where: { id } });
      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  delete: async (req: RequestHasLogin, res:Response) => {
    try {
      const id = req.params.id;

      const currentRate = await Rate.findByPk(id);
      if (!currentRate) {
        return showError(res, "rateId is invalid");
      }

      if (currentRate.userId !== req.userId) {
        return showError(res, "you do not have access");
      }

      await Rate.destroy({ where: { id } });

      return showSuccess(res);

    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default RateController;
