import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getBarChartData } from '../Services/api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBarChartData(month);
  
        if (data && data.length) {
          const priceRanges = data.map((item) => item.range);
          const itemCounts = data.map((item) => item.count);
  
          setChartData({
            labels: priceRanges,
            datasets: [
              {
                label: 'Number of Items',
                data: itemCounts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setChartData(null);
        }
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };
  
    fetchData();
  }, [month]);
  
  if (!chartData) return <p>Loading chart data...</p>;

  return (
    <div>
      <h2>Transactions Bar Chart for {month}</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                precision: 0,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
