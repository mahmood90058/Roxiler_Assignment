import React, { useState, useEffect } from 'react';
import { getStatistics } from '../Services/api.js'; 

const Statastics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      const data = await getStatistics(month); 
      setStatistics(data); 
    };
    fetchStatistics();
  }, [month]);

  return (
    <div className="mb-7 flex items-center justify-center">
      <div className="bg-gray-100 p-7 rounded">
        <h3 className="font-semibold mb-2 text-blue-600 text-[30px]">Statistics Transection</h3>
        <div className=' font-bold text-[20px] '>Total Sales:<span className='text-rose-600'> ${statistics.totalSales.toFixed(2)}</span></div>
        <div className='font-bold text-[20px]'>Total Sold Items: <span className='text-rose-600'>{statistics.totalSoldItems}</span> </div>
        <div className=' font-bold text-[20px]'>Total Not Sold Items: <span className='text-red-700 font-bold'>{statistics.totalNotSoldItems}</span></div>
      </div>
    </div>
  );
};

export default Statastics;
