import Titles from '@/components/Title';
import { forwardRef } from 'react';

const dataPartners = [
  {
    name: 'tinkoff bank',
    uri: '/partners/tbank.png',
  },
  {
    name: 'sber bank',
    uri: '/partners/sber.png',
  },
  {
    name: 'alfa bank',
    uri: '/partners/alfa.png',
  },
  {
    name: 'quick send russia',
    uri: '/partners/bistri.png',
  },
  {
    name: 'domru bank',
    uri: '/partners/domru.png',
  },
  {
    name: 'gazprom bank',
    uri: '/partners/gazprom.png',
  },
  {
    name: 'mtc bank',
    uri: '/partners/mtc.png',
  },
  {
    name: 'wave money',
    uri: '/partners/wave.png',
  },
  {
    name: 'orange money',
    uri: '/partners/orange.png',
  },
  {
    name: 'airtel money',
    uri: '/partners/airtel.png',
  },
  {
    name: 'mtn money',
    uri: '/partners/mtn.png',
  },
];

const Partners = forwardRef<HTMLDivElement>(() => {
  return (
    <div className='main__partners'>
      <div className='main__partners--wrapper'>
        <Titles
          line1='Partenaires et modes de paiement'
          line2='Afru-Exchange '
        />
      </div>
      {/* Infinity scroll animation for partners */}
      <div
        className='main__partners--pics'
        style={{ overflow: 'hidden', width: '100%' }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'partners-infinite-scroll 30s linear infinite',
          }}
        >
          {[...dataPartners, ...dataPartners].map((el, index) => (
            <img
              className={
                index % dataPartners.length === 7
                  ? 'wave'
                  : index % dataPartners.length === 8
                    ? 'orange'
                    : index % dataPartners.length === 9
                      ? 'airtel'
                      : index % dataPartners.length === 10
                        ? 'mtn'
                        : ''
              }
              src={el.uri}
              alt={el.name}
              key={index}
              style={{
                marginRight: 40,
                height: 60,
                width: 'auto',
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
        <style>
          {`
            @keyframes partners-infinite-scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .main__partners--pics > div {
              will-change: transform;
            }
          `}
        </style>
      </div>
    </div>
  );
});

Partners.displayName = 'Partners';

export default Partners;
