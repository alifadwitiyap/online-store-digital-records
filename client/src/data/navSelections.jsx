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
    path: '/input-barang-baru',
  },
  {
    icon: <FaBook />,
    text: 'Input Barang Terjual',
    path: '/input-barang-jual',
  },
  {
    icon: <FaScroll />,
    text: 'Input Biaya Operasional',
    path: '/input-biaya-operasional',
  },
  {
    icon: <FaBox />,
    text: 'Laporan Sisa Stok Barang',
    path: '/laporan-sisa-stok',
  },
  {
    icon: <FaClipboardCheck />,
    text: 'Laporan Penjualan Barang',
    path: '/laporan-penjualan',
  },
  {
    icon: <FaDollarSign />,
    text: 'Laporan Keuntungan Penjualan',
    path: '/laporan-keuntungan',
  },
];

export default selections;
