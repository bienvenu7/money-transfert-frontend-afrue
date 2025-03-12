import { getAcces, getAuth } from "@/app/actions/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCounties, getUser } from "../clientReducer";
import { IClientResponse } from "@/types/user";
import { getCountries } from "@/app/utils/getCountry";
import { getEmail } from "../transactionReducer";

export const SetTransactionDataThunk = createAsyncThunk(
  "transactionData/get",
  async (_, thunkApi) => {
    const token = await getAcces();
    try {
      await getAuth().then((client) => {
        // eslint-disable-next-line no-use-before-define
        thunkApi.dispatch(getUser(client as IClientResponse));
        // eslint-disable-next-line no-use-before-define
        thunkApi.dispatch(getEmail(client.email));
      });

      await getCountries().then((el) => {
        thunkApi.dispatch(getCounties(el));
      });
      return "access";
    } catch (error) {
      console.error(error);
      return "denied";
    }
  }
);
