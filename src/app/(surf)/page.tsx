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
import { motion, Variants } from "framer-motion";
import { TfiComment } from "react-icons/tfi";

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

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Configuration du viewport avec typage
const viewportConfig: {
  once: boolean;
  margin?: string;
  amount?: "some" | "all" | number;
} = {
  once: true,
  margin: "-100px",
};

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
      {/* help button */}
      <button className="help__button">
        <TfiComment />
      </button>
      <Cover />
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={sectionVariants}
      >
        <About />
      </motion.section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={sectionVariants}
      >
        <Difference />
      </motion.section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={sectionVariants}
      >
        <Advantage />
      </motion.section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={sectionVariants}
      >
        <Show />
      </motion.section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={sectionVariants}
      >
        <Partners />
      </motion.section>
      {/* <Faq /> */}

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
