"use client";
import { emailRegex, isValidPassword } from "@/app/utils/errorHandle";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const Recovery = (props: Props) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [password, setPasword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [confirmError, setConfirmError] = useState<boolean>(false);

  const handleStep = () => {
    if (!emailRegex(email) && step === 1) {
      setEmailError("Veillez entrer un addresse email valide!");
      return;
    }

    if (!isValidPassword(password) && step === 2) {
      setPasswordError(
        "Votre mot de passe doit contenir au moins:<br/>*une lettre majiscule<br/>*une lettre miniscule<br/>*un chiffre"
      );

      if (password !== confirmPassword) {
        setConfirmError(true);
      }

      return;
    }

    setStep((prev) => prev + 1);
  };

  return (
    <div className="auth__container">
      <div className="auth__wrapper">
        <div className="auth__logo">
          <Image src="/logo.png" alt="" fill />
        </div>
        <div className="form__container">
          <h1 className="title">Réinitialiser</h1>
          <div className="form__inputs">
            {step === 1 ? (
              <div className="form__input">
                <label htmlFor="email">{`*Votre email`}</label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type={"email"}
                  placeholder="Exemple@mail.com"
                  value={email}
                  className={emailError !== "" ? "underline" : ""}
                />
              </div>
            ) : (
              <>
                <div className="form__input">
                  <label htmlFor="password">*Entrez votre mot de passe</label>
                  <input
                    id="password"
                    onChange={(e) => setPasword(e.target.value)}
                    type={"password"}
                    placeholder="Mot de passe (Min 8 charactères)"
                    value={password}
                    className={passwordError !== "" ? "underline" : ""}
                  />
                  {passwordError !== "" && (
                    <p dangerouslySetInnerHTML={{ __html: passwordError }} />
                  )}
                </div>
                <div className="form__input">
                  <label htmlFor="confirm">Confirmer le mot de passe</label>
                  <input
                    id="confirm"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    type={"password"}
                    placeholder="Confirmer le mot de passe"
                    className={confirmError ? "underline" : ""}
                  />
                  {confirmError && (
                    <p>Veillez saisir le même mot de passe une seconde fois!</p>
                  )}
                </div>
              </>
            )}
            <button type={"button"} onClick={handleStep}>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
