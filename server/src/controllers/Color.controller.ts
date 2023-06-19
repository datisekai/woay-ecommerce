import { Request, Response } from "express";
import {
  convertJoiToString,
  showError,
  showInternal,
  showSuccess,
} from "../utils";
import Joi from "joi";
import Color from "../models/Color.model";
import Variant from "../models/Variant.model";

const colorSchema = Joi.object({
  name: Joi.string().required(),
});

const ColorController = {
  add: async (req: Request, res: Response) => {
    try {
      const { error, value } = colorSchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const newColor = await Color.create(value);

      return showSuccess(res, newColor);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await Color.update(
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

      const skuOfColor = await Variant.count({ where: { colorId: id } });

      if (skuOfColor > 0) {
        return showError(
          res,
          `There are ${skuOfColor} variant containing this color`
        );
      }

      await Color.destroy({ where: { id } });
      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const colors = await Color.findAll({ order:[['createdAt','DESC']] });

      return showSuccess(res, colors);
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default ColorController;
