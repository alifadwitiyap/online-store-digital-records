import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Title from '../components/Title';
import Help from '../components/Help';
import MenuSelection from '../components/MenuSelection';
import Sidebar from '../components/Sidebar';
import navSelections from '../data/navSelections';
import useAuth from '../utils/useAuth';

function Home() {
  const [auth, isAuthenticated] = useAuth();
  const { role } = useSelector((state) => state.user);

  useEffect(() => {
    auth();
    if (!isAuthenticated) return;

    console.log('masuk');
  }, [auth, isAuthenticated]);

  return (
    <>
      <Help />
      <Sidebar />
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <div className="w-4/5 lg:w-1/4 mb-6">
          <Title className="text-4xl text-black">Selamat Datang di Digital Records</Title>
        </div>
        {navSelections[role].map(({ icon, text, path }) => (
          <MenuSelection key={text} icon={icon} text={text} path={path} />
        ))}
      </div>
    </>
  );
}

export default Home;
