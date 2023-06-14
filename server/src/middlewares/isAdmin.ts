import { NextFunction, Response } from "express";
import { RequestHasLogin } from "../types/Request.type";
import { showNotAuthorized } from "../utils";

const isAdmin = (req: RequestHasLogin, res: Response, next: NextFunction) => {
  if (req.role && req.role === "admin") {
    next();
    return;
  }

  return showNotAuthorized(res);
};

export default isAdmin