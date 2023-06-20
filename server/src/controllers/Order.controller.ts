import { Request, Response } from "express";
import { RequestHasLogin } from "../types/Request.type";
import {
  convertJoiToString,
  showError,
  showInternal,
  showSuccess,
} from "../utils";
import Order from "../models/Order.model";
import OrderDetail from "../models/OrderDetail.model";
import { Op } from "sequelize";
import Joi from "joi";
import Variant from "../models/Variant.model";
import Info from "../models/Info.model";
import Product from "../models/Product.model";
import Color from "../models/Color.model";
import Size from "../models/Size.model";

const orderSchema = Joi.object({
  variants: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .min(1)
    .required(),

  infoId: Joi.number().integer().required(),
});

const updateSchema = Joi.object({
  status: Joi.string().valid(...["1", "2", "0"]),
});

const OrderController = {
  getMyOrder: async (req: RequestHasLogin, res: Response) => {
    try {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const offset = (+page - 1) * +limit;

      const orders = await Order.findAndCountAll({
        where: { userId: req.userId },
        include: [
          {
            model: OrderDetail,
            include: [
              {
                model: Variant,
                include: [
                  { model: Product },
                  { model: Color },
                  { model: Size },
                ],
              },
            ],
          },
          { model: Info },
        ],
        offset,
        order: [["createdAt", "DESC"]],
        distinct:true
      });

      return showSuccess(res, { ...orders, offset, limit, page });
    } catch (error) {
      return showInternal(res, error);
    }
  },
  getAllOrder: async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const offset = (+page - 1) * +limit;

      const where: any = {};

      if (req.query.status) {
        where.status = req.query.status;
      }

      if (req.query.userId) {
        where.userId = +req.query.userId;
      }

      if (req.query.startDate && req.query.endDate) {
        const startDate = new Date(req.query.startDate as string);
        const endDate = new Date(req.query.endDate as string);
        where.createdAt = {
          [Op.between]: [startDate, endDate],
        };
      }

      const orders = await Order.findAndCountAll({
        where,
        order: [["createdAt", "DESC"]],
        offset,
        include: [
          {
            model: OrderDetail,
            include: [
              {
                model: Variant,
                include: [
                  { model: Product },
                  { model: Color },
                  { model: Size },
                ],
              },
            ],
          },
          { model: Info },
        ],
        distinct:true
      });

      return showSuccess(res, { ...orders, limit, page, offset });
    } catch (error) {
      return showInternal(res, error);
    }
  },
  add: async (req: RequestHasLogin, res: Response) => {
    try {
      const userId = req.userId;
      const { error, value } = orderSchema.validate(req.body);

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const variants = await Variant.findAll({
        where: {
          id: value.variants.map((item: any) => item.id),
        },
      });

      if (variants.length > 0) {
        const listVariants = variants.map((item: any, index: number) => ({
          ...item.dataValues,
          quantity: value.variants[index].quantity,
        }));
        const total = listVariants.reduce(
          (pre: any, cur: any) => pre + cur.price * cur.quantity,
          0
        );

        const order = await Order.create({
          userId,
          total,
          infoId: value.infoId,
        });

        await OrderDetail.bulkCreate(
          listVariants.map((variant: any, index: number) => ({
            orderId: order.id,
            price: variant.price,
            quantity: variant.quantity,
            variantId: variant.id,
          }))
        );

        return showSuccess(res, order);
      }

      return showError(res, "no product");
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

      const currentOrder = await Order.findByPk(id, { include: [OrderDetail] });
      if (!currentOrder) {
        return showError(res, "id is invalid");
      }

      if (value.status) {
        if (value.status == "2" && currentOrder.status == "1") {
          //giao thành công
          const variants = currentOrder.OrderDetails.map((item: any) => ({
            id: item.variantId,
            quantity: item.quantity,
          }));
          await Promise.all(
            variants.map((item: any) =>
              Variant.decrement("quantity", {
                by: item.quantity,
                where: { id: item.id },
              })
            )
          );
        }
        await Order.update(
          {
            status: value.status,
            updatedAt: Date.now(),
            employeeId: req.userId,
          },
          { where: { id } }
        );

        const result = await Order.findByPk(id, {
          include: [{ model: OrderDetail }, { model: Info }],
        });
        return showSuccess(res, result);
      }

      return showError(res, "req.body is empty");
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default OrderController;
