import React from 'react';
import {
  FaBook,
  FaBox,
  FaClipboardCheck,
  FaDollarSign,
  FaScroll,
} from 'react-icons/fa';
import Title from '../components/Title';
import Help from '../components/Help';
import MenuSelection from '../components/MenuSelection';

function Home() {
  const selections = [
    {
      icon: <FaBook />,
      text: 'Input Barang Baru',
    },
    {
      icon: <FaBook />,
      text: 'Input Barang Terjual',
    },
    {
      icon: <FaScroll />,
      text: 'Input Biaya Operasional',
    },
    {
      icon: <FaBox />,
      text: 'Laporan Sisa Stok Barang',
    },
    {
      icon: <FaClipboardCheck />,
      text: 'Laporan Penjualan Barang',
    },
    {
      icon: <FaDollarSign />,
      text: 'Laporan Keuntungan Penjualan',
    },
  ];
  return (
    <>
      <Help />
      <div className="flex flex-col gap-5 justify-center items-center h-screen">
        <div className="w-4/5 lg:w-1/4 mb-6">
          <Title size="4xl">Selamat Datang di Digital Records</Title>
        </div>
        {selections.map(({ icon, text }) => (
          <MenuSelection key={text} icon={icon} text={text} />
        ))}
      </div>
    </>
  );
}

export default Home;
