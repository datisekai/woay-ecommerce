import { Request, Response } from "express";
import Joi from "joi";
import {
  convertJoiToString,
  showError,
  showInternal,
  showSuccess,
} from "../utils";
import Category from "../models/Category.model";
import { RequestHasLogin } from "../types/Request.type";

const categorySchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required(),
  status: Joi.boolean().default(true),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  slug: Joi.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: Joi.boolean(),
});

const CategoryController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const categories = await Category.findAll({
        where: {
          status: true,
        },
      });
      return showSuccess(res, categories);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  add: async (req: RequestHasLogin, res: Response) => {
    try {
      const { error, value } = categorySchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const isFoundSlug = await Category.findOne({
        where: {
          slug: value.slug,
        },
      });

      if (!isFoundSlug) {
        const newCategory = await Category.create({
          ...value,
          userId: req.userId,
        });
        return showSuccess(res, newCategory);
      }

      return showError(res, "slug already exist");
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

      const isFoundSlug = await Category.findOne({
        where: {
          slug: value.slug,
        },
      });

      if (!isFoundSlug) {
        await Category.update(value, {
          where: {
            id,
          },
        });
        return showSuccess(res);
      }

      return showError(res, "slug already exist");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await Category.update({ status: false }, { where: { id } });
      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default CategoryController