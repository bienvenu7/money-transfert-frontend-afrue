import { day, timeCreated } from "@/app/utils/currentTime";
import { ITrasanctionResponse, Status } from "@/types/transaction";
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
        (el.status === ("WAITING" as any) || el.status === ("ERROR" as any)) &&
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
          <p>{`${day(parseInt(el.dateTime))}`}</p>
          <span>{timeCreated(parseInt(el.dateTime))}</span>
        </div>
      </div>
      <div className="history__histories--card__right">
        <p>{el.Network.pubicName}</p>
        <div className="date">
          <p>{`${day(parseInt(el.dateTime))}`}</p>
          <span>
            {el.hour === "" ? timeCreated(parseInt(el.dateTime)) : el.hour}
          </span>
        </div>
        <small className={el.type === "receive" ? "red" : ""}>
          {clientData.Country.currency} {el.amountToSend}
        </small>
        <strong
          className={
            el.status === ("INPROGRESS" as any)
              ? "yellow"
              : el.status === ("WAITING" as any)
              ? "grey"
              : el.status === ("ERROR" as any)
              ? "red"
              : el.status === ("FINISH" as any)
              ? "green"
              : ""
          }
        >
          {el.status === ("INPROGRESS" as any)
            ? "En cours"
            : el.status === ("WAITING" as any)
            ? "En attente"
            : el.status === ("ERROR" as any)
            ? "Erreur"
            : el.status === ("FINISH" as any)
            ? "Efféctuée"
            : ""}
        </strong>
      </div>
    </div>
  );
};

export default CardMobile;
