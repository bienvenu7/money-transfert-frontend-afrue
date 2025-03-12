import { getAuth } from "@/app/actions/auth";
import Personal from "@/app/components/profile/Personal";
import Titles from "@/app/components/Titles";
import { IClientResponse } from "@/types/user";
import React from "react";

const page = async () => {
  const clientData = await getAuth();

  return (
    <>
      {clientData ? (
        <div className="profile__container">
          <div className="profile__box">
            <Titles line1="Votre profile" line2="Afru-Exchange" />
            <div className="profile__wrapper">
              <div className="profile__content">
                <img
                  src={`https://avatar.iran.liara.run/public/${
                    clientData.gender === "Femme" ? "girl" : "boy"
                  }?username=${clientData?.fullName}`}
                  alt=""
                />
                <div className="profile__data">
                  <Personal
                    type="Information personnelle"
                    clientData={clientData}
                  />
                  <Personal type="Sécurité" clientData={null} />
                </div>
              </div>
            </div>
            {/* <Header fullName={clientData?.fullName} /> */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default page;
