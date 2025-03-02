"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import SendForm from "./SendForm";
import { IClientResponse } from "@/types/user";
import { ICountry } from "@/types/country";
import Modal from "../modals/Modal";
import Confirm from "../modals/Confirm";
import QuizOne from "./QuizOne";
import QuizTwo from "./QuizTwo";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountryWhereToData,
  selectStep,
  selectTransaction,
} from "@/redux/selector";
import { AppDispatch } from "@/redux/store";
import { getCounties, getStep, getUser } from "@/redux/clientReducer";
import { getEmail } from "@/redux/transactionReducer";
import Image from "next/image";
import { errorMessage } from "@/app/utils/notification";

export type IType = "send" | "receive";

type Props = {
  clientData: IClientResponse;
  countries: ICountry[];
};

const Transaction = ({ clientData, countries }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const transaction = useSelector(selectTransaction);
  const countryWhereToData = useSelector(selectCountryWhereToData);

  useEffect(() => {
    dispatch(getEmail(clientData.email));
    dispatch(getCounties(countries));
    dispatch(getUser(clientData));
  }, [countries, clientData, dispatch]);

  const step = useSelector(selectStep);

  const handleTransactionInfos = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (transaction.receiverName.length < 3) {
      return errorMessage(
        "Le nom du destinataire doit contenir au moins 3 lettres!"
      );
    } else if (
      transaction.receiverPhone.length <
      parseInt(countryWhereToData?.TelMaxNumber as string)
    ) {
      return errorMessage(
        `Le numéro doit contenir ${countryWhereToData?.TelMaxNumber} chiffres!`
      );
    } else if (transaction.networkId === "") {
      return errorMessage("Veillez sélectionner un opérateur réseau!");
    } else {
      setOpenModal(true);
    }
  };

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
              <p>{`Veillez entrer soigneusement les informations necessaires du destinataire!`}</p>
              <SendForm />
            </div>
            <div className="btns" style={step === 2 ? { marginTop: 30 } : {}}>
              <button onClick={() => dispatch(getStep(-1))} type={"button"}>
                <AiOutlineDown />
              </button>
              <button onClick={handleTransactionInfos} type={"button"}>
                <AiOutlineDown />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={openModal} onClose={setOpenModal}>
        <Confirm openModal={openModal} setOpenModal={setOpenModal} />
      </Modal>
    </div>
  );
};

export default Transaction;
