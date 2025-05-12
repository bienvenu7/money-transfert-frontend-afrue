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
import { IClientResponse, IClientUpdate } from "@/types/user";

export const updateClient = async (data: IClientUpdate): Promise<string> => {
  const accessToken = cookies().get("accessToken")?.value;
  const { status } = await instance.patch("auth/update/user", data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (status === 200) {
    await instance.get("auth/logout", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    cookies().delete("app_client");
    cookies().delete("public_country");
  }
  return "Vos identifiants ont été mises à jour correctement, vous serez déconnecté dans un instant pour assurer que vos données ont été mise à jour correctement";
};

export const register = async (
  email: string,
  password: string,
  fullName: string,
  countryId: string,
  gender: string
): Promise<ISuccessData | IBaseErrorData | IBadResquestErrorData> => {
  try {
    const { data, status } = await instance.post("auth/register", {
      email,
      password,
      fullName,
      countryId,
      gender,
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
): Promise<ISuccessData | IBaseErrorData | IBadResquestErrorData> => {
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
): Promise<
  ISuccessOtpCodeResponse | IBaseErrorData | IBadResquestErrorData
> => {
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

export const confirmOtpUpdate = async (
  email: string,
  newOtp: string[]
): Promise<number> => {
  let otp = "";

  newOtp.map((el) => (otp = otp + el));

  const { status } = await instance.post("auth/verify-otp", {
    email,
    otp,
  });

  return status;
};

export const resendOtp = async (email: string) => {
  const response = await instance.post("auth/resend-otp", {
    email,
  });
  return response;
};

export const getAuth = async (): Promise<IClientResponse> => {
  const accessToken = cookies().get("accessToken")?.value;

  const app_client = cookies().get("app_client")?.value;

  if (app_client) {
    const client: IClientResponse = JSON.parse(app_client);
    return client;
  }
  const { data: client } = await instance.get("auth/get-auth", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  // const d = data as IClientResponse;
  const data = client as any;
  return data;
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
    cookies().delete("app_client");
    cookies().delete("public_country");
    return successResponse(data, status);
  } catch (error: any) {
    return errorToSendBack(error);
  }
};

export const getAcces = async (): Promise<string> => {
  const accessToken: string = cookies().get("accessToken")?.value as string;
  return accessToken;
};
