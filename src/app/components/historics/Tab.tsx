"use client";
import React, { useEffect, useRef, useState } from "react";
import { SlCalender } from "react-icons/sl";
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
    id: "01",
    name: "Janvier",
    publicName: "janvier",
  },
  {
    id: "02",
    name: "Février",
    publicName: "février",
  },
  {
    id: "03",
    name: "Mars",
    publicName: "mars",
  },
  {
    id: "04",
    name: "Avril",
    publicName: "avril",
  },
  {
    id: "05",
    name: "Mai",
    publicName: "mai",
  },
  {
    id: "06",
    name: "Juin",
    publicName: "juin",
  },
  {
    id: "07",
    name: "Julliet",
    publicName: "julliet",
  },
  {
    id: "08",
    name: "Août",
    publicName: "août",
  },
  {
    id: "09",
    name: "Septembre",
    publicName: "septembre",
  },
  {
    id: "10",
    name: "Octobre",
    publicName: "octobre",
  },
  {
    id: "11",
    name: "Novenbre",
    publicName: "novenbre",
  },
  {
    id: "12",
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
  const [transactions, setTransactions] = useState<ITrasanctionResponse[]>([]);
  const [month, setMonth] = useState<string>(actualMonth);
  const [year, setYear] = useState<string>(actualYear);

  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleLabelClick = () => {
    inputRef.current?.showPicker(); // Native HTML5 calendar open
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSelectedDate(e.target.value);
    setMonth(
      months.find((el) => el.id === e.target.value.split("-")[1])
        ?.publicName as string
    );
    setYear(e.target.value.split("-")[0]);
    console.log(e.target.value);
  };

  useEffect(() => {
    const getTransactions = async () => {
      await getTransactionByClientEmail(clientData.email, month, year)
        .then((el) => {
          setTransactions(el as ITrasanctionResponse[]);
        })
        .catch((err) => console.log(err));
    };

    // Initial fetch
    getTransactions();

    // Set up interval to run the entire effect every 30 seconds
    const interval = setInterval(() => {
      console.log("loading transactions");
      getTransactions();
    }, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [month, year]); // Remove dependencies so effect runs only on mount and then every 30s

  return (
    <div className="history__wrapper">
      <div className="history__tab">
        <h2>Historique de transactions pour</h2>
        <div className="date">
          {month}, {year}
        </div>
        <div className="history__tab--calandar">
          <button onClick={handleLabelClick}>
            <SlCalender />
          </button>
          <input
            type={"month"}
            ref={inputRef}
            onChange={handleChange}
            className="hidden-date-input"
          />
        </div>
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
