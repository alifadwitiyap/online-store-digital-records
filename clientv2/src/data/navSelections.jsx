/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  FaBook,
  FaBox,
  FaClipboardCheck,
  FaDollarSign,
  FaScroll,
  FaUser,
} from 'react-icons/fa';

const data = [
  {
    code: 1,
    icon: <FaBook />,
    text: 'Input Barang Baru',
    path: '/input-barang-baru',
  },
  {
    code: 2,
    icon: <FaBook />,
    text: 'Input Barang Terjual',
    path: '/input-barang-jual',
  },
  {
    code: 3,
    icon: <FaScroll />,
    text: 'Input Biaya Operasional',
    path: '/input-biaya-operasional',
  },
  {
    code: 4,
    icon: <FaBox />,
    text: 'Laporan Sisa Stok Barang',
    path: '/laporan-sisa-stok',
  },
  {
    code: 5,
    icon: <FaClipboardCheck />,
    text: 'Laporan Penjualan Barang',
    path: '/laporan-penjualan',
  },
  {
    code: 6,
    icon: <FaDollarSign />,
    text: 'Laporan Keuntungan Penjualan',
    path: '/laporan-keuntungan',
  },
  {
    code: 7,
    icon: <FaUser />,
    text: 'Pengaturan Akun Pegawai',
    path: '/admin',
  },
];

const rolesData = {
  'admin': [7],
  'pegawai': [1, 2, 3, 4, 5],
  'owner': [1, 2, 3, 4, 5, 6],
  '': [],
};

const selections = {};
Object.keys(rolesData).forEach((role) => {
  selections[role] = data.filter(({ code }) => rolesData[role].includes(code));
});

export default selections;
