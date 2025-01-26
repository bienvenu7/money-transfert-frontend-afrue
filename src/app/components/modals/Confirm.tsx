"use client";
import { ITrasanctionData } from "@/types/transaction";
import { IClientResponse } from "@/types/user";
import { AiOutlineCheck } from "react-icons/ai";
import React from "react";
import { createTransaction } from "@/app/actions/transaction";
import { useRouter } from "next/navigation";

type Props = {
  type: "send" | "receive";
  transactionData: ITrasanctionData;
  countryFrom: string;
  countryWhereTo: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
};

const Confirm = ({
  type,
  transactionData,
  countryFrom,
  countryWhereTo,
  openModal,
  setOpenModal,
}: Props) => {
  const router = useRouter();
  const addTransaction = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await createTransaction(transactionData)
      .then((e) => console.log(e))
      .catch((el) => console.log(el));
    setOpenModal(false);
  };
  return (
    <div className="confirm__container">
      <div className="confirm__wrapper">
        <div className="confirm__header">
          <h4>
            {"Confirmez " +
              (type === "send" ? "l'envoie" : "la réception") +
              " des fonds"}
          </h4>
        </div>
        <div className="confirm__details">
          <span>{`Infos de l'expéditeure`}</span>
          <div className="confirm__details--line">
            <h5>{`Nom de l'expéditeur`} : </h5>
            <p>{transactionData.fullNameFrom}</p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Numéro de l'expéditeur`} : </h5>
            <p>{transactionData.phoneFrom}</p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Pays de l'expéditeur`} : </h5>
            <p>{countryFrom}</p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Montant à transférer`} : </h5>
            <p>{transactionData.transfertAmount}</p>
          </div>
          <span className="second">{`Infos du destinataire`}</span>
          <div className="confirm__details--line">
            <h5>{`Nom du destinataire`} : </h5>
            <p>{transactionData.fullNameWhereTo}</p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Numéro du destinataire`} : </h5>
            <p>{transactionData.phoneWhereTo}</p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Pays du destinataire`} : </h5>
            <p>{countryWhereTo}</p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Montant à recevoir`} : </h5>
            <p>{transactionData.ReceiveAmount}</p>
          </div>
        </div>
        <div className="confirm__btns">
          <button onClick={() => setOpenModal(false)}>Annulez</button>
          <button onClick={() => router.push("/comfirmation/:id")}>
            <span>Confirmer</span> <AiOutlineCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
