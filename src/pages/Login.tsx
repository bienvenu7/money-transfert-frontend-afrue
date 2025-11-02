import Form from '@/components/auth/Form';
import MainLayout from '@/components/layouts/MainLayout';

const Login = () => {
  return (
    <MainLayout>
      <div className='auth__container'>
        <div className='auth__wrapper'>
          {/* <div className='auth__logo'>
          <img
            src='/logo.png'
            alt=''
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div> */}
          <Form pageName='Se connecter' />
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
