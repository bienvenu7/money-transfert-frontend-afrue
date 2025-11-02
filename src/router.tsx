import Confirmation from '@/pages/Confirmation';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import SendPage from '@/pages/Send';
import { Route, Routes } from 'react-router-dom';

function AppRouter() {
  return (
    <Routes>
      <Route path='/auth/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/send' element={<SendPage />} />
      <Route path='/confirmation/:id' element={<Confirmation />} />
    </Routes>
  );
}

export default AppRouter;
