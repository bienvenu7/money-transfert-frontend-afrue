"use client";
import React, { useEffect, useState } from "react";
import Transaction from "@/app/components/transaction/Transaction";
import { useDispatch } from "react-redux";
import Titles from "@/app/components/Titles";
import { SetTransactionDataThunk } from "@/redux/thunk/thunk";
import { AppDispatch } from "@/redux/store";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDatas = async () => {
      setLoading(true);
      await dispatch(SetTransactionDataThunk());
      setLoading(false);
    };
    getDatas();
  }, [dispatch]);

  return (
    <div className="transfert__container">
      <div className="transfert__box">
        <Titles line1="Transférez de l'argent" line2="Afru-Exchange " />
        <Transaction />
      </div>
    </div>
  );
};

export default Page;
