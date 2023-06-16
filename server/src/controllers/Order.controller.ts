import { Request, Response } from "express";
import { RequestHasLogin } from "../types/Request.type";
import { convertJoiToString, showError, showInternal, showSuccess } from "../utils";
import Order from "../models/Order.model";
import OrderDetail from "../models/OrderDetail.model";
import { Op } from "sequelize";
import Joi from "joi";
import Variant from "../models/Variant.model";

const orderSchema = Joi.object({
    variants:Joi.array().items(Joi.object({
        id:Joi.number().integer().required(),
        quantity:Joi.number().integer().min(1).required()
    })).min(1).required()
})

const OrderController = {
  getMyOrder: async (req: RequestHasLogin, res: Response) => {
    try {
      const limit = req.query.limit || 8;
      const page = req.query.page || 1;
      const offset = (+page - 1) * +limit;

      const orders = await Order.findAndCountAll({
        where: { userId: req.userId },
        include: [{ model: OrderDetail }],
        offset,
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
      });

      return showSuccess(res, { ...orders, limit, page, offset });
    } catch (error) {
      return showInternal(res, error);
    }
  },
  add:async(req:RequestHasLogin, res:Response) => {
    try {
        const userId = req.userId;
        const {error, value} = orderSchema.validate(req.body)

        if(error){
            return showError(res, convertJoiToString(error));
        }

        const variants = await Variant.findAll({where:{
            id:value.variant.map((item:any) => item.id)
        }})

        if(variants.length > 0){
            const total = variants.reduce((pre, cur) => pre + cur.price,0)
            await Order.create({
                userId,
                total,
            })


        }

        return showError(res, "no product")

    } catch (error) {
        return showInternal(res, error)
    }
  }
};

export default OrderController;
