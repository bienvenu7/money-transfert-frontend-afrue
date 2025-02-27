import React from "react";
import CardPersonnel from "./CardPersonnel";
import { IClientResponse } from "@/types/user";

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
};

const Personal = ({ type, clientData }: Props) => {
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
  return (
    <div className="profile__personel">
      <h2>{type}</h2>
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
  );
};

export default Personal;
