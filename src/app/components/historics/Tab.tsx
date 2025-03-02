"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { IClientResponse } from "@/types/user";
import { getTransactionByClientEmail } from "@/app/actions/transaction";
import { ITrasanctionResponse } from "@/types/transaction";
import Image from "next/image";
import { useRouter } from "next/navigation";

const months = [
  {
    id: 1,
    name: "Janvier",
    publicName: "",
  },
  {
    id: 2,
    name: "Février",
    publicName: "",
  },
  {
    id: 3,
    name: "Mars",
    publicName: "",
  },
  {
    id: 4,
    name: "Avril",
    publicName: "",
  },
  {
    id: 5,
    name: "Mai",
    publicName: "",
  },
  {
    id: 6,
    name: "Juin",
    publicName: "",
  },
  {
    id: 7,
    name: "Julliet",
    publicName: "",
  },
  {
    id: 8,
    name: "Août",
    publicName: "",
  },
  {
    id: 9,
    name: "Septembre",
    publicName: "",
  },
  {
    id: 10,
    name: "Octobre",
    publicName: "",
  },
  {
    id: 11,
    name: "Novenbre",
    publicName: "",
  },
  {
    id: 12,
    name: "Décembre",
    publicName: "",
  },
];

const years = [
  {
    id: 1,
    year: 2024,
  },
  {
    id: 2,
    year: 2023,
  },
];

type Props = {
  clientData: IClientResponse;
};

const Tab = ({ clientData }: Props) => {
  const voyelles = ["e", "a"];

  const [transactions, setTransactions] = useState<ITrasanctionResponse[]>([]);

  const router = useRouter();

  useEffect(() => {
    const getTransactions = async () => {
      await getTransactionByClientEmail(clientData.email)
        .then((el) => {
          setTransactions(el);
        })
        .catch((err) => console.log(err));
    };

    getTransactions();
  }, [clientData.email]);

  return (
    <div className="history__wrapper">
      <div className="history__tab">
        <h2>Historique de transactions pour</h2>
        <select name="" id="">
          {months.map((el) => {
            return (
              <option key={el.id} value="">
                {el.name}
              </option>
            );
          })}
        </select>
        <select name="" id="">
          {years.map((el) => {
            return (
              <option key={el.id} value="">
                {el.year}
              </option>
            );
          })}
        </select>
      </div>
      <div className="history__histories">
        <div className="history__histories--cards">
          {transactions.map((el) => {
            return (
              <div
                onClick={() =>
                  el.status === "uncomfirmed" &&
                  router.push(`/comfirmation/${el.id}`)
                }
                key={el.id}
                className="history__histories--card"
              >
                <div className="history__histories--card__left">
                  <div className="img">
                    <Image
                      src={`https://avatar.iran.liara.run/public/${
                        voyelles.includes(el.receiverName.split(" ")[1])
                          ? "girl"
                          : "boy"
                      }?username=${el.receiverName.split(" ")[1]}`}
                      alt=""
                      fill
                    />
                  </div>
                  <span>{el.receiverName}</span>
                </div>
                <div className="history__histories--card__right">
                  <p>{el.Network.pubicName}</p>
                  <div className="date">
                    <p>
                      {moment(parseInt(el.dateTime)).utc().format("dddd, YYYY")}
                    </p>
                    <span>{"el.time"}</span>
                  </div>
                  <small className={el.type === "receive" ? "red" : ""}>
                    {clientData.Country.currency} {el.amountToSend}
                  </small>
                  <strong
                    className={
                      el.status === "en cours"
                        ? "yellow"
                        : el.status === "uncomfirmed"
                        ? "grey"
                        : ""
                    }
                  >
                    {el.status === "uncomfirmed" ? "en attente" : el.status}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tab;
