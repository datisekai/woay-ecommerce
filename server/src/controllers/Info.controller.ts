import { Request, Response } from "express";
import {
  convertJoiToString,
  showError,
  showInternal,
  showSuccess,
} from "../utils";
import Joi from "joi";
import { RequestHasLogin } from "../types/Request.type";
import Info from "../models/Info.model";

const infoSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().regex(/^\d{10,11}$/),
  isDefault: Joi.boolean().default(false),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  address: Joi.string(),
  phone: Joi.string().regex(/^\d{10,11}$/),
  isDefault: Joi.boolean(),
});

const InfoController = {
  getAll: async (req: RequestHasLogin, res: Response) => {
    try {
      const userId = req.userId;
      const listInfo = await Info.findAll({
        where: {
          userId,
        },
        order: [["createdAt", "DESC"]],
      });

      return showSuccess(res, listInfo);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  add: async (req: RequestHasLogin, res: Response) => {
    try {
      const { error, value } = infoSchema.validate(req.body);

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const id = req.userId;

      const newInfo = await Info.create({
        ...value,
        userId: id,
        createdAt: Date.now(),
      });

      return showSuccess(res, newInfo);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  update: async (req: RequestHasLogin, res: Response) => {
    try {
      const infoId = req.params.id;
      const { error, value } = updateSchema.validate(req.body);

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const userId = req.userId;
      const foundInfo = await Info.findByPk(infoId);
      if (foundInfo && foundInfo.userId === userId) {
        await Info.update(value, { where: { id: infoId } });
        return showSuccess(res);
      }

      return showError(res, "id is invalid");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  delete: async (req: RequestHasLogin, res: Response) => {
    try {
      const infoId = req.params.id;

      const userId = req.userId;
      const foundInfo = await Info.findByPk(infoId);

      if (foundInfo && foundInfo.userId === userId) {
        await Info.destroy({
          where: {
            id: infoId,
          },
        });
        return showSuccess(res);
      }

      return showError(res, "id is invalid");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  setDefault: async (req: RequestHasLogin, res: Response) => {
    try {
      const id = req.params.id;

      const foundInfo = await Info.findByPk(id);

      if (foundInfo) {
        await Info.update(
          { isDefault: false },
          { where: { userId: req.userId } }
        );
        await Info.update({ isDefault: true }, { where: { id } });
        return showSuccess(res)
      }

      return showError(res, "id is invalid");
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default InfoController;
