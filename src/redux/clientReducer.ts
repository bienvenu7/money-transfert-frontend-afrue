import { getCountryById } from "@/app/utils/getCountry";
import { ICountry } from "@/types/country";
import { IClientResponse } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInitialClient {
  user: IClientResponse | null;
  country: ICountry | null;
  transactionType: "send" | "receive" | "";
  step: number;
  countries: ICountry[];
}

const initialState: IInitialClient = {
  user: null,
  country: null,
  transactionType: "",
  step: 0,
  countries: [],
};

export const clientSlice = createSlice({
  name: "clientSlice",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<IClientResponse>) => {
      state.user = action.payload;
    },
    getUserCountry: (state, action: PayloadAction<ICountry>) => {
      state.country = action.payload;
    },
    getStep: (state, action: PayloadAction<number>) => {
      state.step = state.step + action.payload;
    },
    getCounties: (state, action: PayloadAction<ICountry[]>) => {
      state.countries = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUser, getUserCountry, getStep, getCounties } =
  clientSlice.actions;

export default clientSlice.reducer;
