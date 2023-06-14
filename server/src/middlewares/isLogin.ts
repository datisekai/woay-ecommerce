import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { showNotAuthorized } from "../utils";
import User from "../models/User.model";
import { RequestHasLogin } from "../types/Request.type";
import config from "../config";

const isLogin = async (
  req: RequestHasLogin,
  res: Response,
  next: NextFunction
) => {
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
      });


      if (isFoundUser) {
        req.userId = isFoundUser.id;
        req.role = isFoundUser.role;
        next();
        return;
      }
    }

    return showNotAuthorized(res);
  } catch (error) {
    console.log(error);
    return showNotAuthorized(res);
  }
};

export default isLogin;
