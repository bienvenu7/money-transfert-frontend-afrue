"use server";
import React from "react";
import Transaction from "@/app/components/transaction/Transaction";
import { IClientResponse } from "@/types/user";
import { getCountries, getCountryById } from "@/app/utils/getCountry";
import { ICountry } from "@/types/country";
import { useDispatch } from "react-redux";
import { getCounties, getUser, getUserCountry } from "@/redux/clientReducer";
import Titles from "@/app/components/Titles";
import { cookies } from "next/headers";
import { baseURL, instance } from "@/instance";
import { errorToSendBack } from "@/app/utils/errorHandle";

async function getData() {
  const userUrl = `${baseURL}auth/get-auth`;
  const countriesUrl = `${baseURL}country/get-countries`;

  const accessToken = cookies().get("accessToken")?.value;

  const responses = await Promise.all([
    fetch(userUrl, { headers: { Authorization: `Bearer ${accessToken}` } }),
    fetch(countriesUrl),
  ]);

  if (!responses[0].ok) {
    throw new Error(
      "Un problème est survenu, veillez ressayer plutard ou vérifiez votre connection internet!"
    );
  }

  if (!responses[1].ok) {
    throw new Error(
      "Un problème est survenu, veillez ressayer plutard ou vérifiez votre connection internet!"
    );
  }

  const user: IClientResponse = await responses[0].json();
  const countries: ICountry[] = await responses[1].json();

  return { user, countries };
}

const Page = async () => {
  const { countries, user } = await getData();

  return (
    <div className="transfert__container">
      <div className="transfert__box">
        <Titles line1="Transférez de l'argent" line2="Afru-Exchange " />
        <Transaction clientData={user} countries={countries} />
      </div>
    </div>
  );
};

export default Page;
