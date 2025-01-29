"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { login, register } from "../actions/auth";
import { errorMessage, successMessage } from "../utils/notification";
import Otp from "./Otp";
import { getCountries } from "../utils/getCountry";
import { ICountry } from "@/types/country";
import Image from "next/image";
import { IBadResquestErrorData, IBaseErrorData } from "@/types/fetch";
import { useRouter } from "next/navigation";

type Props = {
  pageName: string;
  // countries: ICountry[] | null;
};

const Form = ({ pageName }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPasword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [countryError, setCountryError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);

  const [countries, setCountries] = useState<ICountry[]>([]);

  const router = useRouter();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setConfirmError(false);
    setCountryError(false);
    setEmailError("");
    setNameError(false);
    setPasswordError("");

    if (confirmPassword !== password) {
      setConfirmError(true);
    } else {
      //handling registration with the server👇🏽
      await register(email, password, name, country)
        .then((el) => {
          if (el.statusCode === 200) {
            setConfirmError(false);
            setConfirmPassword("");
            setEmail("");
            setEmailError("");
            setPasswordError("");
            setPasword("");
            successMessage(el.message);
            setNameError(false);
            setCountryError(false);
          } else if (el.statusCode === 400) {
            const obj = el as IBadResquestErrorData;
            obj.data?.map((x) => {
              if (x.message.split(":")[0].includes("email")) {
                setEmailError(x.message.split(":")[1]);
              } else if (x.message.split(":")[0].includes("password")) {
                setPasswordError(x.message.split(":")[1]);
              } else if (x.message.split(":")[0].includes("fullName")) {
                setNameError(true);
              } else if (x.message.split(":")[0].includes("countryId")) {
                setCountryError(true);
              }
            });
          } else {
            const obj = el as IBaseErrorData;
            errorMessage(obj.message);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError("");
    setPasswordError("");

    //handling login to the server👇🏽
    await login(email, password)
      .then((el) => {
        console.log(el);
        if (el.statusCode === 200) {
          setChecking(true);
          setPasword("");
          setEmailError("");
          setEmailError("");
        } else if (el.statusCode === 400) {
          const obj = el as IBadResquestErrorData;
          obj.data?.map((x) => {
            if (x.message.split(":")[0].includes("email")) {
              setEmailError(x.message.split(":")[1]);
            } else if (x.message.split(":")[0].includes("password")) {
              setPasswordError(x.message.split(":")[1]);
            }
          });
        } else {
          const obj = el as IBaseErrorData;
          // if (obj.statusCode === 500) {
          //   router.push("/500");
          // }
          errorMessage(obj.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const allCountries = async (): Promise<void> => {
    setCountries(await getCountries());
  };

  useEffect(() => {
    allCountries();
  }, []);

  return (
    <>
      {!checking ? (
        <form
          onSubmit={(event) =>
            pageName === "S'enregistrer" ? submit(event) : submitLogin(event)
          }
          className="form__container"
        >
          <h1 className="title">{pageName}</h1>
          <div className="form__inputs">
            {pageName === "S'enregistrer" && (
              <>
                <div className="form__input">
                  <label htmlFor="username">Nom Prénom</label>
                  <input
                    id="username"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type={"text"}
                    placeholder="Votre nom et prénom(s)"
                  />
                  {nameError && (
                    <p>Veillez entrer votre nom et votre prénom!</p>
                  )}
                </div>
                <div className="form__input">
                  <label htmlFor="country">Localité</label>
                  <select
                    className={country !== "" ? "colored" : ""}
                    onChange={(el) => setCountry(el.target.value)}
                    defaultValue=""
                    id="country"
                  >
                    <option value="">Sélectionez votre localité</option>
                    {countries?.map((el) => (
                      <option value={el.id} key={el.id}>
                        {el.pubicName}
                      </option>
                    ))}
                  </select>
                  {countryError && <p>Veillez sélectioner une localité!</p>}
                </div>
              </>
            )}
            <div className="form__input">
              <label htmlFor="email">{`*Entrer l'e-mail`}</label>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                placeholder="Exemple@mail.com"
                value={email}
              />
              {emailError !== "" && <p>{emailError}</p>}
            </div>
            <div className="form__input">
              <label htmlFor="password">*Entrez votre mot de passe</label>
              <input
                id="password"
                onChange={(e) => setPasword(e.target.value)}
                type={"password"}
                placeholder="Mot de passe (Min 8 charactères)"
                value={password}
              />
              {passwordError !== "" && <p>{passwordError}</p>}
            </div>
            {pageName === "S'enregistrer" && (
              <div className="form__input">
                <label htmlFor="confirm">Confirmer le mot de passe</label>
                <input
                  id="confirm"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type={"password"}
                  placeholder="Confirmer le mot de passe"
                />
                {confirmError && <p>Veillez saisir le même mot de passe!</p>}
              </div>
            )}
            {pageName === "Se connecter" && (
              <Link href={"/"}>Mot de passe oublié ?</Link>
            )}

            <button type={"submit"}>
              {pageName === "S'enregistrer" ? `S'enregistrer` : "Se connecter"}
            </button>
            {pageName === "Se connecter" && (
              <p>
                Pas encore de compte?{" "}
                <Link href={"/auth/register"}>{"S'enregistrer"}</Link>
              </p>
            )}
            {pageName === "S'enregistrer" ? (
              <>
                <p>
                  Déja enregistrer?{" "}
                  <Link href={"/auth/login"}>Se connecter</Link>
                </p>
                <p className="second">
                  En vous inscrivant, vous acceptez nos{" "}
                  <Link href={"/"}>
                    {
                      "conditions d'utilisation et notre politique de confidentialité."
                    }
                  </Link>
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </form>
      ) : (
        <Otp email={email} />
      )}
    </>
  );
};

export default Form;
