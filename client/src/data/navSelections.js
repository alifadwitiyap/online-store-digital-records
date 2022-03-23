/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  FaBook,
  FaBox,
  FaClipboardCheck,
  FaDollarSign,
  FaScroll,
} from 'react-icons/fa';

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

export default selections;
