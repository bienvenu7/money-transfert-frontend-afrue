"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Convertion from "./Convertion";

const headerData = [
  {
    id: 1,
    uri: "/home/pic1.webp",
  },
  {
    id: 2,
    uri: "/home/pic2.webp",
  },
  {
    id: 3,
    uri: "/home/pic3.webp",
  },
  {
    id: 4,
    uri: "/home/pic4.webp",
  },
];

const stats = [
  {
    id: 1,
    stats: "10+",
    text: "pays",
  },
  {
    id: 2,
    stats: "90 000+",
    text: "transactions",
  },
  {
    id: 3,
    stats: "6 000+",
    text: "clients",
  },
  {
    id: 4,
    stats: "100+",
    text: "itinéraires",
  },
  {
    id: 5,
    stats: "3+",
    text: "ans de service",
  },
];

type Props = {};

const Cover = (props: Props) => {
  const [people, setPeople] = useState(headerData);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  // autoslide, clearInterval = een cleanup functie noodzakelijk bij interval
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <div className="main__cover">
      <div className="main__cover--wrapper">
        <div className="main__cover--wrapper__slider">
          {headerData.map((person, personIndex) => {
            const { id, uri } = person;
            let position = "nextSlide";
            if (personIndex === index) {
              position = "activeSlide";
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === people.length - 1)
            ) {
              position = "lastSlide";
            }
            return (
              <div
                key={person.id}
                className={`main__cover--wrapper__slide ${position}`}
              >
                <Image
                  src={uri}
                  alt=""
                  fill
                  loading={personIndex === index ? "eager" : "lazy"}
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            );
          })}
          <div className="main__cover--wrapper__slider--dots">
            {headerData.map((el, i) => {
              return (
                <button
                  className={index === i ? "active" : ""}
                  onClick={() => setIndex(i)}
                  key={el.id}
                />
              );
            })}
          </div>
          <div className="main__cover--content">
            <div className="main__cover--content__heading">
              <h1>
                Transférer de l’argent en un clic{" "}
                <span>
                  <Image
                    src={"/gradient.png"}
                    alt=""
                    width={100}
                    height={30}
                    loading="lazy"
                  />
                </span>{" "}
                depuis le confort de votre salon
              </h1>
              <p>
                Mode de paiement flexible avec une possibilité de se rendre dans
                nos locaux
              </p>
            </div>
            <div className="main__cover--content__stats">
              {stats.map((stat) => {
                return (
                  <div key={stat.id} className="box">
                    <h2>{stat.stats}</h2>
                    <span>{stat.text}</span>
                  </div>
                );
              })}
            </div>
            <Convertion />
          </div>
        </div>
        <div className="main__cover--mobile">
          <Image
            priority={true}
            loading="eager"
            quality={75}
            src="/footer.png"
            alt=""
            width={100}
            height={100}
          />
          <div className="main__cover--mobile__content">
            <h1>
              {`Transférer de l’argent en un clic`}
              <span>
                {`     `}
                <Image src="/gradient.png" alt="" width={100} height={100} />
              </span>
              depuis le confort de votre salon
            </h1>
            <p>
              Mode de paiement flexible avec une possibilité de se rendre dans
              nos locaux
            </p>
            <Image src="/coin.png" alt="" width={100} height={100} />
          </div>
          <div className="main__cover--content__stats">
            {stats.map((stat) => {
              return (
                <div key={stat.id} className="box">
                  <h2>{stat.stats}</h2>
                  <span>{stat.text}</span>
                </div>
              );
            })}
          </div>
          <Convertion />
        </div>
      </div>
    </div>
  );
};

export default Cover;
