import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { getPieChartData } from '../Services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const result = await getPieChartData(month);
        setChartData(result || []);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieChartData();

    return () => {
      if (window.Chart) {
        window.Chart.instances.forEach((instance) => {
          if (instance.canvas.id === 'myChart') {
            instance.destroy();
          }
        });
      }
    };
  }, [month]);

  const data = chartData.length
    ? {
        labels: chartData.map((item) => item.category),
        datasets: [
          {
            data: chartData.map((item) => item.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      }
    : null;

  return (
    <div>
      {data ? (
        <Pie data={data} key={month} id="myChart" />
      ) : (
        <p>No data available for the selected month</p>
      )}
    </div>
  );
};

export default PieChart;
