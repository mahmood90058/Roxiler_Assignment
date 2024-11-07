import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const getTransactions = async (month, search, page, perPage) => {
  try {
    const response = await axios.get(`${API_URL}/transactions`, {
      params: { month, search, page, perPage },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions', error);
    throw error;
  }
};


export const getStatistics = async (month) => {
  try {
    console.log(`Requesting URL: ${API_URL}/statistics?month=${month}`);

    const response = await axios.get(`${API_URL}/statistics?month=${month}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return { totalSales: 0, totalSoldItems: 0, totalNotSoldItems: 0 };
  }
};


export const getBarChartData = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/bar-chart?month=${month}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bar chart data', error);
    throw error;
  }
};

export const getPieChartData = async (month) => {
  try {
    const response = await axios.get(`${API_URL}/pie-chart?month=${month}`
   
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching pie chart data', error);
    throw error;
  }
};


