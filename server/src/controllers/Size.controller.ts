import { Request, Response } from "express";
import {
  convertJoiToString,
  showError,
  showInternal,
  showSuccess,
} from "../utils";
import Joi from "joi";
import Size from "../models/Size.model";
import Sku from "../models/SKU.model";

const sizeSchema = Joi.object({
  name: Joi.string().required(),
});

const SizeController = {
  add: async (req: Request, res: Response) => {
    try {
      const { error, value } = sizeSchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const newSize = await Size.create(value);

      return showSuccess(res, newSize);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await Size.update(
        { name: req.body.name },
        {
          where: {
            id,
          },
        }
      );
      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const skuOfSize = await Sku.findAll({ where: { sizeId: id } });

      if (skuOfSize.length > 0) {
        return showError(
          res,
          `There are ${skuOfSize.length} sku containing this size`
        );
      }

      await Size.destroy({ where: { id } });
      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  getAll:async(req:Request, res:Response) => {
    try {
        const sizes = await Size.findAll(); 

        return showSuccess(res, sizes)
    } catch (error) {
        return showInternal(res, error)
    }
  }
};

export default SizeController;
