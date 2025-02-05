"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineCheck,
  AiOutlineDown,
} from "react-icons/ai";
import Convertisseur from "./Convertisseur";
import SendForm from "./SendForm";
import { IClientResponse } from "@/types/user";
import { ICountry } from "@/types/country";
import { errorMessage } from "@/app/utils/notification";
import { ITrasanctionData } from "@/types/transaction";
import Modal from "../modals/Modal";
import Confirm from "../modals/Confirm";
import { INetworkResponse } from "@/types/networks";
import { getNetworksById } from "@/app/utils/network";
import { getCountries } from "@/app/utils/getCountry";
import { getAuth } from "@/app/actions/auth";
import QuizOne from "./QuizOne";
import QuizTwo from "./QuizTwo";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountry,
  selectStep,
  selectTransactionType,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import { getStep } from "@/redux/clientReducer";
import { getCountryfrom, getCountryTo } from "@/redux/transactionReducer";
import Image from "next/image";

export type IType = "send" | "receive";

// type Props = {
//   clientData: IClientResponse;
//   countries: ICountry[];
// };

const Transaction = () => {
  const userCountry = useSelector(selectCountry);
  const type = useSelector(selectTransactionType);
  const step = useSelector(selectStep);
  const dispatch = useDispatch<AppDispatch>();

  // const transactionData: ITrasanctionData = {
  //   transfertAmount: amount.toString(),
  //   ReceiveAmount: convert.toString(),
  //   clientEmail: clientData?.email as string,
  //   type: type === "send" ? "outgoing" : "incomming",
  //   fullNameFrom: type === "send" ? (clientData?.fullName as string) : name,
  //   fullNameWhereTo:
  //     type === "receive" ? (clientData?.fullName as string) : name,
  //   countryFrom: type === "send" ? clientCountry?.id : countryId,
  //   countryWhereTo: type === "receive" ? clientCountry?.id : countryId,
  //   phoneFrom: type === "send" ? (clientData?.whatsappNumber as string) : phone,
  //   phoneWhereTo:
  //     type === "receive" ? (clientData?.whatsappNumber as string) : phone,
  //   status: "waiting for confirmation",
  //   amount: amount.toString(),
  // };

  // const confirmTransaction = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  // ) => {
  //   event.preventDefault();

  //   if (
  //     countryId === "" ||
  //     operator === "" ||
  //     name === "" ||
  //     phone === "" ||
  //     amount.toString() === "" ||
  //     type === null
  //   ) {
  //     return errorMessage(
  //       "Erreur! Assurez vous de remplir toutes les entrées, et de choisir le type de transaction!"
  //     );
  //   }
  //   setOpenModal(true);
  //   console.table(transactionData);
  // };

  // const handleType = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   el: IType
  // ) => {
  //   event.preventDefault();
  //   dispatch(getTransactionType(el));
  //   setType(el);
  //   setStep((prev) => prev + 1);
  // };

  // const handleConvert = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   value: number
  // ) => {
  //   event.preventDefault();
  //   setStep((prev) => prev + value);
  // };

  return (
    <div className="transfert__slides">
      <div className="transfert__slides--wrapper">
        <div
          className={`transfert__slides--box ${
            step === 1 ? "one" : step === 2 ? "two" : ""
          }`}
        >
          <QuizOne />
          <QuizTwo />
          <div className="transfert__slides--second">
            <Image src="/grad.png" alt="" fill />
            <div className="transfert__form">
              <p>{`Veillez entrer soigneusement les informations ${
                type === "send" ? "du destinatire" : "de l'expéditeur"
              }`}</p>
              <SendForm />
            </div>
            <div className="btns" style={step === 2 ? { marginTop: 30 } : {}}>
              <button
                onClick={(event) => dispatch(getStep(-1))}
                type={"button"}
              >
                <AiOutlineDown />
              </button>
              <button type={"button"}>
                <AiOutlineDown />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal show={openModal} onClose={setOpenModal}>
        <Confirm
          countryFrom={
            countries.find((el) => el.id === transactionData.countryFrom)
              ?.pubicName as string
          }
          countryWhereTo={
            countries.find((el) => el.id === transactionData.countryWhereTo)
              ?.pubicName as string
          }
          transactionData={transactionData}
          type={type as IType}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </Modal> */}
    </div>
  );
};

export default Transaction;
