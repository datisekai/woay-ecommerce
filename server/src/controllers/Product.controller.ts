import { Request, Response } from "express";
import Joi from "joi";
import { Op, Sequelize } from "sequelize";
import Category from "../models/Category.model";
import Product from "../models/Product.model";
import ProductImage from "../models/ProductImage.model";
import Sku from "../models/SKU.model";
import { RequestHasLogin } from "../types/Request.type";
import {
  convertJoiToString,
  showError,
  showInternal,
  showSuccess,
} from "../utils";
import Size from "../models/Size.model";
import Color from "../models/Color.model";
import OrderDetail from "../models/OrderDetail.model";

const productSchema = Joi.object({
  slug: Joi.string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.array().items(Joi.string()),
  category: Joi.number().required(),
  status: Joi.boolean().default(true),
  skus: Joi.array().items(
    Joi.object({
      colorId: Joi.number().integer().required(),
      sizeId: Joi.number().integer().required(),
      price: Joi.number().min(0).required(),
      quantity: Joi.number().integer().required(),
      discount: Joi.number().integer().default(0).min(0).max(100),
      thumbnail: Joi.string().required(),
    })
  ),
});

const updateSkuSchema = Joi.object({
  colorId: Joi.number().integer(),
  sizeId: Joi.number().integer(),
  price: Joi.number().min(0),
  quantity: Joi.number().integer(),
  discount: Joi.number().integer().default(0).min(0).max(100),
  thumbnail: Joi.string(),
});

const updateProductSchema = Joi.object({
  slug: Joi.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: Joi.string(),
  description: Joi.string(),
  category: Joi.number(),
  status: Joi.boolean(),
  images: Joi.array().items(Joi.string()),
});

const ProductController = {
  getAll: async (req: RequestHasLogin, res: Response) => {
    try {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const offset = (+page - 1) * +limit;

      const order: any = [];

      const where: any = {
        status: true,
      };

      if (req.query.category) {
        const category = await Category.findOne({
          where: { slug: req.query.category },
        });
        if (category) {
          where.categoryId = category.id;
        }
      }

      if (req.query.name) {
        where.name = {
          [Op.iLike]: `%${req.query.name}%`,
        };
      }

      if (req.query.sort) {
        switch (req.query.sort) {
          case "createdAt-asc":
            order.push(["createdAt", "ASC"]);
            break;
          case "createdAt-desc":
            order.push(["createdAt", "DESC"]);
            break;
          case "name-desc":
            order.push(["name", "DESC"]);
            break;
          case "name-asc":
            order.push(["name", "ASC"]);
            break;
        }
      }

      const products = await Product.findAndCountAll({
        where,
        order,
        offset,
        limit,
        include: [{ model: ProductImage }, { model: Sku }],
        distinct: true,
      });

      return showSuccess(res, { ...products, offset, limit, page });
    } catch (error) {
      return showInternal(res, error);
    }
  },
  add: async (req: RequestHasLogin, res: Response) => {
    try {
      const { error, value } = productSchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const { slug, name, description, categoryId, images, status, skus } =
        value;

      const foundSlug = await Product.findOne({
        where: {
          slug,
        },
      });

      if (!foundSlug) {
        const product = await Product.create({
          name,
          slug,
          description,
          categoryId,
          status,
          userId: req.userId,
        });

        await ProductImage.bulkCreate(
          images.map((image: string) => ({
            product_id: product.id,
            src: image,
          }))
        );

        await Sku.bulkCreate(
          skus.map((item: any) => ({ ...item, productId: product.id }))
        );

        const result = await Product.findOne({
          where: {
            id: product.id,
          },
          include: [{ model: ProductImage }],
        });
        return showSuccess(res, result);
      }

      return showError(res, "slug already exist");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  getAllByAdmin: async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const offset = (+page - 1) * +limit;

      const order: any = [];

      const where: any = {};

      if (req.query.category) {
        const category = await Category.findOne({
          where: { slug: req.query.category },
        });
        if (category) {
          where.categoryId = category.id;
        }
      }

      if (req.query.name) {
        where.name = {
          [Op.iLike]: `%${req.query.name}%`,
        };
      }

      if (req.query.sort) {
        switch (req.query.sort) {
          case "price-asc":
            order.push(["price", "ASC"]);
            break;
          case "price-desc":
            order.push(["price", "DESC"]);
            break;
          case "createdAt-asc":
            order.push(["createdAt", "ASC"]);
            break;
          case "createdAt-desc":
            order.push(["createdAt", "DESC"]);
            break;
          case "name-desc":
            order.push(["name", "DESC"]);
            break;
          case "name-asc":
            order.push(["name", "ASC"]);
            break;
        }
      }

      const products = await Product.findAndCountAll({
        where,
        order,
        offset,
        limit,
        include: [{ model: ProductImage }, { model: Sku }],
        distinct: true,
      });

      return showSuccess(res, { ...products, offset, limit, page });
    } catch (error) {
      return showInternal(res, error);
    }
  },
  getAllSku: async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const offset = (+page - 1) * +limit;

      const order: any = [];

      const skus = await Sku.findAndCountAll({
        include: [
          { model: Product, where: { status: true } },
          { model: Size },
          { model: Color },
        ],
        offset,
        limit,
        distinct: true,
      });

      if (req.query.sort) {
        switch (req.query.sort) {
          case "createdAt-asc":
            order.push(["createdAt", "ASC"]);
            break;
          case "createdAt-desc":
            order.push(["createdAt", "DESC"]);
            break;
          case "name-desc":
            order.push(["name", "DESC"]);
            break;
          case "name-asc":
            order.push(["name", "ASC"]);
            break;
        }
      }

      return showSuccess(res, skus);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  getProductBySlug: async (req: Request, res: Response) => {
    try {
      const slug = req.params.slug;

      const product = await Product.findOne({
        where: {
          slug,
          status: true,
        },
        include: [
          { model: Sku, include: [{ model: Color }, { model: Size }] },
          { model: ProductImage },
        ],
      });

      if (product) {
        return showSuccess(res, product);
      }

      return showError(res, "slug is invalid");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const { error, value } = updateProductSchema.validate(req.body);

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      if (value.images && value.images.length > 0) {
        await ProductImage.destroy({
          where: {
            product_id: id,
          },
        });

        await ProductImage.bulkCreate(
          value.images.map((item: any) => ({ src: item, product_id: id }))
        );
      }

      await Product.update(value, { where: { id } });

      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  updateSKU: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const { error, value } = updateSkuSchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      await Sku.update(value, { where: { id } });

      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  deleteSKU: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const foundOrder = await OrderDetail.count({
        where: {
          skuId: id,
        },
      });

      if (!foundOrder) {
        await Sku.destroy({ where: { id } });
        return showSuccess(res);
      }

      return showError(
        res,
        `There are ${foundOrder} sku containing this color`
      );
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default ProductController;
