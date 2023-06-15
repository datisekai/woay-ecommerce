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

const postSchema = Joi.object({
  title: Joi.string().max(255).required(),
  slug: Joi.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required(),
  status: Joi.boolean().default(true),
  description: Joi.string().max(255).required(),
  image: Joi.string().required(),
  blogId: Joi.number().integer().required(),
  body:Joi.string().required(),
});

const updateSchema = Joi.object({
  title: Joi.string().max(255),
  slug: Joi.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status: Joi.boolean(),
  description: Joi.string().max(255),
  image: Joi.string(),
  blogId: Joi.number().integer(),
  body:Joi.string(),
});

const PostController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const offset = (+page - 1) * +limit;

      const where: any = {
        status:true
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

      const posts = await Post.findAndCountAll({ where, offset, limit, order });

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
        const newPost = await Post.create({...value, userId:req.userId});
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

      const where: any = {
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

      const posts = await Post.findAndCountAll({ where, offset, limit, order });

      return showSuccess(res, { ...posts, offset, limit, order, blog });
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default PostController;
