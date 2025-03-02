"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { IClientResponse } from "@/types/user";
import { getTransactionByClientEmail } from "@/app/actions/transaction";
import { ITrasanctionResponse } from "@/types/transaction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  actualMonth,
  actualYear,
  localTime,
  timeCreated,
} from "@/app/utils/currentTime";
import CardMobile from "./CardMobile";

const months = [
  {
    id: 1,
    name: "Janvier",
    publicName: "janvier",
  },
  {
    id: 2,
    name: "Février",
    publicName: "février",
  },
  {
    id: 3,
    name: "Mars",
    publicName: "mars",
  },
  {
    id: 4,
    name: "Avril",
    publicName: "avril",
  },
  {
    id: 5,
    name: "Mai",
    publicName: "mai",
  },
  {
    id: 6,
    name: "Juin",
    publicName: "juin",
  },
  {
    id: 7,
    name: "Julliet",
    publicName: "julliet",
  },
  {
    id: 8,
    name: "Août",
    publicName: "août",
  },
  {
    id: 9,
    name: "Septembre",
    publicName: "septembre",
  },
  {
    id: 10,
    name: "Octobre",
    publicName: "octobre",
  },
  {
    id: 11,
    name: "Novenbre",
    publicName: "novenbre",
  },
  {
    id: 12,
    name: "Décembre",
    publicName: "décembre",
  },
];

const years = [
  {
    id: 1,
    year: 2024,
  },
  {
    id: 2,
    year: 2025,
  },
];

type Props = {
  clientData: IClientResponse;
};

const Tab = ({ clientData }: Props) => {
  const voyelles = ["e", "a"];

  const [transactions, setTransactions] = useState<ITrasanctionResponse[]>([]);
  const [month, setMonth] = useState<string>(actualMonth);
  const [year, setYear] = useState<string>(actualYear);

  useEffect(() => {
    const getTransactions = async () => {
      await getTransactionByClientEmail(clientData.email, month, year)
        .then((el) => {
          setTransactions(el);
        })
        .catch((err) => console.log(err));
    };

    getTransactions();
  }, [clientData.email, month, year]);

  return (
    <div className="history__wrapper">
      <div className="history__tab">
        <h2>Historique de transactions pour</h2>
        <select
          name=""
          id=""
          onChange={(e) => setMonth(e.target.value.toLocaleLowerCase())}
          value={month}
        >
          {months.map((el) => {
            return (
              <option key={el.id} value={el.publicName}>
                {el.name}
              </option>
            );
          })}
        </select>
        <select
          name=""
          id=""
          onChange={(e) => setYear(e.target.value.toLocaleLowerCase())}
          value={year}
        >
          {years.map((el) => {
            return (
              <option key={el.id} value={el.year}>
                {el.year}
              </option>
            );
          })}
        </select>
      </div>
      <div className="history__histories">
        <div className="history__histories--cards">
          {transactions.length >= 1 &&
            transactions.map((el) => {
              return <CardMobile clientData={clientData} el={el} key={el.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Tab;
