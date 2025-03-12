import { ICountry } from "@/types/country";
import { INetworkResponse } from "@/types/networks";
import { ITrasanctionData } from "@/types/transaction";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IInitialTransaction {
  transaction: ITrasanctionData;
  countryTo: ICountry | null;
  countryFrom: ICountry | null;
  networks: INetworkResponse[];
  choosenNetwork: string;
  networkData: INetworkResponse | null;
}

const initialState: IInitialTransaction = {
  transaction: {
    clientEmail: "",
    status: "uncomfirmed",
    type: "",
    amountToPayOut: "",
    amountToSend: "",
    code: "",
    fees: "",
    networkId: "",
    receiverName: "",
    receiverPhone: "",
  },
  countryTo: null,
  countryFrom: null,
  networks: [],
  networkData: null,
  choosenNetwork: "",
};

export const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    getAmountFrom: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        amountToSend: action.payload,
      };
    },
    getAmountTo: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        amountToPayOut: action.payload,
      };
    },
    getTransactionType: (state, action: PayloadAction<"send" | "receive">) => {
      state.transaction = { ...state.transaction, type: action.payload };
    },
    getFee: (state, action: PayloadAction<string>) => {
      state.transaction = { ...state.transaction, fees: action.payload };
    },
    getCountryTo: (state, action: PayloadAction<ICountry>) => {
      state.countryTo = action.payload;
    },
    getCountryfrom: (state, action: PayloadAction<ICountry>) => {
      state.countryFrom = action.payload;
    },
    getNetworks: (state, action: PayloadAction<INetworkResponse[]>) => {
      state.networks = action.payload;
    },
    getSelectedNetwork: (state, action: PayloadAction<string>) => {
      state.choosenNetwork = action.payload;
    },
    getNetworkData: (state, action: PayloadAction<INetworkResponse>) => {
      state.networkData = action.payload;
      state.transaction = {
        ...state.transaction,
        networkId: action.payload.id,
      };
    },
    getNameTo: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        receiverName: action.payload,
      };
    },
    getCode: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        code: action.payload,
      };
    },
    getPhone: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        receiverPhone: action.payload,
      };
    },
    getEmail: (state, action: PayloadAction<string>) => {
      state.transaction = {
        ...state.transaction,
        clientEmail: action.payload,
      };
    },

    resetTransaction: (state) => {
      state = {
        transaction: {
          clientEmail: "",
          status: "uncomfirmed",
          type: "",
          amountToPayOut: "",
          amountToSend: "",
          code: "",
          fees: "",
          networkId: "",
          receiverName: "",
          receiverPhone: "",
        },
        countryTo: null,
        countryFrom: null,
        networks: [],
        networkData: null,
        choosenNetwork: "",
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
  getNetworks,
  getSelectedNetwork,
  getNetworkData,
  getNameTo,
  getCountryfrom,
  getPhone,
  getCode,
  getFee,
  getEmail,
  resetTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;
