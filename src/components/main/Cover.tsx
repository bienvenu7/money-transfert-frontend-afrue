import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const headerData = [
  {
    id: 1,
    uri: '/home/pic1.webp',
  },
  {
    id: 2,
    uri: '/home/pic2.webp',
  },
  {
    id: 3,
    uri: '/home/pic3.webp',
  },
  {
    id: 4,
    uri: '/home/pic4.webp',
  },
];

const Cover = () => {
  const [people] = useState(headerData);
  const [index, setIndex] = useState(0);

  const { t } = useTranslation();

  const getStats = () => [
    {
      id: 1,
      stats: '10+',
      text: t('hero.stats.countries'),
    },
    {
      id: 2,
      stats: '90 000+',
      text: t('hero.stats.transactions'),
    },
    {
      id: 3,
      stats: '6 000+',
      text: t('hero.stats.clients'),
    },
    {
      id: 4,
      stats: '100+',
      text: t('hero.stats.routes'),
    },
    {
      id: 5,
      stats: '3+',
      text: t('hero.stats.years'),
    },
  ];

  const stats = getStats();

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
    const slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <div className='main__cover'>
      <div className='main__cover--wrapper'>
        <div className='main__cover--wrapper__slider'>
          {headerData.map((person, personIndex) => {
            const { uri } = person;
            let position = 'nextSlide';
            if (personIndex === index) {
              position = 'activeSlide';
            }
            if (
              personIndex === index - 1 ||
              (index === 0 && personIndex === people.length - 1)
            ) {
              position = 'lastSlide';
            }
            // swap out <Image /> for native <img />
            return (
              <div
                key={person.id}
                className={`main__cover--wrapper__slide ${position}`}
              >
                <img
                  src={uri}
                  alt=''
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  loading={personIndex === index ? 'eager' : 'lazy'}
                  // extra attributes like sizes/quality ignored for <img>
                />
              </div>
            );
          })}
          <div className='main__cover--wrapper__slider--dots'>
            {headerData.map((el, i) => {
              return (
                <button
                  className={index === i ? 'active' : ''}
                  onClick={() => setIndex(i)}
                  key={el.id}
                />
              );
            })}
          </div>
          <div className='main__cover--content'>
            <div className='main__cover--content__heading'>
              <h1>
                Переводите деньги в один клик{' '}
                <span>
                  <img
                    src={'/gradient.png'}
                    alt=''
                    width={100}
                    height={30}
                    loading='lazy'
                    style={{ verticalAlign: 'middle' }}
                  />
                </span>{' '}
                не выходя из дома
              </h1>
              <p>Гибкий способ оплаты с возможностью посетить наш офис</p>
            </div>
            <div className='main__cover--content__stats'>
              {stats.map(stat => {
                return (
                  <div key={stat.id} className='box'>
                    <h2>{stat.stats}</h2>
                    <span>{stat.text}</span>
                  </div>
                );
              })}
            </div>
            {/* <Convertion /> */}
          </div>
        </div>
        <div className='main__cover--mobile'>
          <img
            src='/footer.png'
            alt=''
            width={100}
            height={100}
            loading='eager'
            style={{ objectFit: 'cover' }}
          />
          <div className='main__cover--mobile__content'>
            <h1>
              {`Переводите деньги в один клик`}
              <span>
                {`     `}
                <img
                  src='/gradient.png'
                  alt=''
                  width={100}
                  height={100}
                  style={{ verticalAlign: 'middle' }}
                />
              </span>
              не выходя из дома
            </h1>
            <p>Гибкий способ оплаты с возможностью посетить наш офис</p>
            <img
              src='/coin.png'
              alt=''
              width={100}
              height={100}
              style={{ verticalAlign: 'middle' }}
            />
          </div>
          <div className='main__cover--content__stats'>
            {stats.map(stat => {
              return (
                <div key={stat.id} className='box'>
                  <h2>{stat.stats}</h2>
                  <span>{stat.text}</span>
                </div>
              );
            })}
          </div>
          {/* <Convertion /> */}
        </div>
      </div>
    </div>
  );
};

export default Cover;
