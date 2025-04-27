import { timeCreated } from "@/app/utils/currentTime";
import { ITrasanctionResponse } from "@/types/transaction";
import { IClientResponse } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  el: ITrasanctionResponse;
  clientData: IClientResponse;
};

const CardMobile = ({ el, clientData }: Props) => {
  const router = useRouter();

  const voyelles = ["e", "a"];

  return (
    <div
      onClick={() =>
        (el.status === "uncomfirmed" || el.complain !== "") &&
        router.push(`/comfirmation/${el.id}`)
      }
      key={el.id}
      className="history__histories--card"
    >
      <div className="history__histories--card__left">
        <div className="img">
          <Image
            src={`https://avatar.iran.liara.run/public/${
              voyelles.includes(el.receiverName.split(" ")[1]) ? "girl" : "boy"
            }?username=${el.receiverName.split(" ")[1]}`}
            alt=""
            fill
          />
        </div>
        <span>{el.receiverName}</span>
        <div className="date">
          <p>{`${el.month}, ${el.year}`}</p>
          <span>
            {el.hour === "" ? timeCreated(parseInt(el.dateTime)) : el.hour}
          </span>
        </div>
      </div>
      <div className="history__histories--card__right">
        <p>{el.Network.pubicName}</p>
        <div className="date">
          <p>{`${el.month}, ${el.year}`}</p>
          <span>
            {el.hour === "" ? timeCreated(parseInt(el.dateTime)) : el.hour}
          </span>
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
              : el.status === "en cours" &&
                el.adminCheck === "second confirmation"
              ? ""
              : ""
          }
        >
          {el.status === "uncomfirmed"
            ? "en attente"
            : el.status === "en cours" &&
              el.adminCheck === "second comfirmation"
            ? "éffectuée"
            : el.status}
        </strong>
      </div>
    </div>
  );
};

export default CardMobile;
