type Props = {
  line1: string;
  line2: string;
};

const Titles = ({ line1 }: Props) => {
  return (
    <div className='main__about--title'>
      <h2>{line1}</h2>
    </div>
  );
};

export default Titles;
