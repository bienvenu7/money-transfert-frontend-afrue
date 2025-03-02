import Tab from "@/app/components/historics/Tab";
import Titles from "@/app/components/Titles";
import { instance } from "@/instance";
import { IClientResponse } from "@/types/user";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
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

const getMe = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  if (accessToken === undefined) {
    redirect("/auth/login");
  }

  const { data } = await instance.get("auth/get-auth", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data as IClientResponse;
};

const page = async (props: Props) => {
  const clientData = await getMe();

  return (
    <div className="history__container">
      <div className="history__box">
        <Titles line1="Historique " line2="Afru-Exchange " />
        <Tab clientData={clientData} />
      </div>
    </div>
  );
};

export default page;
