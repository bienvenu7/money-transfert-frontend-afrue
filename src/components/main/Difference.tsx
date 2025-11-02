import Svgs from '@/components/Svgs';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const cardDatas = [
  {
    title: 'Это неопределённо',
    svg: <Svgs name='s-slash' />,
  },
  {
    title: 'Высокие комиссии',
    svg: <Svgs name='h-t-u' />,
  },
  {
    title: 'Это задерживается',
    svg: <Svgs name='timer-p' />,
  },
  {
    title: 'Отсутствует прозрачность по курсу обмена',
    svg: <Svgs name='percentage' />,
  },
  {
    title: 'Это стрессово',
    svg: <Svgs name='e-sad' />,
  },
  {
    title: 'Оплата наличными недоступна',
    svg: <Svgs name='w-empty-r' />,
  },
];

const cardDatas2 = [
  {
    title: 'Это безопасно',
    svg: <Svgs name='s-tick' />,
  },
  {
    title: 'Низкие комиссии',
    svg: <Svgs name='h-t-d' />,
  },
  {
    title: 'Это быстро (максимум 5 минут)',
    svg: <Svgs name='timer-s' />,
  },
  {
    title: 'Прозрачный и понятный курс',
    svg: <Svgs name='percentage' />,
  },
  {
    title: 'Без стресса',
    svg: <Svgs name='e-norm' />,
  },
  {
    title: 'Оплата наличными доступна',
    svg: <Svgs name='w-empty-t' />,
  },
];

const Difference = forwardRef<HTMLDivElement>(() => {
  return (
    <div className='main__difference'>
      <div className='main__difference--wrapper'>
        <div className='main__difference--card'>
          <img
            src='/cardG.png'
            alt=''
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          <div className='main__difference--card__heading'>
            <div className='main__difference--card__heading--criteria'>
              <span>Бесконечно</span>
              <span>Стресс</span>
              <span>Медленно</span>
            </div>
            <h2>Без нас</h2>
          </div>
          <div className='main__difference--card__content'>
            {cardDatas.map((el, i) => (
              <motion.div
                key={i}
                className='main__difference--card__content--line'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: [0.17, 0.67, 0.83, 0.67],
                }}
              >
                <button>{el.svg}</button>
                <span>{el.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className='main__difference--card'>
          <img
            src='/cardG.png'
            alt=''
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
            }}
          />
          <div className='main__difference--card__heading'>
            <div className='main__difference--card__heading--criteria'>
              <span>Надёжно</span>
              <span>Прозрачно</span>
              <span>Быстро</span>
            </div>
            <h2>С нами</h2>
          </div>
          <div className='main__difference--card__content'>
            {cardDatas2.map((el, i) => (
              <motion.div
                key={i}
                className='main__difference--card__content--line'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: [0.17, 0.67, 0.83, 0.67],
                }}
              >
                <button>{el.svg}</button>
                <span>{el.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

Difference.displayName = 'Difference';

export default Difference;
