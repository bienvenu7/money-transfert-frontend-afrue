"use client";
import Image from "next/image";
import About from "../components/landing/About";
import Advantage from "../components/landing/Advantage";
import Cover from "../components/landing/Cover";
import Difference from "../components/landing/Difference";
import Faq from "../components/landing/Faq";
import Footer from "../components/landing/Footer";
import Mission from "../components/landing/Mission";
import Partners from "../components/landing/Partners";
import Show from "../components/landing/Show";
import Transfert from "../components/landing/Transfert";
import { useEffect, useState } from "react";
import { ICountry } from "@/types/country";
import { getCountries } from "../utils/getCountry";
import Cookies from "js-cookie";

// export const metadata: Metadata = {
//   icons: {
//     icon: "https://afrue.com/ico.png",
//   },
//   title: "Africa exchange",
//   description: "AfruE, your platform to send money quickly over sanctions.",
//   openGraph: {
//     images: "https://afrue.com/ico.png",
//     title: "Africa exchange",
//     description: "AfruE, your platform to send money quickly over sanctions.",
//   },
// };

export default function Home() {
  useEffect(() => {
    const getCountriesList = async () => {
      await getCountries()
        .then((el) => Cookies.set("list", JSON.stringify(el as ICountry[])))
        .catch((el) => console.log(el));
    };
    getCountriesList();
  }, []);

  return (
    <main className="main__container">
      <Cover />
      <About />
      <Difference />
      <Advantage />
      {/* <Faq /> */}
      <Show />
      <Partners />
      <Footer />
    </main>
  );
  // <div className="loader">
  //   <Image
  //     className="bg"
  //     priority={true}
  //     loading="eager"
  //     width={500}
  //     height={500}
  //     quality={75}
  //     src="/gradientglobe.png"
  //     alt=""
  //   />
  //   <div className="content">
  //     <div className="logo">
  //       <Image src={"/home/logo.webp"} alt="" width={200} height={100} />
  //     </div>
  //     <p>Toujours prêt à vous servir</p>
  //   </div>
  // </div>
}
