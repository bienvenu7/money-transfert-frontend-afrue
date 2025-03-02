"use server";

import { cookies } from "next/headers";
import { instance } from "@/instance";
import {
  BaseError,
  errorToSendBack,
  successResponse,
  successResponseOtp,
  ValidationError,
} from "../utils/errorHandle";
import {
  IBadResquestErrorData,
  IBaseErrorData,
  ISuccessData,
  ISuccessOtpCodeResponse,
} from "@/types/fetch";
import { IClientResponse } from "@/types/user";

export const register = async (
  email: string,
  password: string,
  fullName: string,
  countryId: string
): Promise<ISuccessData | IBaseErrorData | IBadResquestErrorData> => {
  try {
    const { data, status } = await instance.post("auth/register", {
      email,
      password,
      fullName,
      countryId,
    });
    return successResponse(data, status);
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const confirmEmail = async (
  hash: string
): Promise<ISuccessData | IBaseErrorData | IBadResquestErrorData> => {
  try {
    const { data, status } = await instance.post("auth/confirm-email", {
      hash,
    });
    return successResponse(data, status);
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const reconfirmEmail = async (hash: string) => {
  try {
    const { data, status } = await instance.post("auth/resend-email", {
      hash,
    });
    console.table({ data, status });
    return data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<ISuccessData> => {
  try {
    const { data, status } = await instance.post("auth/login", {
      email,
      password,
    });
    return successResponse(data, status);
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const confirmOtp = async (
  email: string,
  newOtp: string[]
): Promise<ISuccessOtpCodeResponse> => {
  let otp = "";

  newOtp.map((el) => (otp = otp + el));

  console.log(otp);

  try {
    const { data, status } = await instance.post("auth/verify-otp", {
      email,
      otp,
    });

    cookies().set({
      name: "accessToken",
      value: data.accessToken,
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    cookies().set({
      name: "refreshToken",
      value: data.refreshToken,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 2,
      path: "/",
    });

    return successResponseOtp(data, status);
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const resendOtp = async (email: string) => {
  try {
    const { data, status } = await instance.post("auth/resend-otp");
    console.log({ data, status });
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const getAuth = async (): Promise<IClientResponse> => {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const { data } = await instance.get("auth/get-auth", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data as IClientResponse;
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const getAccesToken = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  if (accessToken === undefined && refreshToken) {
    try {
      const { data, status } = await instance.get("auth/get-access-token", {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      if (status === 200) {
        cookies().set({
          name: "accessToken",
          value: data.accessToken,
          httpOnly: true,
          maxAge: 60 * 15,
          path: "/",
        });
      }
      return;
    } catch (error: any) {
      console.log(error.response.data.message);
      return;
    }
  } else {
    return;
  }
};

export const logout = async (): Promise<
  ISuccessData | IBaseErrorData | IBadResquestErrorData
> => {
  const accessToken = cookies().get("accessToken")?.value;

  try {
    const { status, data } = await instance.get("auth/logout", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    return successResponse(data, status);
  } catch (error: any) {
    return errorToSendBack(error);
  }
};
