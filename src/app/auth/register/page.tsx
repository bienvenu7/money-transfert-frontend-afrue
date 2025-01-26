import Form from "@/app/components/Form";
import { getCountries } from "@/app/utils/getCountry";
import { ICountry } from "@/types/country";
import Image from "next/image";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const countries: ICountry[] = (await getCountries()) as ICountry[];

  return (
    <div className="auth__container">
      <div className="auth__wrapper">
        <div className="auth__logo">
          <Image src="/logo.png" alt="" fill />
        </div>
        <Form pageName="S'enregistrer" />
      </div>
    </div>
  );
};

export default page;
