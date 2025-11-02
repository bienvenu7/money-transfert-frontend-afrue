import Titles from '@/components/Title';
import { forwardRef } from 'react';

const About = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className='main__about' id='about'>
      <div className='main__about--wrapper'>
        <Titles line1='О нас' line2='Afru-Exchange' />
        <div className='main__about--globe'>
          <img
            className='bg'
            loading='eager'
            width={100}
            height={100}
            src='/gradientglobe.png'
            alt=''
            style={{}}
          />
          <img
            className='globe'
            loading='eager'
            width={901}
            height={460}
            src='/globe.png'
            alt=''
            style={{}}
          />
          <div className='main__about--globe__content'>
            <p>
              {`Мы — микрофинансовая организация, основной деятельностью которой является перевод денег между Россией и странами Африки, а также между странами CEMAC и UEMOA. Наша миссия — облегчить финансовые операции между африканцами диаспоры и их семьями по прозрачному и выгодному курсу, с минимальной комиссией и ограничением количества посредников. Все эти преимущества дополняются возможностью совершения транзакции максимум за 5 минут.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

About.displayName = 'About';

export default About;
