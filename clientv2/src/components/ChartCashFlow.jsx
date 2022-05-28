// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

function ChartCashFlow({ data }) {
  const labels = Array.from({length: data.cnt}, (_, i) => i + 1);
  const dataChart = {
    labels,
    datasets: [
      {
          label: 'Cash In',
          data: data.cashIn,
          backgroundColor: '#4AD861',
          borderWidth: 0
      },
      {
          label: 'Cash Out',
          data: data.cashOut,
          backgroundColor: '#D84A4A',
          borderWidth: 0
      },
    ]
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Cash Flow'
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  };

  return (
    <Chart type='bar' data={dataChart} options={options} />
  );
}

export default ChartCashFlow;
