import Histories from "@/app/components/historics/Histories";
import Tab from "@/app/components/historics/Tab";
import Titles from "@/app/components/Titles";
import Image from "next/image";
import React from "react";

type Props = {};

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

const stories = [
  {
    id: 1,
    name: "Ella Mathieu",
    network: "cash",
    date: "Janvier 13, 2024",
    time: "11:10am",
    amount: "+$1,200",
    status: "Completed",
  },
  {
    id: 2,
    name: "Debbie Oba",
    network: "Mtn money",
    date: "Janvier 17, 2024",
    time: "11:10am",
    amount: "-$100",
    status: "Pending",
  },
  {
    id: 3,
    name: "Olga may",
    network: "Airtel money",
    date: "Janvier 27, 2024",
    time: "11:10am",
    amount: "-$1004",
    status: "failed",
  },
];

const page = (props: Props) => {
  const voyelles = ["e", "a"];

  return (
    <div className="history__container">
      <div className="history__box">
        <Titles line1="Historique " line2="Afru-Exchange " />
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
              {stories.map((el) => {
                return (
                  <div key={el.id} className="history__histories--card">
                    <div className="history__histories--card__left">
                      <div className="img">
                        <Image
                          src={`https://avatar.iran.liara.run/public/${
                            voyelles.includes(el.name.split(" ")[1])
                              ? "girl"
                              : "boy"
                          }?username=${el.name.split(" ")[1]}`}
                          alt=""
                          fill
                        />
                      </div>
                      <span>{el.name}</span>
                    </div>
                    <div className="history__histories--card__right">
                      <p>{el.network}</p>
                      <div className="date">
                        <p>{el.date}</p>
                        <span>{el.time}</span>
                      </div>
                      <small>{el.amount}</small>
                      <strong>{el.status}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <Tab />
        <Histories title="Aujourd'hui" />
        <Histories title="Hier" /> */}
      </div>
    </div>
  );
};

export default page;
