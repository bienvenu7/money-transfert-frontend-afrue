import { RootState } from "./store";

export const selectClientData = (state: RootState) => state.clientSlice.user;

export const selectCountry = (state: RootState) => state.clientSlice.country;

export const selectTransactionType = (state: RootState) =>
  state.transactionSlice.transaction.type;

export const selectStep = (state: RootState) => state.clientSlice.step;

export const selectTransaction = (state: RootState) =>
  state.transactionSlice.transaction;

export const selectCountries = (state: RootState) =>
  state.clientSlice.countries;

export const selectCountryWhereToData = (state: RootState) =>
  state.transactionSlice.countryTo;

export const selectNetworks = (state: RootState) =>
  state.transactionSlice.networks;

export const selectSelectedNetwork = (state: RootState) =>
  state.transactionSlice.choosenNetwork;

export const selectNetworkData = (state: RootState) =>
  state.transactionSlice.networkData;

export const selectNameFrom = (state: RootState) =>
  state.transactionSlice.transaction.fullNameFrom;

export const selectNameTo = (state: RootState) =>
  state.transactionSlice.transaction.fullNameWhereTo;

export const selectPhoneTo = (state: RootState) =>
  state.transactionSlice.transaction.phoneWhereTo;

export const selectPhoneFrom = (state: RootState) =>
  state.transactionSlice.transaction.phoneFrom;
