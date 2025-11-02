import { AiOutlineRight } from 'react-icons/ai';

type Props = {
  title: string;
  text: string;
};

const CardPersonnel = ({ text, title }: Props) => {
  return (
    <div className='profile__personel--card'>
      <h3>{title}</h3>
      {text !== '' ? (
        <p>{text}</p>
      ) : (
        <button>
          <AiOutlineRight />
        </button>
      )}
    </div>
  );
};

export default CardPersonnel;
