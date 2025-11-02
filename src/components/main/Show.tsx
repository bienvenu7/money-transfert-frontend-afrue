import { forwardRef } from 'react';

// type Props = {};

const Show = forwardRef<HTMLDivElement>(() => {
  return (
    <div className='main__show'>
      <h2>Переводы успешно завершены</h2>
      <div className='main__show--box'>
        <img
          src='/show.png'
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
        <img
          className='phone'
          src='/bg-t.png'
          alt=''
          width={200}
          height={200}
          style={{ position: 'relative', zIndex: 1 }}
        />
      </div>
    </div>
  );
});

Show.displayName = 'Show';

export default Show;
