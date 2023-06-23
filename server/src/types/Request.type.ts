import { Request } from "express";

export interface RequestHasLogin extends Request {
  userId?: number
  role?:string
  email?:string
}
