import Convertisseur from '@/components/main/Convertisseur';

const QuizTwo = () => {
  return (
    <div className='transfertConvert__slides--first'>
      <img src='/grad.png' alt='' />
      <div className='transfertConvert__convert'>
        <Convertisseur />
      </div>
      <div className='btns'>
        <a href={'/send'}>Envoyer</a>
        <a href={'/receive'}>Recevoir</a>
      </div>
    </div>
  );
};

export default QuizTwo;
