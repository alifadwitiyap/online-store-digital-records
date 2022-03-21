import React from 'react';
import { FaBook, FaChartBar } from 'react-icons/fa';
import Button from './components/Button';
import CardSelection from './components/CardSelection';
import MenuSelection from './components/MenuSelection';
import Title from './components/Title';
import './index.css';

function App() {
  return (
    <>
      <h1 className="bg-slate-800 text-yellow-200">Welcome to React Vite Micro App!</h1>
      <p className="test">Hard to get more minimal than this React app.</p>
      <Title>Hi Ini Judul</Title>
      <Button>Hello, world</Button>
      <MenuSelection icon={<FaBook />} text="Input Barang Baru" />
      <CardSelection icon={<FaChartBar />} text="Keuntungan Bersih" />
    </>
  );
}

export default App;
