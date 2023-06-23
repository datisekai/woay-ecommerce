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
import { RequestHasLogin } from "../types/Request.type";
import { Op } from "sequelize";
import { transporter } from "../config/mail";
import { auth } from "../config/firebase";

const userSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().default("Chưa có"),
  date: Joi.date(),
  phone: Joi.string().regex(/^\d{10,11}$/),
  isActive: Joi.boolean().default(true),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateSchema = Joi.object({
  role: Joi.string().valid("user", "admin"),
  password: Joi.string(),
  name: Joi.string(),
  date: Joi.date(),
  phone: Joi.string().regex(/^\d{10,11}$/),
  isActive: Joi.boolean(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  password: Joi.string().required(),
});

const UserController = {
  getAll: async (req: Request, res: Response) => {
    const limit = req.query.limit || 8;
    const page = req.query.page || 1;
    const offset = (+page - 1) * +limit;

    const where: any = {};

    if (req.query.name) {
      where.name = {
        [Op.iLike]: `%${req.query.name}%`,
      };
    }

    if (req.query.email) {
      where.email = {
        [Op.iLike]: `%${req.query.email}%`,
      };
    }

    if (req.query.role) {
      where.role = {
        [Op.iLike]: `%${req.query.role}%`,
      };
    }

    if (req.query.phone) {
      where.phone = {
        [Op.iLike]: `%${req.query.phone}%`,
      };
    }

    const users = await User.findAndCountAll({
      where,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"],
      },
    });

    return showSuccess(res, { ...users, page, limit, offset });
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
        if (!isFoundUser.isActive) {
          return showError(
            res,
            "The account has not been activated or has been locked"
          );
        }

        if (!isFoundUser.password) {
          return showError(res, "Email or password is invalid");
        }

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
        const currentUser = await User.create({
          ...value,
          password: hashPassword,
          role: "user",
          isActive: false,
        });

        const token = jwt.sign(
          { id: currentUser.id, email: currentUser.email },
          config.jwt,
          { expiresIn: "1d" }
        );

        const url = `${config.feUrl}/verify-email?token=${token}`;

        const emailBody = `
        <h2>Xác minh địa chỉ email</h2>
        <p>Xin chào ${currentUser.email},</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấp vào liên kết bên dưới để xác minh địa chỉ email của bạn:</p>
        <p><a href="${url}">Verify Link</a></p>
        <p>Nếu bạn không yêu cầu xác minh địa chỉ email, xin vui lòng bỏ qua email này.</p>
        <p>Trân trọng,</p>
        <p>Đội ngũ quản trị</p>
      `;

        const options = {
          from: "Woay-Ecommerce Authentication",
          to: currentUser.email,
          subject: "Woay-Ecommerce - Xác thực email",
          html: emailBody,
        };

        await transporter.sendMail(options);

        return showSuccess(res);
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
            isActive: true,
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

      if (value?.email) {
        delete value["email"];
      }

      if (value.password) {
        const hashPassword = await argon2.hash(value.password);
        value.password = hashPassword;
      }

      await User.update(value, {
        where: {
          id,
        },
      });

      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  updateMyInfo: async (req: RequestHasLogin, res: Response) => {
    try {
      const id = req.userId;
      const { error, value } = updateSchema.validate(req.body);

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      if (value?.email) {
        delete value["email"];
      }

      if (value.password) {
        const hashPassword = await argon2.hash(value.password);
        value.password = hashPassword;
      }

      if (value.date) {
        value.date = new Date(value.date);
      }

      await User.update(value, {
        where: { id },
      });

      return showSuccess(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const foundUser = await User.findByPk(id);
      if (foundUser) {
        await User.update({ isActive: false }, { where: { id } });
        return showSuccess(res);
      }

      return showError(res, "id is invalid");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { error, value } = forgotPasswordSchema.validate(req.body);
      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const currentUser = await User.findOne({ where: { email: value.email } });

      if (currentUser) {
        const token = jwt.sign(
          { id: currentUser.id, email: currentUser.email },
          config.jwt,
          { expiresIn: "1d" }
        );

        const url = `${config.feUrl}/reset-password?token=${token}`;
        const emailBody = `
    <h2>Yêu cầu đặt lại mật khẩu</h2>
    <p>Xin chào ${currentUser.email},</p>
    <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản của mình. Vui lòng nhấp vào liên kết bên dưới để tiến hành đặt lại mật khẩu:</p>
    <p><a href="${url}">Reset Link</a></p>
    <p>Nếu bạn không yêu cầu đặt lại mật khẩu, xin vui lòng bỏ qua email này.</p>
    <p>Trân trọng,</p>
    <p>Đội ngũ quản trị</p>
  `;

        const options = {
          from: "Woay-Ecommerce Authentication",
          to: currentUser.email,
          subject: "Woay-Ecommerce - Quên mật khẩu",
          html: emailBody,
        };

        await transporter.sendMail(options);

        return showSuccess(res);
      }

      return showError(res, "Email is invalid");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  resetPassword: async (req: Request, res: Response) => {
    try {
      const token = req.params.token;
      const { error, value } = resetPasswordSchema.validate(req.body);

      if (error) {
        return showError(res, convertJoiToString(error));
      }

      const decodedToken: any = jwt.verify(token, config.jwt);
      const userId = decodedToken.id;

      const foundUser = await User.findByPk(userId);
      if (foundUser) {
        const hashPassword = await argon2.hash(value.password);
        foundUser.password = hashPassword;
        await foundUser.save();
        return showSuccess(res);
      }

      return showNotAuthorized(res);
    } catch (error) {
      return showError(res, "Incorrect or expired token");
    }
  },
  verifyEmail: async (req: Request, res: Response) => {
    try {
      const token = req.query.token as string;

      if (!token) {
        return showError(res, "Token is required");
      }

      const decode: any = jwt.verify(token, config.jwt);
      const id = decode.id;

      const currentUser: any = await User.findByPk(id);
      if (!currentUser) {
        return showError(res, "User is invalid");
      }

      currentUser.isActive = true;
      await currentUser.save();

      const tokenLogin = jwt.sign(
        { id: currentUser.id, email: currentUser.email },
        config.jwt,
        { expiresIn: "1d" }
      );

      return showSuccess(res, { token: tokenLogin });
    } catch (error) {
      return showInternal(res, error);
    }
  },
  loginGoogle: async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      if (!token) {
        return showNotAuthorized(res);
      }

      const verify = await auth.verifyIdToken(token);

      const currentUser: any = await User.findOne({
        where: {
          email: verify.email,
        },
      });

      if (currentUser) {
        if (!currentUser.isActive) {
          return showError(res, "User blocked, please contact admin");
        }
        const accessToken = await jwt.sign(
          { id: currentUser.id, email: currentUser.email },
          config.jwt,
          {
            expiresIn: "1d",
          }
        );

        return showSuccess(res, { token: accessToken });
      }

      const newUser = await User.create({
        email: verify.email,
        isActive: true,
        name: verify.name,
        role: "user",
      });
      const accessToken = await jwt.sign(
        { id: newUser.id, email: newUser.email },
        config.jwt,
        {
          expiresIn: "1d",
        }
      );

      return showSuccess(res, { token: accessToken });
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default UserController;
