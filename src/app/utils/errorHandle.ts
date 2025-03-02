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

export const errorToSendBack = (error: any) => {
  if (error.status === 400) {
    let err = error.response.data as IBadResquestErrorData;
    throw new ValidationError(err.data);
  } else if (error.status === 500 || error.response === undefined) {
    throw new BaseError(
      "Désolé, une erreur s'est produite. Veillez ressayer plutard",
      500
    );
  } else {
    let err = error.response.data as IBaseErrorData;
    throw new BaseError(err.message, error.status);
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
