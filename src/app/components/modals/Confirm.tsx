"use client";
import { AiOutlineCheck } from "react-icons/ai";
import React from "react";
import { createTransaction } from "@/app/actions/transaction";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountryFromData,
  selectCountryWhereToData,
  selectTransaction,
} from "@/redux/selector";
import { getStep } from "@/redux/clientReducer";
import { AppDispatch } from "@/redux/store";
import { resetTransaction } from "@/redux/transactionReducer";
import { errorMessage } from "@/app/utils/notification";

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
};

const Confirm = ({ openModal, setOpenModal }: Props) => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const transactionData = useSelector(selectTransaction);
  const countryFrom = useSelector(selectCountryFromData);
  const countryWhereToData = useSelector(selectCountryWhereToData);

  console.table(transactionData);

  const addTransaction = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await createTransaction(transactionData)
      .then((transaction) => {
        setOpenModal(false);
        dispatch(resetTransaction());
        router.push(`/comfirmation/${transaction.id}`);
      })
      .catch((el) => {
        dispatch(resetTransaction());
        errorMessage(
          "Cette operation n'a pas pu être aboutti, veillez s'il vous plait ressayez une prochaine fois!"
        );
        console.log(el);
      })
      .finally(() => {
        setOpenModal(false);
        dispatch(getStep(-2));
      });
  };
  return (
    <div className="confirm__container">
      <div className="confirm__wrapper">
        <div className="confirm__header">
          <h4>
            {"Veillez vérifier et confirmer les informations du destinataire"}
          </h4>
        </div>
        <div className="confirm__details">
          <div className="confirm__details--line">
            <h5>{`Nom du destinataire`} : </h5>
            <p>{transactionData.receiverName.toLocaleUpperCase()}</p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Numéro du destinataire`} : </h5>
            <p>
              {countryWhereToData?.TelIndex} {transactionData.receiverPhone}
            </p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Pays du destinataire`} : </h5>
            <p>{countryWhereToData?.pubicName}</p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Montant à transférer`} : </h5>
            <p>
              {countryFrom?.currency} {transactionData.amountToSend}
            </p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Montant à recevoir`} : </h5>
            <p>
              {countryWhereToData?.currency} {transactionData.amountToPayOut}
            </p>
          </div>
          <div className="confirm__details--line">
            <h5>{`Frais de reception`} : </h5>
            <p>
              {countryWhereToData?.currency} {transactionData.fees}
            </p>
          </div>
        </div>
        <div className="confirm__btns">
          <button onClick={() => setOpenModal(false)}>Annulez</button>
          <button onClick={addTransaction}>
            <span>Confirmer</span> <AiOutlineCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
