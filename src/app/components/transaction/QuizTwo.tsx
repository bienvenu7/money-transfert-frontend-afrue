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
import Link from "next/link";

type Props = {};

const QuizTwo = () => {
  return (
    <div className="transfertConvert__slides--first">
      <Image src="/grad.png" alt="" fill />
      <div className="transfertConvert__convert">
        <Convertisseur />
      </div>
      <div className="btns">
        <Link href={"/send"}>Envoyer</Link>
        <Link href={"/receive"}>Recevoir</Link>
      </div>
    </div>
  );
};

export default QuizTwo;
