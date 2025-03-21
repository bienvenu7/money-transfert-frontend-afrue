import { getAcces, getAuth } from "@/app/actions/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCounties, getUser } from "../clientReducer";
import { IClientResponse } from "@/types/user";
import { getCountries } from "@/app/utils/getCountry";
import { getEmail } from "../transactionReducer";
import Cookies from "js-cookie";
import { ICountry } from "@/types/country";

export const SetTransactionDataThunk = createAsyncThunk(
  "transactionData/get",
  async (_, thunkApi) => {
    const app_client = Cookies.get("app_client");
    const public_country = Cookies.get("public_country");

    if (app_client && public_country) {
      const client: IClientResponse = JSON.parse(app_client);
      const country: ICountry[] = JSON.parse(public_country);
      thunkApi.dispatch(getUser(client as IClientResponse));
      thunkApi.dispatch(getEmail(client.email));
      thunkApi.dispatch(getCounties(country));
      return "access";
    } else {
      try {
        await getAuth().then((client) => {
          // eslint-disable-next-line no-use-before-define
          thunkApi.dispatch(getUser(client as IClientResponse));
          // eslint-disable-next-line no-use-before-define
          thunkApi.dispatch(getEmail(client.email));

          Cookies.set("app_client", JSON.stringify(client));
        });

        await getCountries().then((el) => {
          thunkApi.dispatch(getCounties(el));
          Cookies.set("public_country", JSON.stringify(el as ICountry[]));
        });
        return "access";
      } catch (error) {
        console.error(error);
        return "denied";
      }
    }
  }
);
