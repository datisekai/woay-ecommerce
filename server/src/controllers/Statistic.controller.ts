import { Request, Response } from "express";
import Order from "../models/Order.model";
import Post from "../models/Post.model";
import Product from "../models/Product.model";
import User from "../models/User.model";
import { showInternal, showSuccess } from "../utils";

const StatisticController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const [countUser, countProduct, countPost, countOrder] =
        await Promise.all([
          User.count(),
          Product.count({ where: { isDeleted: false } }),
          Post.count(),
          Order.count(),
        ]);
    
        return showSuccess(res, {countUser, countProduct, countPost, countOrder})
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default StatisticController;
