"use client" 
import { useEffect, useState } from 'react';

export default function Analytics() {
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch('/api/analytics');
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAccounts(data.accounts);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchAccounts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl">Analytics</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {accounts.map(account => (
          <li key={account.name}>
            <h2>{account.displayName}</h2>
            <p>Region Code: {account.regionCode}</p>
            <p>Create Time: {new Date(account.createTime * 1000).toLocaleString()}</p>
            <p>Update Time: {new Date(account.updateTime * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
