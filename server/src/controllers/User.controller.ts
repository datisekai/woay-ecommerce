import User from "../models/User.model";
import {
  convertJoiToString,
  showError,
  showInternal,
  showNotAuthorized,
  showNotFound,
  showSuccess,
} from "../utils";
import Joi from "joi";
import { Request, Response } from "express";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../config";

const userSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().default("Chưa có"),
  date: Joi.date(),
  phone: Joi.string().allow(null, ""),
  active: Joi.boolean().default(true),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const UserController = {
  getAll: async (req: Request, res: Response) => {
    const limit = req.query.limit || 8;
    const page = req.query.page || 1;
    const offset = (+page - 1) * +limit;

    const where: any = {
      active: true,
    };

    const users = await User.findAndCountAll({
      where,
      offset,
      limit,
      order:[['createdAt','DESC']],
      attributes:{
        exclude:['password']
      }
    });


   return showSuccess(res, {...users, page, limit, offset})
  },
  add: async (req: Request, res: Response) => {
    try {
      const { error, value } = userSchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const isFoundUser = await User.findOne({
        where: {
          email: value.email,
        },
      });
      if (!isFoundUser) {
        const hashPassword = await argon2.hash(value.password);
        const newUser = await User.create({ ...value, password: hashPassword });

        return showSuccess(res, newUser);
      }

      return showError(res, "Email already exists");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { error, value } = loginSchema.validate(req.body);

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const isFoundUser = await User.findOne({
        where: {
          email: value.email,
        },
      });

      if (isFoundUser) {
        const verify = await argon2.verify(
          isFoundUser.password,
          value.password
        );
        if (verify) {
          const token = jwt.sign(
            { id: isFoundUser.id, email: isFoundUser.email },
            config.jwt,
            { expiresIn: "1d" }
          );

          return showSuccess(res, { token });
        }

        return showError(res, "Email or password is invalid");
      }

      return showError(res, "Email is not exist");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  register: async (req: Request, res: Response) => {
    try {
      const { error, value } = loginSchema.validate(req.body);

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const isFoundUser = await User.findOne({
        where: {
          email: value.email,
        },
      });

      if (!isFoundUser) {
        const hashPassword = await argon2.hash(value.password);
        const newUser = await User.create({
          ...value,
          password: hashPassword,
          role: "user",
        });

        const token = jwt.sign(
          { id: newUser.id, email: newUser.email },
          config.jwt,
          { expiresIn: "1d" }
        );

        return showSuccess(res, { token });
      }

      return showError(res, "Email already exist");
    } catch (err) {
      return showInternal(res, err);
    }
  },
  getInfoByToken: async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return showNotAuthorized(res);
    }

    try {
      const decode: any = jwt.verify(token, config.jwt);

      if (decode) {
        const isFoundUser: any = await User.findByPk(decode.id, {
          where: {
            active: true,
          },
          attributes: {
            exclude: ["password"],
          },
        });

        if (isFoundUser) {
          return showSuccess(res, isFoundUser);
        }
      }

      return showNotAuthorized(res);
    } catch (error) {
      return showNotAuthorized(res);
    }
  },
  getUserById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const foundUser = await User.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });

      if (foundUser) {
        return showSuccess(res, foundUser);
      }

      return showNotFound(res);
    } catch (error) {}
  },
};

export default UserController;
