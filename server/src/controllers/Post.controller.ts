import { Request, Response } from "express";
import {
  convertJoiToString,
  showError,
  showInternal,
  showSuccess,
} from "../utils";
import Blog from "../models/Blog.model";
import { Op } from "sequelize";
import Post from "../models/Post.model";
import Joi from "joi";
import { RequestHasLogin } from "../types/Request.type";
import Category from "../models/Category.model";

const postSchema = Joi.object({
  title: Joi.string().max(255).required(),
  slug: Joi.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required(),
  isDeleted: Joi.boolean().default(false),
  description: Joi.string().max(255).required(),
  image: Joi.string().required(),
  blogId: Joi.number().integer().required(),
  body: Joi.string().required(),
});

const updateSchema = Joi.object({
  title: Joi.string().max(255),
  slug: Joi.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  isDeleted: Joi.boolean(),
  description: Joi.string().max(255),
  image: Joi.string(),
  blogId: Joi.number().integer(),
  body: Joi.string(),
});

const PostController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const offset = (+page - 1) * +limit;

      const where: any = {
        isDeleted: false,
      };

      let blog;

      let order: any = [["createdAt", "DESC"]];

      if (req.query.blog) {
        blog = await Blog.findOne({
          where: {
            slug: req.query.blog,
          },
        });

        if (blog) {
          where.blogId = blog.id;
        }
      }

      if (req.query.title) {
        where.title = {
          [Op.iLike]: `%${req.query.title}%`,
        };
      }

      if (req.query.sort) {
        switch (req.query.sort) {
          case "createdAt-asc":
            order = [["createdAt", "ASC"]];
            break;
          case "createdAt-desc":
            order = [["createdAt", "DESC"]];
            break;
        }
      }

      const posts = await Post.findAndCountAll({
        where,
        offset,
        limit,
        order,
        include: [{ model: Blog }],
      });

      return showSuccess(res, { ...posts, offset, limit, order, blog });
    } catch (error) {
      return showInternal(res, error);
    }
  },
  add: async (req: RequestHasLogin, res: Response) => {
    try {
      const { error, value } = postSchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const foundSlug = await Post.findOne({ where: { slug: value.slug } });

      if (!foundSlug) {
        const newPost = await Post.create({ ...value, userId: req.userId });
        return showSuccess(res, newPost);
      }

      return showError(res, "slug already exist");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const { error, value } = updateSchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      await Post.update(value, { where: { id } });

      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      await Post.destroy({ where: { id } });
      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  getAllByAdmin: async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const offset = (+page - 1) * +limit;

      const where: any = {};

      let blog;

      let order: any = [["createdAt", "DESC"]];

      if (req.query.blog) {
        blog = await Blog.findOne({
          where: {
            slug: req.query.blog,
          },
        });

        if (blog) {
          where.blogId = blog.id;
        }
      }

      if (req.query.title) {
        where.title = {
          [Op.iLike]: `%${req.query.title}%`,
        };
      }

      if (req.query.sort) {
        switch (req.query.sort) {
          case "createdAt-asc":
            order = [["createdAt", "ASC"]];
            break;
          case "createdAt-desc":
            order = [["createdAt", "DESC"]];
            break;
        }
      }

      const posts = await Post.findAndCountAll({ where, offset, limit, order, include:[{model:Blog}] });

      return showSuccess(res, { ...posts, offset, limit, order, blog });
    } catch (error) {
      return showInternal(res, error);
    }
  },
  getPostBySlug: async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;
      const post = await Post.findOne({
        where: { slug },
        include: [{ model: Blog }],
      });

      if (post) {
        return showSuccess(res, post);
      }

      return showError(res, "slug is invalid");
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default PostController;
