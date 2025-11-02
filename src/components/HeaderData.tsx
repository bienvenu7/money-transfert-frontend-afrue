import type { IClientResponse } from '@/types/user';

type Props = {
  clientData: IClientResponse;
};

const HeaderData = ({ clientData }: Props) => {
  const name = clientData?.fullName?.split(' ')[0] as string;
  return (
    <>
      <div className='avatar'>
        <img
          src={`https://avatar.iran.liara.run/public/${
            clientData.gender === 'Femme' ? 'girl' : 'boy'
          }?username=${name}`}
          alt={clientData?.fullName}
        />
      </div>
      <p>{clientData.fullName}</p>
      <span>{clientData.email}</span>
    </>
  );
};

export default HeaderData;
