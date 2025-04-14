"use client";
import { updateTransaction } from "@/app/actions/transaction";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

type Props = {};

const Confirmation = (props: Props) => {
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
      "06 660 78 98",
      "en cours"
    )
      .then((transaction) => {
        router.push("/historiques");
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
            type={"time"}
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
