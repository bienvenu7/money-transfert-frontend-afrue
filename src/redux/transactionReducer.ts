import { ICountry } from "@/types/country";
import { INetworkResponse } from "@/types/networks";
import { ITrasanctionData } from "@/types/transaction";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInitialTransaction {
  transaction: ITrasanctionData;
  countryTo: ICountry | null;
  networks: INetworkResponse[];
  choosenNetwork: string;
  networkData: INetworkResponse | null;
}

const initialState: IInitialTransaction = {
  transaction: {
    amountFrom: "0",
    amountTo: "0",
    clientEmail: "",
    countryFrom: "",
    countryWhereTo: "",
    fullNameFrom: "",
    fullNameWhereTo: "",
    phoneFrom: "",
    phoneWhereTo: "",
    ReceiveAmount: "",
    status: "",
    transfertAmount: "",
    type: "",
  },
  countryTo: null,
  networks: [],
  networkData: null,
  choosenNetwork: "",
};

export const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    getAmountFrom: (state, action: PayloadAction<string>) => {
      state.transaction = { ...state.transaction, amountFrom: action.payload };
    },
    getAmountTo: (state, action: PayloadAction<string>) => {
      state.transaction = { ...state.transaction, amountTo: action.payload };
    },
    getTransactionType: (state, action: PayloadAction<"send" | "receive">) => {
      state.transaction = { ...state.transaction, type: action.payload };
    },
    getCountryTo: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        countryWhereTo: action.payload,
      };
    },
    getCountryfrom: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        countryFrom: action.payload,
      };
    },
    getCountryToData: (state, action: PayloadAction<ICountry>) => {
      state.countryTo = action.payload;
    },
    getNetworks: (state, action: PayloadAction<INetworkResponse[]>) => {
      state.networks = action.payload;
    },
    getSelectedNetwork: (state, action: PayloadAction<string>) => {
      state.choosenNetwork = action.payload;
    },
    getNetworkData: (state, action: PayloadAction<INetworkResponse>) => {
      state.networkData = action.payload;
    },
    getNameFrom: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        fullNameFrom: action.payload,
      };
    },
    getNameTo: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        fullNameWhereTo: action.payload,
      };
    },
    getPhoneFrom: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        phoneFrom: action.payload,
      };
    },
    getPhoneTo: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        phoneWhereTo: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAmountTo,
  getAmountFrom,
  getTransactionType,
  getCountryTo,
  getCountryToData,
  getNetworks,
  getSelectedNetwork,
  getNetworkData,
  getNameFrom,
  getNameTo,
  getCountryfrom,
  getPhoneFrom,
  getPhoneTo,
} = transactionSlice.actions;

export default transactionSlice.reducer;
