import { getAuth } from "@/app/actions/auth";
import Personal from "@/app/components/profile/Personal";
import Titles from "@/app/components/Titles";
import { IClientResponse } from "@/types/user";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const clientData = (await getAuth().catch((er) =>
    console.log(er)
  )) as IClientResponse;
  const voyelles = ["e", "a"];
  const name = clientData?.fullName.split(" ")[0];

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
                    voyelles.includes(name[name.length - 1]) ? "girl" : "boy"
                  }?username=${name}`}
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
