import { Response } from "express";

export const showInternal = (res: Response, error: any) => {
  console.log(error);
  return res.status(500).json({ success: false, message: "Internal server" });
};

export const showNotAuthorized = (res: Response) => {
  return res.status(401).json({ success: false, message: "Not authorized" });
};

export const showError = (res: Response, message: string) => {
  return res.status(400).json({ success: false, message });
};

export const showNotFound = (res: Response) => {
  return res.status(404).json({ success: false, message: "Not found" });
};

export const showSuccess = (res: Response, data?: any) => {
  if (data) {
    return res.json({ success: true, data });
  } else {
    return res.json({ success: true });
  }
};

export const convertJoiToString = (error: any) => {
  return error.details.map((item: any) => item.message).join(", ");
};
