"use client";
import React, { useState } from "react";
import Copied from "./Copied";
import { ICard } from "@/types/networks";
import { ITrasanctionResponse } from "@/types/transaction";
import Confirmation from "./Confirmation";
import { updateTransaction } from "@/app/actions/transaction";
import { useParams, useRouter } from "next/navigation";
import { infoMessage, successMessage } from "@/app/utils/notification";
import { ICountry } from "@/types/country";
import Cookies from "js-cookie";

type Props = {
  card: ICard;
  transaction: ITrasanctionResponse;
};

const Wrapper = ({ card, transaction }: Props) => {
  const [step, setStep] = useState<number>(1);
  const [hour, setHour] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [country] = useState<ICountry | undefined>(() => {
    try {
      let listData;
      listData = Cookies.get("list");
      listData = JSON.parse(listData as string) as ICountry[];
      listData = listData.find((el) => el.id === card.countryId);
      return listData as ICountry;
    } catch (error) {
      console.log(error);
    }
  });

  const confirmTransaction = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      country?.name !== "ru" &&
      phone.length !== parseInt(country?.TelMaxNumber as string)
    ) {
      return infoMessage("Le numéro d'envoie n'est pas correcte");
    }

    if (country?.name === "ru" && name === "") {
      return infoMessage("Le numéro d'envoie n'est pas correcte");
    }

    if (hour === "") {
      return infoMessage(
        "Veillez s'il vous plait selectionner une heure précise!"
      );
    }

    setLoading(true);

    const myHour = hour.split(":");

    await updateTransaction(
      params.transactionId as string,
      `${country?.name === "ru" ? name : phone}`,
      `${myHour[0]}h${myHour[1]}`,
      card.phone,
      "INPROGRESS" as any,
      card.fullName
    )
      .then((transaction) => {
        if (transaction.status !== "") {
          successMessage("La transaction a été confirmé avec succès!");
          return router.push("/historiques");
        }
        console.table(transaction);
        return;
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="transfert__confirmation--content">
      <div className="transfert__confirmation--count">
        <div className={`number`}>
          <span>1</span>
        </div>
        <div className={`number`}>
          <span>2</span>
        </div>
        <div className={`number`}>
          <span>3</span>
        </div>
        <div
          className={`line ${step === 2 ? "two" : step === 3 ? "three" : ""}`}
        ></div>
      </div>
      <div className="transfert__confirmation--content__left">
        <div className="transfert__confirmation--content__left__first">
          <h2>Coordonnées du dépot</h2>
          <div className="transfert__confirmation--content__left--cards">
            <div className="transfert__confirmation--content__row">
              <h3>Methode</h3>
              <span>{card?.network.pubicName}</span>
            </div>
            <div className="transfert__confirmation--content__row">
              <h3>N° du compte</h3>
              <span>{card?.phone}</span>
            </div>
            <div className="transfert__confirmation--content__row">
              <h3>Nom</h3>
              <span>{card?.fullName}</span>
            </div>
            <div className="transfert__confirmation--content__row">
              <h3>Montant</h3>
              <span>
                {transaction.amountToSend} {country?.currency}
              </span>
            </div>
          </div>
          <Copied
            method={card?.network.pubicName}
            motant={transaction.amountToSend}
            name={card?.fullName}
            phone={card?.phone}
            setStep={setStep}
          />
        </div>
        <div
          className={`transfert__confirmation--content__left__first ${
            step >= 2 ? "" : "hide"
          }`}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
            tempora mollitia perspiciatis minima, ipsum vel amet aperiam vero,
            reiciendis deserunt distinctio dicta ratione repellendus molestias
            consequatur quibusdam, veritatis odio laboriosam.
            <br /> Suscipit tempora mollitia perspiciatis minima, ipsum vel amet
            aperiam vero, reiciendis deserunt distinctio dicta ratione
            repellendus molestias consequatur quibusdam, veritatis odio
            laboriosam.
            <br /> Suscipit tempora mollitia perspiciatis minima, ipsum vel amet
            aperiam vero, reiciendis deserunt distinctio dicta ratione
            repellendus.
          </p>
          <button
            className={step >= 2 ? "" : "hide"}
            onClick={() => setStep(3)}
          >{`J'ai compris`}</button>
        </div>
        <div
          className={`transfert__confirmation--content__left__first ${
            step >= 3 ? "" : "hide"
          }`}
        >
          <h2>Informations relatives au depot</h2>
          <div className="transfert__confirmation--content__right--forms">
            {country?.name === "ru" ? (
              <div className="transfert__confirmation--content__right--input">
                <label className="confirm" htmlFor="name">
                  {`Nom rélié au compte, ex: El Nuntia`}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nom rélié au compte"
                  value={name}
                  onChange={(e) => {
                    const regex = /^[A-Za-z\s]+$/;
                    if (regex.test(e.target.value) || e.target.value === " ") {
                      setName(e.target.value);
                    }
                  }}
                />
              </div>
            ) : (
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
                  maxLength={parseInt(country?.TelMaxNumber as string)}
                />
              </div>
            )}
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
          <button
            className={step >= 2 ? "" : "hide"}
            onClick={confirmTransaction}
          >
            {loading ? "Veillez patienter..." : "Dépot éffectué"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
