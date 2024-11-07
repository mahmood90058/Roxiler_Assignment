import React, { useState } from 'react';
import TransactionsTable from '../src/Components/TransactionsTable.js';
import BarChart from '../src/Components/BarChart.js';
import PieChart from '../src/Components/PieChart.js';
import Statastics from '../src/Components/Statastics.js'; 

const App = () => {
  const [month, setMonth] = useState('March'); 

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center p-5 bg-pink-50 rounded-lg">Transaction Dashboard</h1>

      <div className="mb-4">
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select
  id="month"
  value={month}
  onChange={handleMonthChange}
  className="p-2 border border-gray-300 rounded"
>
  <option value="1">January</option>
  <option value="2">February</option>
  <option value="3">March</option>
  <option value="4">April</option>
  <option value="5">May</option>
  <option value="6">June</option>
  <option value="7">July</option>
  <option value="8">August</option>
  <option value="9">September</option>
  <option value="10">October</option>
  <option value="11">November</option>
  <option value="12">December</option>
</select>

      </div>

      <TransactionsTable month={month} />
      
      <Statastics month={month} />

      <div className="my-8">
        <BarChart month={month} />
      </div>

      <div className="my-8">
        <PieChart month={month} />
      </div>
    </div>
  );
};

export default App;
