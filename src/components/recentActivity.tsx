import React, { useState, ChangeEvent } from 'react';
import { Search } from 'lucide-react';

// Define types for the transaction data
interface Transaction {
  id: number;
  amount: number;
  payer: string;
  date: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

// Define props interface
interface RecentActivityProps {
  initialData?: Transaction[];
  currency?: string;
}

// Define type for sort configuration
interface SortConfig {
  key: keyof Transaction;
  direction: 'asc' | 'desc';
}

// Define type for status styles mapping
type StatusStyles = {
  [key in Transaction['status']]: string;
};

const RecentActivity: React.FC<RecentActivityProps> = ({ 
  initialData = [], 
  currency = 'USD' 
}) => {
  // Sample data if no initial data provided
  const defaultTransactions: Transaction[] = [
    {
      id: 1,
      amount: 500,
      payer: "John Doe",
      date: "2025-02-08",
      time: "14:30",
      status: "completed",
    },
    {
      id: 2,
      amount: 750,
      payer: "Jane Smith",
      date: "2025-02-07",
      time: "09:15",
      status: "pending",
    },
    {
      id: 3,
      amount: 1000,
      payer: "Bob Johnson",
      date: "2025-02-06",
      time: "16:45",
      status: "completed",
    },
  ];

  const initialTransactions = initialData.length > 0 ? initialData : defaultTransactions;

  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "date", direction: "desc" });

  // Search functionality
  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = initialTransactions.filter(transaction => 
      transaction.payer.toLowerCase().includes(term) ||
      transaction.amount.toString().includes(term) ||
      transaction.date.includes(term)
    );
    
    setTransactions(filtered);
  };

  // Sorting functionality
  const handleSort = (key: keyof Transaction): void => {
    const direction = 
      sortConfig.key === key && sortConfig.direction === "asc" 
        ? "desc" 
        : "asc";
    
    setSortConfig({ key, direction });
    
    const sorted = [...transactions].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    
    setTransactions(sorted);
  };

  // Status badge styling
  const statusStyles: StatusStyles = {
    completed: "bg-green-500",
    pending: "bg-yellow-500",
    failed: "bg-red-500"
  };

  const getStatusBadge = (status: Transaction['status']): JSX.Element => {
    return (
      <span className={`${statusStyles[status]} text-white px-2 py-1 rounded-full text-sm`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            onChange={(e) => handleSort(e.target.value as keyof Transaction)}
            defaultValue="date"
            className="w-[180px] border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="payer">Sort by Payer</option>
          </select>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Payer
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{transaction.date}</div>
                    <div className="text-sm text-gray-500">{transaction.time}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {transaction.payer}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(transaction.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;