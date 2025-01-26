import Form from "@/app/components/Form";
import Image from "next/image";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="auth__container">
      <div className="auth__wrapper">
        <div className="auth__logo">
          <Image src="/logo.png" alt="" fill />
        </div>
        <Form pageName="Se connecter" />
      </div>
    </div>
  );
};

export default page;
