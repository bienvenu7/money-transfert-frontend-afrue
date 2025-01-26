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
    super("Validation Error", 400);
    this.errorData = data;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export const errorToSendBack = (
  error: any
): IBaseErrorData | IBadResquestErrorData => {
  if (error.status === 400) {
    let err = error.response.data as IBadResquestErrorData;
    const newData: IBadResquestErrorData = {
      ...err,
      statusCode: 400,
    };
    return newData;
  } else if (error.status === 500) {
    let err: IBaseErrorData = {
      message: "Server error!",
      statusCode: 500,
      status: "failed",
    };
    return err;
  } else {
    let err = error.response.data as IBaseErrorData;
    const newData: IBaseErrorData = {
      ...err,
      statusCode: err.statusCode,
    };
    return newData;
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
