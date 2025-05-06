"use client";
import { getAccesToken, getAuth, logout } from "@/app/actions/auth";
import { IClientResponse } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useEffect, useRef, useState } from "react";

import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import HeaderData from "./HeaderData";
import { useRouter, usePathname } from "next/navigation";
import HeaderNoData from "./HeaderNoData";
import { errorMessage } from "@/app/utils/notification";
import Svgs from "../Svgs";

export interface Ilinks {
  name: string;
  icon: ReactElement<any, any>;
  uri: string;
}

const links: Ilinks[] = [
  {
    name: "Accueil",
    uri: "/",
    icon: <Svgs name="home" />,
  },
  {
    name: "Profile",
    uri: "/profile",
    icon: <Svgs name="profile" />,
  },
  {
    icon: <Svgs name="h-t-d" />,
    name: "Transaction",
    uri: "/transaction",
  },
  {
    name: "Historiques",
    uri: "/historiques",
    icon: <Svgs name="history" />,
  },
];

type Props = {
  clientData: IClientResponse;
};

const MobileNav = () => {
  const voyelles = ["e", "a"];
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [clientData, setClientData] = useState<IClientResponse>();

  const pathName = usePathname();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY <= lastScrollY) {
      // if scroll down hide the navbar
      setShow(false);
    } else {
      // if scroll up show the navbar
      setShow(true);
    }

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const modalRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const getClientData = async () => {
    setClientData((await getAuth()) as IClientResponse);
  };

  useEffect(() => {
    getClientData();
  }, []);

  const name = clientData?.fullName?.split(" ")[0] as string;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleLogout = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    await logout()
      .then((el) => {
        if (el.statusCode === 200) {
          setOpenMenu(false);
          router.push("/");
        } else {
          errorMessage("An error occurred, please try again later!");
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className={`navbar__mobile--container`}>
      <div className="navbar__mobile--header">
        <div
          className={`navbar__mobile--header__box ${
            pathName !== "/" ? "bg" : ""
          }`}
        >
          <div className="navbar__mobile--logo">
            <Image src={"/logo.png"} alt="" fill />
          </div>
          <ul className="navbar__mobile--list">
            <a href="/#about">A propos</a>
            <a href="/#advantage">Avantages</a>
            <a href="">Transaction</a>
            <a href="/#faq">FAQ</a>
          </ul>
          <div className="navbar__mobile--btn">
            {clientData !== undefined ? (
              <div className="navbar__mobile--btn__avatar">
                <Image
                  src={`https://avatar.iran.liara.run/public/${
                    clientData?.gender === "Femme" ? "girl" : "boy"
                  }?username=${name}`}
                  alt={clientData?.fullName}
                  fill
                />
              </div>
            ) : (
              <button
                onClick={() => router.push("/auth/login")}
                className="login"
              >
                Se connecter
              </button>
            )}
            <button className="menu" onClick={() => setOpenMenu(true)}>
              <Svgs name="menu" />
            </button>
          </div>
        </div>
        {clientData !== undefined ? (
          <button
            className={`${pathName !== "/" ? "bg" : ""}`}
            onClick={() => setOpenMenu(true)}
          >
            <Svgs name="menu" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div
        className={
          openMenu ? "navbar__mobile--menu open" : "navbar__mobile--menu"
        }
      >
        <div className="navbar__mobile--menu__wrapper">
          <div ref={modalRef} className="navbar__mobile--menu__box">
            <div className="navbar__mobile--menu__header">
              {clientData ? (
                <HeaderData clientData={clientData} />
              ) : (
                <HeaderNoData />
              )}
            </div>
            <ul className="navbar__mobile--menu__links">
              {links.map((el, index) => (
                <Link
                  onClick={() => setOpenMenu(false)}
                  key={index}
                  href={el.uri}
                  prefetch={true}
                  shallow={true}
                >
                  {el.icon} <span>{el.name}</span>
                </Link>
              ))}
            </ul>
            {clientData !== undefined ? (
              <button onClick={handleLogout}>
                <AiOutlineLogout /> <span>Se déconnecter</span>
              </button>
            ) : (
              <button onClick={() => router.push("/auth/login")}>
                <AiOutlineLogin /> <span>Se connecter</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="navbar__mobile--phone">
        <div className="navbar__mobile--phone__logo">
          <Image src={"/logo.png"} alt="" fill />
        </div>
        <button onClick={() => setOpenMenu(true)}>
          <Svgs name="menu" />
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
