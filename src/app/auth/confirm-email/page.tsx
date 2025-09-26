"use client";

import { confirmEmail, reconfirmEmail } from "@/app/actions/auth";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  AiFillCheckCircle,
  AiOutlineFrown,
  AiOutlineSmile,
} from "react-icons/ai";

type Props = {};

const Page = (props: Props) => {
  const hash = useSearchParams().get("hash");
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState("");

  const initialized = useRef(false);

  const emailConfirmation = async () => {
    await confirmEmail(hash as string)
      .then((el) => {
        if (el.statusCode === 200) {
          setMessage(el.message);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!initialized.current && hash) {
      initialized.current = true;
      emailConfirmation();
    }
  }, []);

  const resendLink = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await reconfirmEmail(hash as string)
      .then((el: { message: string }) => setConfirm(el.message))
      .catch((error) => console.error(error));
  };

  return (
    <div className="comfirm__container">
      <div className="comfirm__box">
        {message === "done" ? (
          <div className="comfirm__success">
            <AiOutlineSmile />
            <h1>Super!</h1>
            <p>
              Votre adresse email a été validé avec success. Vous pouvez
              maintenant appuyez sur le bouton ci dessous pour vous connecter
              sur votre compte récemment créer.
            </p>
            <Link href={"/auth/login"}>Allez vous connecter</Link>
          </div>
        ) : (
          <div className="comfirm__failed">
            {confirm !== "done" ? (
              <div className="comfirm__failed--first">
                <AiOutlineFrown />
                <h1>Oups!</h1>
                <p>
                  {
                    "Nous n'avions pas pu vérifier votre adresse email pour une quelconque raison. S'il vous plait, veillez cliquer sur le bouton ci dessous pour recevoir un nouveau lien d'activation."
                  }
                </p>
                <button onClick={resendLink}>Recevoir un nouveau lien</button>
              </div>
            ) : (
              <div className="comfirm__failed--second">
                <AiFillCheckCircle />
                <h1>Envoyé!</h1>
                <p>
                  Nous vous avions envoyé un nouveau lien de confirmation via
                  votre adresse email.
                  <br />
                  {"S'il vous plait veillez vérifier votre boite aux lettres."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
