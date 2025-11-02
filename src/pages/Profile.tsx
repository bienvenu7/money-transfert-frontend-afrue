import MainLayout from '@/components/layouts/MainLayout';
import Personal from '@/components/profile/Personal';
import Titles from '@/components/Title';
import { useGetCountries } from '@/hooks/useCountry';
import { Auth } from '@/providers/AuthContext';
import type { ICountry } from '@/types/country';

const Profile = () => {
  const { state } = Auth();
  const { countries } = useGetCountries('profile');
  return (
    <MainLayout>
      <div className='profile__container'>
        <div className='profile__box'>
          <Titles line1='Votre profile' line2='Afru-Exchange' />
          <div className='profile__wrapper'>
            <div className='profile__content'>
              <img
                src={`https://avatar.iran.liara.run/public/${
                  state.user?.gender === 'Femme' ? 'girl' : 'boy'
                }?username=${state.user?.fullName}`}
                alt=''
              />
              <div className='profile__data'>
                <Personal
                  type='Information personnelle'
                  clientData={state.user}
                  countries={countries as ICountry[]}
                />
                <Personal
                  type='Sécurité'
                  clientData={null}
                  countries={countries as ICountry[]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
