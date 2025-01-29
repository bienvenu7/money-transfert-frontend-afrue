"use client";
import React from "react";
import { useEffect, useState } from "react";
import { confirmOtp, resendOtp } from "../actions/auth";
import { useRouter } from "next/navigation";
import Countdown from "react-countdown";
import { errorMessage, successMessage } from "../utils/notification";
import { IBadResquestErrorData } from "@/types/fetch";

type Props = {
  email: string;
};

const Otp = ({ email }: Props) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [disable, setDisable] = useState<boolean>(false);
  const [count, setCount] = useState(60);
  const router = useRouter();

  useEffect(() => {
    if (otp[otp.length - 1] !== "") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [otp]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (isNaN(event.target.value as any)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? event.target.value : d))]);

    //Focus next input
    if (event.target.nextSibling) {
      (event.target.nextSibling as any).focus();
    }
  };

  const sendOtp = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (!disable) {
      return;
    }

    await confirmOtp(email, otp)
      .then((el) => {
        if (el.statusCode === 200) {
          setDisable(false);
          router.push("/");
        } else {
          setDisable(false);
          errorMessage("Le code entré n'est pas correcte!");
        }
      })
      .catch((error) => console.error(error));
  };

  const resend = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    await resendOtp(email)
      .then(() => successMessage("Un nouveau code a été envoyé avec success"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="auth__otp">
      <div className="auth__otp--box">
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          id="secure"
          // class="icon glyph"
        >
          <path
            d="M19.42,3.83,12.24,2h0A.67.67,0,0,0,12,2a.67.67,0,0,0-.2,0h0L4.58,3.83A2,2,0,0,0,3.07,5.92l.42,5.51a12,12,0,0,0,7.24,10.11l.88.38h0a.91.91,0,0,0,.7,0h0l.88-.38a12,12,0,0,0,7.24-10.11l.42-5.51A2,2,0,0,0,19.42,3.83ZM15.71,9.71l-4,4a1,1,0,0,1-1.42,0l-2-2a1,1,0,0,1,1.42-1.42L11,11.59l3.29-3.3a1,1,0,0,1,1.42,1.42Z"
            // style="fill:#231f20"
          ></path>
        </svg>
        <h1>Veillez entrer le code</h1>
      </div>
      <div className="auth__otp--inputs">
        {otp.map((el, index) => (
          <input
            key={index}
            type={"text"}
            value={el}
            onChange={(e) => handleChange(e, index)}
            onFocus={(e) => e.target.select()}
            maxLength={1}
          />
        ))}
      </div>
      <button className="text" onClick={resend}>
        Envoyer un nouveau code
      </button>
      <button
        // disabled={disable}
        style={!disable ? { backgroundColor: "rgba(97, 131, 245, .5)" } : {}}
        onClick={sendOtp}
      >
        Confirmer
      </button>
    </div>
  );
};

export default Otp;
