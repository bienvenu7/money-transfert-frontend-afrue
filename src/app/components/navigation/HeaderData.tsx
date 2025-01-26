import { IClientResponse } from "@/types/user";
import Image from "next/image";
import React from "react";

type Props = {
  clientData: IClientResponse;
};

const HeaderData = ({ clientData }: Props) => {
  const voyelles = ["e", "a"];
  const name = clientData?.fullName?.split(" ")[0] as string;
  return (
    <>
      <div className="avatar">
        <Image
          src={`https://avatar.iran.liara.run/public/${
            voyelles.includes(name[name.length - 1]) ? "girl" : "boy"
          }?username=${name}`}
          alt={clientData?.fullName}
          fill
        />
      </div>
      <p>{clientData.fullName}</p>
      <span>{clientData.email}</span>
    </>
  );
};

export default HeaderData;
