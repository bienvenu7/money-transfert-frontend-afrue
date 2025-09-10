"use client";
import { resendOtp } from "@/app/actions/auth";
import Otp from "@/app/components/Otp";
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

  // The main reason step is not incrementing to 3 is likely due to the validation logic in step 2.
  // If there is any validation error (invalid password or passwords do not match), the function returns early and does not increment the step.
  // If resendOtp throws an error, step is also not incremented.
  // To help debug, let's add some console logs and clarify the flow:

  const handleStep = async () => {
    // Step 1: Validate email
    if (step === 1) {
      if (!emailRegex(email)) {
        setEmailError("Veillez entrer un addresse email valide!");
        console.log("Email validation failed");
        return;
      }
      setEmailError("");
      setStep((prev) => prev + 1);
      console.log("Step incremented to 2");
      return;
    }

    // Step 2: Validate password and confirmation
    if (step === 2) {
      let hasError = false;

      if (!isValidPassword(password)) {
        setPasswordError(
          "Votre mot de passe doit contenir au moins:<br/>*une lettre majiscule<br/>*une lettre miniscule<br/>*un chiffre"
        );
        hasError = true;
        console.log("Password validation failed");
      } else {
        setPasswordError("");
      }

      if (password !== confirmPassword) {
        setConfirmError(true);
        hasError = true;
        console.log("Password confirmation does not match");
      } else {
        setConfirmError(false);
      }

      if (hasError) {
        // If there is any error, do not increment step
        return;
      }

      // If all validations pass, send OTP and go to next step
      try {
        await resendOtp(email);
        setStep((prev) => prev + 1);
        console.log("Step incremented to 3");
      } catch (error) {
        setStep((prev) => prev + 1);
        console.log("resendOtp error", error);
      }
      return;
    }

    // For any other step, just increment
    setStep((prev) => prev + 1);
    console.log("Step incremented (other)");
  };

  return (
    <div className="auth__container">
      <div className="auth__wrapper">
        {step === 1 && (
          <>
            <div className="auth__logo">
              <Image src="/logo.png" alt="" fill />
            </div>
            <div className="form__container">
              <h1 className="title">Réinitialiser</h1>
              <div className="form__inputs">
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
                <button type={"button"} onClick={handleStep}>
                  Suivant
                </button>
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="auth__logo">
              <Image src="/logo.png" alt="" fill />
            </div>
            <div className="form__container">
              <h1 className="title">Réinitialiser</h1>
              <div className="form__inputs">
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
                <button type={"button"} onClick={handleStep}>
                  Suivant
                </button>
              </div>
            </div>
          </>
        )}
        {step === 3 && <Otp email={email} password={password} />}
      </div>
    </div>
  );
};

export default Recovery;
