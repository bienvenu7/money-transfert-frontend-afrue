import { Metadata } from "next";
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

export const metadata: Metadata = {
  icons: {
    icon: "https://afrue.com/ico.png",
  },
  title: "Africa exchange",
  description: "AfruE, your platform to send money quickly over sanctions.",
  openGraph: {
    images: "https://afrue.com/ico.png",
    title: "Africa exchange",
    description: "AfruE, your platform to send money quickly over sanctions.",
  },
};

export default function Home() {
  return (
    <main className="main__container">
      <Cover />
      <About />
      <Difference />
      <Advantage />
      <Faq />
      <Show />
      <Partners />
      <Footer />
    </main>
  );
}
