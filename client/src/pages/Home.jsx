import React from 'react';
import Title from '../components/Title';
import Help from '../components/Help';
import MenuSelection from '../components/MenuSelection';
import Sidebar from '../components/Sidebar';
import navSelections from '../data/navSelections';

function Home() {
  return (
    <>
      <Help />
      <Sidebar />
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <div className="w-4/5 lg:w-1/4 mb-6">
          <Title size="4xl">Selamat Datang di Digital Records</Title>
        </div>
        {navSelections.map(({ icon, text }) => (
          <MenuSelection key={text} icon={icon} text={text} />
        ))}
      </div>
    </>
  );
}

export default Home;
