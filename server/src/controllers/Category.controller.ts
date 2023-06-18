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
import Product from "../models/Product.model";

const categorySchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required(),
  isDeleted: Joi.boolean().default(false),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  slug: Joi.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  isDeleted: Joi.boolean(),
});

const CategoryController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const categories = await Category.findAll({
        where: {
          isDeleted: false,
        },
        order: [["createdAt", "DESC"]],
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

      if (value.slug) {
        const isFoundSlug = await Category.findOne({
          where: {
            slug: value.slug,
          },
        });

        if (isFoundSlug) {
          return showError(res, "slug already exist");
        }
      }

      await Category.update(value, {
        where: {
          id,
        },
      });
      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const foundProduct = await Product.count({ where: { categoryId: id } });

      if (foundProduct > 0) {
        return showError(
          res,
          `There are ${foundProduct} sku containing this color`
        );
      }

      await Category.update({ isDeleted: true }, { where: { id } });
      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default CategoryController;
