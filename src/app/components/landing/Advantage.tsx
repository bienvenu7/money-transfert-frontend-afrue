"use client";
import React, { forwardRef, useState } from "react";
import CardAdv from "./CardAdv";

const cardAdvantages = [
  {
    id: "01",
    title: "Sécurité des transactions",
    description:
      "Chez AfruE, la sécurité est notre priorité absolue. Nous protégeons la confidentialité et l'intégrité de vos transactions grâce à des mesures de sécurité rigoureuses. Un système de cryptage avancé garantit la confidentialité de vos données et réduit le risque de fraude, garantissant ainsi que vos fonds sont transférés en toute sécurité.",
    uri: "/advantage/lock.png",
  },
  {
    id: "02",
    title: "Rapidité et efficacité",
    description:
      "AfruE se distingue par sa rapidité et son efficacité dans le transfert d'argent, en veillant à ce que vos fonds arrivent rapidement à destination grâce à un réseau étendu de partenaires. Nous offrons également des frais compétitifs et un système de suivi transparent pour vous permettre de gérer vos transferts en toute simplicité et avec confiance.",
    uri: "/advantage/rocket.png",
  },
  {
    id: "03",
    title: "Fiabilité et transparence",
    description:
      "Chez AfruE, nous offrons un service fiable et transparent pour garantir la confiance dans vos transactions financières. Nous garantissons l’exactitude des informations fournies et veillons à ce que vos fonds soient transférés en toute transparence. De plus, notre équipe de service client dédiée est toujours disponible pour répondre à vos questions et vous assister à chaque étape du processus.",
    uri: "/advantage/secure.png",
  },
  {
    id: "04",
    title: "Options de transfert flexibles",
    description:
      "AfruE sait que chaque client a des besoins uniques en matière de transfert d'argent. C'est pourquoi nous proposons des options de transfert flexibles, qu'il s'agisse d'un envoi urgent en quelques minutes ou d'un transfert programmé à l'avance. Nous offrons également des taux de change compétitifs et des frais raisonnables pour vous assurer la meilleure valeur pour votre argent.",
    uri: "/advantage/card.png",
  },
  {
    id: "05",
    title: "Expertise et expérience",
    description:
      "Avec une solide expérience dans l'industrie des transferts d'argent, AfruE met à votre service une expertise approfondie. Notre équipe de professionnels chevronnés maîtrise les complexités des transferts internationaux et utilise sa connaissance des réglementations financières et des systèmes bancaires pour garantir des transferts rapides et efficaces.",
    uri: "/advantage/medal.png",
  },
  {
    id: "06",
    title: "Engagement envers la satisfaction du client",
    description:
      "Chez AfruE, la satisfaction client est notre priorité. Nous nous efforçons de dépasser vos attentes à chaque étape du transfert, qu'il s'agisse d'un particulier ou d'une entreprise. Nous nous engageons à offrir un service personnalisé et une expérience exceptionnelle. Vos commentaires et suggestions sont toujours les bienvenus pour nous aider à améliorer nos services et mieux répondre à vos besoins.",
    uri: "/advantage/icon.png",
  },
];

type Props = {};

const Advantage = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const [isActive, setIsActive] = useState<string>("01");

  return (
    <div className="main__advantage" id="advantage">
      <div className="main__advantage--wrapper">
        <h2>Avantages</h2>
        <div className="main__advantage--cards">
          {cardAdvantages.map((el, index) => {
            return (
              <CardAdv
                el={el}
                key={el.id}
                index={index}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

Advantage.displayName = "Advantage";
export default Advantage;
