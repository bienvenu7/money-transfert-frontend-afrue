import React, { useState } from "react";
import Convertisseur from "./Convertisseur";
import { AiOutlineDown } from "react-icons/ai";
import { IType } from "./Transaction";
import { ICountry } from "@/types/country";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountry,
  selectCountryFromData,
  selectCountryWhereToData,
  selectStep,
  selectTransaction,
  selectTransactionType,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import { getStep } from "@/redux/clientReducer";
import {
  getCode,
  getCountryfrom,
  getCountryTo,
  getNetworks,
} from "@/redux/transactionReducer";
import { getNetworksById } from "@/app/utils/network";
import Image from "next/image";
import { errorMessage } from "@/app/utils/notification";
import { INetworkResponse } from "@/types/networks";

type Props = {};

const QuizTwo = () => {
  return (
    <div className="transfert__slides--first">
      <Image src="/grad.png" alt="" fill />
      <h2>{`Entrez le montant que vous souhaiter`}</h2>
      <div className="transfert__convert">
        <Convertisseur />
      </div>
      <div className="btns">
        <button type={"button"}>
          <AiOutlineDown />
        </button>
        <button type={"button"}>
          <AiOutlineDown />
        </button>
      </div>
    </div>
  );
};

export default QuizTwo;
