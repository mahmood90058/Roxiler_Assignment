import React, { useState, useEffect } from 'react';
import { getTransactions } from '../Services/api.js';

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage] = useState(10);

  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await getTransactions(month, search, page, perPage);
      setTransactions(result.data);
      setTotal(result.total);
    };

    fetchTransactions();
  }, [month, search, page, perPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); 
  };

  const handlePagination = (direction) => {
    if (direction === 'next' && page * perPage < total) {
      setPage(page + 1);
    } else if (direction === 'prev' && page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Search by title, description, price"
          value={search}
          onChange={handleSearch}
          className="border p-2 mb-4 w-full rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <table className="w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Sold</th>
              <th className="py-2 px-4 text-left">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={transaction._id}
                className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                } hover:bg-blue-50`}
              >
                <td className="py-2 px-4">{transaction.title}</td>
                <td className="py-2 px-4">{transaction.description}</td>
                <td className="py-2 px-4">${transaction.price}</td>
                <td className="py-2 px-4">
                  {transaction.sold ? (
                    <span className="text-green-500 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </td>
                <td className="py-2 px-4">{transaction.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => handlePagination('prev')}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg ${
              page === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {Math.ceil(total / perPage)}
          </span>
          <button
            onClick={() => handlePagination('next')}
            disabled={page * perPage >= total}
            className={`px-4 py-2 rounded-lg ${
              page * perPage >= total
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
