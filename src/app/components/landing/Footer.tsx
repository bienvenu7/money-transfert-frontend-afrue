import React from "react";

type Props = {};

const contactData = [
  {
    title: "AfruE-Russie 🇷🇺",
    text: "+7 963 897-02-92",
  },
  {
    title: "AfruE-Senegal 🇸🇳",
    text: "+221 787194501",
  },
  {
    title: "AfruE-Congo 🇨🇬",
    text: "+242 06 831 8959 ",
  },
  {
    title: "AfruE-Cameroun 🇨🇲",
    text: "+237 6 83 42 26 80",
  },
];

const Footer = (props: Props) => {
  return (
    <footer className="main__footer">
      <img src="/footer.png" alt="" />
      <div className="main__footer--wrapper">
        <div className="main__footer__left">
          <div className="main__footer__left--links">
            <a href="/">à propos</a>
            <a href="/">Avantages</a>
            <a href="'">Transaction</a>
            <a href="'">FAQ</a>
          </div>
          <p>
            Mode de paiement flexible avec une possibilité de se rendre dans nos
            locaux
          </p>
          <img src="/logo.png" alt="" />
        </div>
        <div className="main__footer__right">
          <h2>Contacts</h2>
          <div className="main__footer__right--number">
            {contactData.map((el, index) => {
              return (
                <div className="group" key={index}>
                  <h3>{el.title}</h3>
                  <p>{el.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
