"use client";
import React, { useState } from "react";
import CardPersonnel from "./CardPersonnel";
import { IClientResponse } from "@/types/user";
import { TfiPencilAlt } from "react-icons/tfi";
import Modal from "../modals/Modal";
import Update from "./Update";
import { ICountry } from "@/types/country";

export interface IPCard {
  title: string;
  text: string;
}

export interface IPSecurity {
  title: string;
}

const PSCard: IPSecurity[] = [
  { title: "Changer le mot de passe" },
  { title: "Autres" },
];

type Props = {
  type: string;
  clientData: IClientResponse | null;
  countries: ICountry[];
};

const Personal = ({ type, clientData, countries }: Props) => {
  const PCard: IPCard[] = [
    {
      title: "Client numéro",
      text: `#${clientData?.clientNumber as number}`,
    },
    {
      title: "Nom et prenoms",
      text: clientData?.fullName as string,
    },
    {
      title: "Email",
      text: clientData?.email as string,
    },
    {
      title: "Téléphone",
      text: clientData?.whatsappNumber as string,
    },
    {
      title: "Pays",
      text: clientData?.Country.pubicName as string,
    },
  ];

  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="profile__personel">
        <div className="title">
          <h2>{type}</h2>
          {type === "Information personnelle" && (
            <button onClick={() => setOpenModal(true)}>
              <TfiPencilAlt />
            </button>
          )}
        </div>
        <div className="profile__personel--cards">
          {type !== "Sécurité"
            ? PCard.map((el) => (
                <CardPersonnel title={el.title} text={el.text} key={el.title} />
              ))
            : PSCard.map((el) => (
                <CardPersonnel title={el.title} text={""} key={el.title} />
              ))}
        </div>
      </div>
      <Modal onClose={() => setOpenModal(false)} show={openModal}>
        <Update
          countries={countries}
          clientData={clientData as IClientResponse}
        />
      </Modal>
    </>
  );
};

export default Personal;
