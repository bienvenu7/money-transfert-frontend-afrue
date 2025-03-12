"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountryWhereToData,
  selectNetworks,
  selectSelectedNetwork,
  selectTransaction,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import {
  getFee,
  getNameTo,
  getNetworkData,
  getPhone,
  getSelectedNetwork,
} from "@/redux/transactionReducer";
import { getNetworkByAmount } from "@/app/utils/network";
import { IFee } from "@/types/networks";

const SendForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const transaction = useSelector(selectTransaction);
  const networks = useSelector(selectNetworks);
  const countryWhereToData = useSelector(selectCountryWhereToData);

  const handleNetwork = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    dispatch(
      getNetworkData(networks?.filter((el) => el.id === e.target.value)[0])
    );

    await getNetworkByAmount(e.target.value, transaction.amountToPayOut)
      .then((el) => {
        const fee = el as IFee;
        if (fee.id !== undefined) {
          dispatch(getFee(fee.amount));
        } else {
          console.log(el);
        }
      })
      .catch((e) => console.error(e));
  };

  const handlePhone = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const regex = /^[0-9\b]+$/;

    if (regex.test(e.target.value) || e.target.value === "") {
      dispatch(getPhone(e.target.value));
    }
    return;
  };

  const handleName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const regex = /^[a-zA-Z\s]+$/;

    if (regex.test(e.target.value) || e.target.value === "") {
      return dispatch(getNameTo(e.target.value));
    }
    return;
  };

  return (
    <div className="transfert--send__form">
      <div className="transfert--send__form--input">
        <label htmlFor="country">Pays*</label>
        <div>{countryWhereToData?.pubicName}</div>
      </div>
      <div className="transfert--send__form--input">
        <label htmlFor="operator">Opérateur réseau*</label>
        <select
          className={transaction.networkId !== "" ? "colored" : ""}
          onChange={handleNetwork}
          value={transaction.networkId}
          id="operator"
        >
          {networks.length > 0 ? (
            <option value={""}>Sélectionnez un opérateur</option>
          ) : (
            <option value={""}>
              {` Vous devrez d'abord choissir le pays ${
                transaction.type === "send"
                  ? "du destinataire"
                  : "de l'expéditeur"
              } `}
            </option>
          )}
          {networks.map((el) => (
            <option key={el?.id} value={el?.id}>
              {el?.pubicName}
            </option>
          ))}
        </select>
        {/* {<p>{"Le numéro doit contenir 9 chiffres!"}</p>} */}
      </div>
      <div className="transfert--send__form--input">
        <label htmlFor="name">Nom(s) et prénom(s) du destinataire*</label>
        <input
          className={
            transaction.receiverName.length > 3 ? "colored" : "uncolored"
          }
          onChange={handleName}
          id="name"
          type={"text"}
          placeholder="El Nuntia"
          value={transaction.receiverName}
        />
        {/* {<p>{"Le nom doit contenir au moins 5 lettres!"}</p>} */}
      </div>
      <div className="transfert--send__form--input">
        <label htmlFor="phone">Numéro de reception*</label>
        <input
          className={
            transaction.receiverPhone.length >=
            parseInt(countryWhereToData?.TelMaxNumber as string)
              ? "colored"
              : "uncolored"
          }
          onChange={handlePhone}
          value={transaction.receiverPhone}
          id="phone"
          type={"tel"}
          placeholder="066007789"
          maxLength={parseInt(countryWhereToData?.TelMaxNumber as string)}
          minLength={parseInt(countryWhereToData?.TelMaxNumber as string)}
        />
        {/* {<p>{"Le numéro doit contenir 9 chiffres!"}</p>} */}
      </div>
    </div>
  );
};

export default SendForm;
