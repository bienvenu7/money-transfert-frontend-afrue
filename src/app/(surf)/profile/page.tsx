import { getAuth } from "@/app/actions/auth";
import Header from "@/app/components/profile/Header";
import Personal from "@/app/components/profile/Personal";
import { IClientResponse } from "@/types/user";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const clientData = (await getAuth()) as IClientResponse;

  return (
    <>
      {clientData ? (
        <div className="profile__container">
          <div className="profile__box">
            <Header fullName={clientData?.fullName} />
            <Personal type="Information personnelle" clientData={clientData} />
            <Personal type="Sécurité" clientData={null} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default page;
