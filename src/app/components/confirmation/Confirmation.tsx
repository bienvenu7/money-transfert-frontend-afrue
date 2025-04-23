"use client";
import { updateTransaction } from "@/app/actions/transaction";
import { ICard } from "@/types/networks";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

type Props = {
  card: ICard;
};

const Confirmation = ({ card }: Props) => {
  const [hour, setHour] = useState("");
  const [phone, setPhone] = useState("");

  const params = useParams();
  const router = useRouter();

  const confirmTransaction = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await updateTransaction(
      params.transactionId as string,
      phone,
      hour,
      card.phone,
      "en cours",
      card.fullName
    )
      .then((transaction) => {
        if (transaction.status !== "") {
          return router.push("/historiques");
        }
        console.table(transaction);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="transfert__confirmation--content__right">
      <h2>Informations relatives au depot</h2>
      <div className="transfert__confirmation--content__right--forms">
        <div className="transfert__confirmation--content__right--input">
          <label className="confirm" htmlFor="phone">
            {`Numero d'envoie, ex: 066779090`}
          </label>
          <input
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            type={"tel"}
            placeholder="Numero d'envoie"
            value={phone}
          />
        </div>
        <div className="transfert__confirmation--content__right--input">
          <label className="confirm" htmlFor="hour">
            {`Heure précise, ex: 14h05`}
          </label>

          <input
            id="hour"
            onChange={(e) => setHour(e.target.value)}
            type={"text"}
            placeholder="Heure précise"
            value={hour}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />
        </div>
      </div>
      <button onClick={confirmTransaction}>Dépot éffectué</button>
    </div>
  );
};

export default Confirmation;
