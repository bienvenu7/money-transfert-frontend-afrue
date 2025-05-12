import { getAuth } from "@/app/actions/auth";
import Personal from "@/app/components/profile/Personal";
import Titles from "@/app/components/Titles";
import { getCountries } from "@/app/utils/getCountry";
import { ICountry } from "@/types/country";
import { cookies } from "next/headers";
import React from "react";

const getC = async () => {
  "use server";
  let countries;
  if (cookies().get("public_country")?.value !== undefined) {
    return JSON.parse(
      cookies().get("public_country")?.value as string
    ) as ICountry[];
  }

  await getCountries().then((el) => {
    countries = el as ICountry[];
  });
  return countries as any;
};

const page = async () => {
  const clientData = await getAuth();

  const countries: ICountry[] = await getC();

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
                    countries={countries}
                  />
                  <Personal
                    type="Sécurité"
                    clientData={null}
                    countries={countries}
                  />
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
