"use client";
import React, { useState, useEffect } from "react";
import Copied from "./Copied";
import { ICard } from "@/types/networks";
import { ITrasanctionResponse } from "@/types/transaction";
import Confirmation from "./Confirmation";
import { updateTransaction } from "@/app/actions/transaction";
import { useParams, useRouter } from "next/navigation";
import {
  errorMessage,
  infoMessage,
  successMessage,
} from "@/app/utils/notification";
import { ICountry } from "@/types/country";
import Cookies from "js-cookie";
import Modal from "../modals/Modal";

type Props = {
  transaction: ITrasanctionResponse;
};

const Wrapper = ({ transaction }: Props) => {
  const [step, setStep] = useState<number>(1);
  const [hour, setHour] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<ICountry | undefined>(undefined);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Initialize client-side data after hydration
  useEffect(() => {
    setIsClient(true);

    try {
      const listData = Cookies.get("list");
      if (listData) {
        const parsedData = JSON.parse(listData) as ICountry[];
        const foundCountry = parsedData.find(
          (el) => el.id === transaction.card.countryId
        );
        setCountry(foundCountry);
        setCountries(parsedData);
      }
    } catch (error) {
      console.log("Error parsing country data", error);
    }
  }, [transaction.card.countryId]);

  console.log(countries);

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
      "INPROGRESS" as any
    )
      .then((transaction) => {
        console.table(transaction);
        successMessage("La transaction a été confirmé avec succès!");
        router.refresh();
      })
      .catch((err) => {
        errorMessage(
          "Une erreur s'est produite lors de la confirmation de la transaction"
        );
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const status = [
    { status: "INPROGRESS", name: "En cours" },
    { status: "ERROR", name: "Echec" },
    { status: "FINISH", name: "Terminée" },
  ];

  return (
    <>
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
                <span>{transaction.card?.network.pubicName}</span>
              </div>
              <div className="transfert__confirmation--content__row">
                <h3>N° du compte</h3>
                <span>{transaction.card?.phone}</span>
              </div>
              <div className="transfert__confirmation--content__row">
                <h3>Nom</h3>
                <span>{transaction.card?.fullName}</span>
              </div>
              <div className="transfert__confirmation--content__row">
                <h3>Montant</h3>
                <span>
                  {transaction.amountToSend} {country?.currency}
                </span>
              </div>
            </div>
            {transaction.status !== ("INPROGRESS" as any) && (
              <Copied
                method={transaction.card?.network.pubicName}
                motant={transaction.amountToSend}
                name={transaction.card?.fullName}
                phone={transaction.card?.phone}
                setStep={setStep}
              />
            )}
          </div>
          <div
            className={`transfert__confirmation--content__left__first ${
              step >= 2 || transaction.status === ("INPROGRESS" as any)
                ? ""
                : "hide"
            }`}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
              tempora mollitia perspiciatis minima, ipsum vel amet aperiam vero,
              reiciendis deserunt distinctio dicta ratione repellendus molestias
              consequatur quibusdam, veritatis odio laboriosam.
              <br /> Suscipit tempora mollitia perspiciatis minima, ipsum vel
              amet aperiam vero, reiciendis deserunt distinctio dicta ratione
              repellendus molestias consequatur quibusdam, veritatis odio
              laboriosam.
              <br /> Suscipit tempora mollitia perspiciatis minima, ipsum vel
              amet aperiam vero, reiciendis deserunt distinctio dicta ratione
              repellendus.
            </p>
            <button
              className={step >= 2 ? "" : "hide"}
              onClick={() => setStep(3)}
            >{`J'ai compris`}</button>
          </div>
          <div
            className={`transfert__confirmation--content__left__first ${
              step >= 3 || transaction.status === ("INPROGRESS" as any)
                ? ""
                : "hide"
            }`}
          >
            {transaction.status !== ("INPROGRESS" as any) && (
              <>
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
                          if (
                            regex.test(e.target.value) ||
                            e.target.value === ""
                          ) {
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
              </>
            )}
            {transaction.status === ("INPROGRESS" as any) ? (
              <button onClick={() => setOpenModal(true)}>
                Voir les details
              </button>
            ) : (
              <button
                className={step >= 2 ? "" : "hide"}
                onClick={confirmTransaction}
              >
                {loading ? "Veillez patienter..." : "Dépot éffectué"}
              </button>
            )}
          </div>
        </div>
      </div>
      <Modal onClose={setOpenModal} show={openModal}>
        <div className="modal__container">
          <h2>A propos de la transaction</h2>
          <div className="modal__box">
            <div className="modal__line">
              <small>status:</small>
              <strong>
                {
                  status.find((el) => el.status === (transaction.status as any))
                    ?.name
                }
              </strong>
            </div>
            <div className="modal__line">
              <small>{`Date d'initiation:`}</small>
              <strong>{transaction.dateTime}</strong>
            </div>
            <div className="modal__line">
              <small>{`Iltinéraire:`}</small>
              <strong>{transaction.code}</strong>
            </div>
            <div className="modal__line">
              <small>Montant transféré:</small>
              <strong>
                {transaction.amountToSend}{" "}
                {
                  countries.find(
                    (el) => el.name === transaction.code.split("-")[0]
                  )?.currency
                }
              </strong>
            </div>
            <div className="modal__line">
              <small>Montant à recevoir:</small>
              <strong>
                {transaction.amountToPayOut}{" "}
                {
                  countries.find(
                    (el) => el.name === transaction.code.split("-")[1]
                  )?.currency
                }
              </strong>
            </div>
            <div className="modal__line">
              <small>Nom du destinataire:</small>
              <strong>{transaction.receiverName}</strong>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Wrapper;
