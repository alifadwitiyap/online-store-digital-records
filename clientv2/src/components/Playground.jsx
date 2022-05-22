import React from 'react';
import { FaChartBar } from 'react-icons/fa';
import Button from './Button';
import CardSelection from './CardSelection';
import Title from './Title';

function Playground() {
  return (
    <>
      <h1 className="bg-slate-800 text-yellow-200">Welcome to React Vite Micro App!</h1>
      <p className="test">Hard to get more minimal than this React app.</p>
      <Title>Hi Ini Judul</Title>
      <Button>Hello, world</Button>
      <CardSelection icon={<FaChartBar />} text="Keuntungan Bersih" path='/hehe' />
    </>
  );
}

export default Playground;
