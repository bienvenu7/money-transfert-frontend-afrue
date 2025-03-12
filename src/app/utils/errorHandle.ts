import {
  IBadResquestErrorData,
  IBaseErrorData,
  ISuccessData,
  ISuccessOtpCodeResponse,
} from "@/types/fetch";

export class BaseError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    this.isOperational = true;
    Object.setPrototypeOf(this, BaseError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends BaseError {
  errorData: Record<string, string>[];
  constructor(data: Record<string, string>[]) {
    super("Erreur de validation des données!", 400);
    this.errorData = data;
    this.statusCode = 400;
    Object.setPrototypeOf(this, ValidationError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorToSendBack = (
  error: any
): IBaseErrorData | IBadResquestErrorData => {
  let err;
  if (error.status === 400) {
    err = error.response.data as IBadResquestErrorData;
    return err;
  } else if (error.status === 500 || error.response === undefined) {
    err = error.response.data;
    return err;
  } else {
    let err = error.response.data as IBaseErrorData;
    return err;
  }
};

export const successResponse = (data: any, status: number) => {
  const newData: ISuccessData = {
    message: data.message,
    statusCode: status,
  };
  return newData;
};

export const successResponseOtp = (data: any, status: number) => {
  const newData: ISuccessOtpCodeResponse = {
    statusCode: status,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
  return newData;
};

export function isValidPassword(password: string): Boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  console.log({ chexk: regex.test(password), password });
  return regex.test(password);
}
