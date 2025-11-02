import React from 'react';

const QuizOne = () => {
  const handleSend = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  const handleReceive = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <div className='transfert__slides--question'>
      <img
        src='/grad.png'
        alt=''
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        loading='eager'
        // priority and quality are not standard <img> props, so omitted
      />
      <h2>
        {`Veillez s'il plait choisir le type de transaction que vous voulez
        éffectuer :`}
      </h2>
      <div className='transfert__slides--question__btns'>
        <div className='transfert__types'>
          <div className={'transfert__types--wrapper'}>
            <button onClick={handleSend}>Envoyer</button>
            <button onClick={handleReceive}>Recevoir</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizOne;
