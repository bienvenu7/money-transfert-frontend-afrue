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
import { isValidPassword } from "../utils/errorHandle";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

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
  const [genre, setGenre] = useState<"Homme" | "Femme" | "">("");
  const [countryError, setCountryError] = useState<boolean>(false);
  const [genreError, setGenreError] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  console.log(showPassword);

  const [countries, setCountries] = useState<ICountry[]>([]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setConfirmError(false);
    setCountryError(false);
    setEmailError("");
    setNameError(false);
    setPasswordError("");
    setGenreError(false);

    if (name === "" || name.length <= 3) {
      setNameError(true);
    } else if (country === "") {
      setCountryError(true);
    } else if (genre === "") {
      setGenreError(true);
    } else if (email === "") {
      setEmailError("Veillez entrer un mail valide!");
    } else if (password.length < 8 || !isValidPassword(password)) {
      setPasswordError(
        "Votre mot de passe doit contenir au moins:<br/>*une lettre majiscule<br/>*une lettre miniscule<br/>*un chiffre"
      );
    } else if (confirmPassword !== password) {
      setConfirmError(true);
    } else {
      //handling registration with the server👇🏽
      await register(email, password, name, country, genre)
        .then((el) => {
          if (el.statusCode === 201) {
            setConfirmError(false);
            setConfirmPassword("");
            setEmail("");
            setEmailError("");
            setPasswordError("");
            setPasword("");
            successMessage(el.message);
            setNameError(false);
            setCountryError(false);
            setGenreError(false);
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
            console.log(obj);
            errorMessage(obj.message);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    setEmailError("");
    setPasswordError("");

    if (password.length < 8) {
      setIsLoading(false);
      return setPasswordError(
        "Le mote passe doit contenir minimun 8 caraactères!"
      );
    } else if (!email.includes("@")) {
      setIsLoading(false);
      return setEmailError("Votre addresse email n'est pas valide.");
    } else {
      //handling login to the server👇🏽
      await login(email, password)
        .then((el) => {
          console.log(el);
          if (el.statusCode === 200) {
            return setChecking(true);
          } else if (el.statusCode === 400) {
            const obj = el as IBadResquestErrorData;
            obj.data?.map((x) => {
              if (x.message.split(":")[0].includes("email")) {
                setEmailError(x.message.split(":")[1]);
              } else if (x.message.split(":")[0].includes("password")) {
                setPasswordError(x.message.split(":")[1]);
              }
            });
            return;
          } else {
            const obj = el as IBaseErrorData;
            if (obj.message.includes("mot de passe")) {
              setPasswordError(obj.message);
            }
          }
        })
        .catch((error) => {
          errorMessage(
            "Une erreur inconnue s'est produite, veillez resseyer plutard!"
          );
        })
        .finally(() => {
          setPasword("");
          setEmailError("");
          setEmailError("");
          setIsLoading(false);
        });
    }
  };

  const allCountries = async (): Promise<void> => {
    setCountries(await getCountries());
  };

  const genders = ["Homme", "Femme"];

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
                    className={nameError ? "underline" : ""}
                  />
                  {nameError && (
                    <p>Veillez entrer votre nom et votre prénom!</p>
                  )}
                </div>
                <div className="form__input">
                  <label htmlFor="country">Localité</label>
                  <select
                    className={countryError ? "underline" : ""}
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
                <div className="form__input">
                  <label htmlFor="country">Genre</label>
                  <select
                    className={genreError ? "underline" : ""}
                    onChange={(el) => setGenre(el.target.value as any)}
                    defaultValue=""
                    id="country"
                  >
                    <option value="">Sélectionez votre genre</option>
                    {genders.map((el, index) => (
                      <option value={el} key={index}>
                        {el}
                      </option>
                    ))}
                  </select>
                  {genreError && <p>Veillez sélectioner votre genre!</p>}
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
                className={emailError !== "" ? "underline" : ""}
              />
              {emailError !== "" && <p>{emailError}</p>}
            </div>
            <div className="form__input">
              <label htmlFor="password">*Entrez votre mot de passe</label>
              <input
                id="password"
                onChange={(e) => setPasword(e.target.value)}
                type={!showPassword ? "password" : "text"}
                placeholder="Mot de passe (Min 8 charactères)"
                value={password}
                className={passwordError !== "" ? "underline" : ""}
              ></input>
              <button
                onClick={() => setShowPassword(!showPassword)}
                type={"button"}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
              {passwordError !== "" && (
                <p dangerouslySetInnerHTML={{ __html: passwordError }} />
              )}
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
                  className={confirmError ? "underline" : ""}
                />
                {confirmError && (
                  <p>Veillez saisir le même mot de passe une seconde fois!</p>
                )}
              </div>
            )}
            {loading && (
              <p style={{ color: "#5063bf" }}>
                {`En cours de véfication de vos identifiants. Veillez patienter s'il vous plait!
                ...`}
              </p>
            )}
            {pageName === "Se connecter" && (
              <Link href={"/auth/recovery"} shallow={true}>
                Mot de passe oublié ?
              </Link>
            )}

            <button disabled={loading} type={"submit"}>
              {pageName === "S'enregistrer" ? `S'enregistrer` : "Se connecter"}
            </button>
            {pageName === "Se connecter" && (
              <p>
                Pas encore de compte?{" "}
                <Link href={"/auth/register"} shallow={true}>
                  {"S'enregistrer"}
                </Link>
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
