import { Request, Response } from "express";
import Joi from "joi";
import Blog from "../models/Blog.model";
import Post from "../models/Post.model";
import { RequestHasLogin } from "../types/Request.type";
import {
  convertJoiToString,
  showError,
  showInternal,
  showSuccess,
} from "../utils";

const blogSchema = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required(),
  isDeleted: Joi.boolean().default(false),
});

const updateSchema = Joi.object({
  title: Joi.string(),
  slug: Joi.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  isDeleted: Joi.boolean(),
});

const BlogController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const blogs = await Blog.findAll({
        where: {
          isDeleted: false,
        },
        order:[['createdAt','DESC']]
      });
      return showSuccess(res, blogs);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  add: async (req: RequestHasLogin, res: Response) => {
    try {
      const { error, value } = blogSchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const isFoundSlug = await Blog.findOne({
        where: {
          slug: value.slug,
        },
      });

      if (!isFoundSlug) {
        const newBlog = await Blog.create({
          ...value,
          userId: req.userId,
        });
        return showSuccess(res, newBlog);
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
        const isFoundSlug = await Blog.findOne({
          where: {
            slug: value.slug,
          },
        });

        if (isFoundSlug) {
          return showError(res, "slug already exist");
        }
      }

      await Blog.update(value, {
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

      const foundPost = await Post.count({ where: { blogId: id } });

      if (foundPost > 0) {
        return showError(
          res,
          `There are ${foundPost} sku containing this color`
        );
      }

      await Blog.update({ isDeleted: true }, { where: { id } });
      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default BlogController;
