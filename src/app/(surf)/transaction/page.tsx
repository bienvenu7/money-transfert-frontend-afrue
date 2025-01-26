"use client";

import React, { useEffect } from "react";
import Transaction from "@/app/components/transaction/Transaction";
import { getAuth } from "@/app/actions/auth";
import { IClientResponse } from "@/types/user";
import { getCountries, getCountryById } from "@/app/utils/getCountry";
import { ICountry } from "@/types/country";
import { useDispatch } from "react-redux";
import { getCounties, getUser, getUserCountry } from "@/redux/clientReducer";

const Page = async () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const userData = (await getAuth()) as IClientResponse;
    dispatch(getCounties((await getCountries()) as ICountry[]));
    dispatch(getUser(userData));
    dispatch(
      getUserCountry(
        (await getCountryById(userData?.country as string)) as ICountry
      )
    );
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="transfert__container">
      <div className="transfert__box">
        <h1>Transaction</h1>
        <Transaction />
      </div>
    </div>
  );
};

export default Page;
