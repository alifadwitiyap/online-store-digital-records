import { useEffect, useState } from 'react';
import { FaChartBar } from 'react-icons/fa';
import { AiOutlineLineChart } from 'react-icons/ai';
import Title from '../components/Title';
import Sidebar from '../components/Sidebar';
import CardSelection from '../components/CardSelection';
import useAuth from '../utils/useAuth';
import BackToMenu from '../components/BackToMenu';
import LaporanKeuntunganKotor from './LaporanKeuntunganKotor';
import LaporanKeuntunganBersih from './LaporanKeuntunganBersih';

function LaporanKeuntungan() {
  const [auth, isAuthenticated] = useAuth();
  const [optionIsSelected, setOptionIsSelected] = useState(false);
  const [optionSelected, setOptionSelected] = useState(0);

  useEffect(() => {
    auth();
    if (!isAuthenticated) return;
  }, [auth, isAuthenticated]);

  const getTitleText = () => {
    let title = 'Laporan Keuntungan Penjualan';
    if (!optionIsSelected) return 'Laporan Keuntungan Penjualan';
    if (optionSelected === 1) return `${title} Kotor`;
    return `${title} Bersih`;
  }

  const showOptions = () => {
    if (optionIsSelected) return <></>;

    const select = (option) => {
      setOptionIsSelected(true);
      setOptionSelected(option);
    };

    return (
      <div className="flex gap-12">
        <CardSelection
          icon={<AiOutlineLineChart />}
          text="Keuntungan Kotor"
          onClickHandler={() => select(1)}
        />
        <CardSelection
          icon={<FaChartBar />}
          text="Keuntungan Bersih"
          onClickHandler={() => select(2)}
        />
      </div>
    );
  };

  const showLaporanKeuntunganPage = () => {
    if (!optionIsSelected) return <></>;
    return optionSelected === 1 ? (
      <LaporanKeuntunganKotor />
    ) : (
      <LaporanKeuntunganBersih />
    );
  };

  return (
    <>
      <Sidebar />
      <BackToMenu />
      <div className="flex flex-col items-center">
        <Title className="text-2xl text-black my-10">
          {getTitleText()}
        </Title>
        {showOptions()}
        {showLaporanKeuntunganPage()}
        <div className="w-4/5 lg:w-1/4 my-10"></div>
        <div className="w-4/6"></div>
      </div>
    </>
  );
}

export default LaporanKeuntungan;
