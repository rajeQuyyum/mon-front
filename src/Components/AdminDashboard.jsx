import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminCards from "./AdminCards";
import AdminChat from "./AdminChat";
import AdminNotifications from "./AdminNotifications";
import AdminUserImages from "./AdminUserImages";
import AdminIdCardManager from "./AdminIdCardManager";
import AdminBankDetailsManager from "./AdminBankDetailsManager";
import AdminLoans from "./AdminLoans";
import AdminSavingsManager from "./AdminSavingsManager";
import AdminFixedDepositManager from "./AdminFixedDepositManager";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState({});
  const [editingTransaction, setEditingTransaction] = useState({});
  const [editingBalance, setEditingBalance] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [newTransaction, setNewTransaction] = useState({});

  if (!admin) {
    navigate("/admin/login");
    return null;
  }

  useEffect(() => { fetchUsers(); }, []);

 const API = import.meta.env.VITE_API || 'http://localhost:8000';

  const fetchUsers = () => {
    axios.get(`${API}/admin/users`)
      .then(res => setUsers(res.data))
      .catch(console.log);
  };

  const fetchTransactions = (userId) => {
    axios.get(`${API}/user/${userId}/transactions`)
      .then(res => setTransactions(prev => ({ ...prev, [userId]: res.data })))
      .catch(console.log);
  };

  const updateBalance = (userId) => {
    const balance = parseFloat(editingBalance[userId]);
    axios.put(`${API}/admin/user/${userId}/balance`, { balance })
      .then(res => setUsers(users.map(u => u._id === userId ? res.data : u)))
      .catch(console.log);
  };

  const updateTransaction = (userId, txId) => {
    const tx = editingTransaction[txId];
    axios.put(`${API}/admin/transaction/${txId}`, tx)
      .then(res => {
        const updatedTx = res.data;
        setTransactions(prev => ({
          ...prev,
          [userId]: prev[userId].map(t => t._id === txId ? updatedTx : t)
        }));
        setEditingTransaction(prev => ({ ...prev, [txId]: {} }));
        fetchUsers(); // refresh user balance live
      })
      .catch(console.log);
  };

  const createTransaction = (userId) => {
    const tx = newTransaction[userId];
    const type = tx?.type || "credit";
    const amount = parseFloat(tx?.amount);

    if (!type || isNaN(amount)) {
      alert("Please fill in type and amount");
      return;
    }

    axios.post(`${API}/admin/user/${userId}/transaction`, {
      type,
      amount,
      description: tx?.description || "",
      recipientName: tx?.recipientName || "",
      counterpartyAccount: tx?.counterpartyAccount || "",
    })
      .then(res => {
        setTransactions(prev => ({
          ...prev,
          [userId]: [res.data, ...(prev[userId] || [])]
        }));
        setNewTransaction(prev => ({ ...prev, [userId]: {} }));
        fetchUsers(); // refresh balance immediately
      })
      .catch(console.log);
  };

  const deleteUser = (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    axios.delete(`${API}/admin/user/${userId}`)
      .then(() => setUsers(users.filter(u => u._id !== userId)))
      .catch(console.log);
  };

  const deleteAllUsers = () => {
    if (!window.confirm("Are you sure you want to delete ALL users?")) return;
    axios.delete(`${API}/admin/users`)
      .then(() => setUsers([]))
      .catch(console.log);
  };

  const deleteSelectedUsers = () => {
    if (!window.confirm("Are you sure you want to delete selected users?")) return;
    axios.post(`${API}/admin/users/delete-multiple`, { ids: selectedUsers })
      .then(() => {
        setUsers(users.filter(u => !selectedUsers.includes(u._id)));
        setSelectedUsers([]);
      })
      .catch(console.log);
  };

  const toggleSelectUser = (userId) => {
    setSelectedUsers(prev => prev.includes(userId)
      ? prev.filter(id => id !== userId)
      : [...prev, userId]
    );
  };

  const deleteTransaction = (userId, txId) => {
  if (!window.confirm("Are you sure you want to delete this transaction?")) return;

  axios
    .delete(`${API}/admin/transaction/${txId}`)
    .then(() => {
      setTransactions(prev => ({
        ...prev,
        [userId]: prev[userId].filter(tx => tx._id !== txId),
      }));
      fetchUsers(); // refresh balance after delete
    })
    .catch(console.log);
};


const blockUser = (userId) => {
  if (!window.confirm("Block this user? They will NOT be able to log in.")) return;

  axios
    .put(`${API}/admin/user/${userId}/block`)
    .then(() => {
      setUsers(users.map(u =>
        u._id === userId ? { ...u, isBlocked: true } : u
      ));
    })
    .catch(console.log);
};

const unblockUser = (userId) => {
  if (!window.confirm("Unblock this user? They can log in again.")) return;

  axios
    .put(`${API}/admin/user/${userId}/unblock`)
    .then(() => {
      setUsers(users.map(u =>
        u._id === userId ? { ...u, isBlocked: false } : u
      ));
    })
    .catch(console.log);
};



  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between flex-wrap">
        <h1 className="text-lg sm:text-xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => { localStorage.removeItem("admin"); navigate("/admin/login"); }}
          className="mt-2 sm:mt-0 bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 flex-wrap gap-2">
          <h2 className="text-xl font-bold">Users</h2>
          <div className="flex gap-2 flex-wrap">
            <button onClick={deleteSelectedUsers} className="bg-red-500 text-white px-3 py-1 rounded">Delete Selected</button>
            <button onClick={deleteAllUsers} className="bg-red-600 text-white px-3 py-1 rounded">Delete All Users</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user._id} className="bg-white p-4 shadow rounded flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <input type="checkbox" checked={selectedUsers.includes(user._id)} onChange={() => toggleSelectUser(user._id)} />
                <p className="font-bold">👤 {user.name}</p>
              </div>
              <p>✉️ {user.email}</p>
             <p>💰 Balance: {user.isFrozen ? "" : `$${user.balance}`}</p>
             <p
  className={`font-semibold ${
    user.isBlocked
      ? "text-red-600"
      : user.isFrozen
      ? "text-red-600"
      : "text-green-600"
  }`}
>
  Status: {user.isBlocked ? "Blocked" : user.isFrozen ? "Frozen" : "Active"}
</p>

              <input
                type="number"
                value={editingBalance[user._id] ?? user.balance}
                onChange={e => setEditingBalance({...editingBalance, [user._id]: e.target.value})}
                className="border p-1 mt-1 w-full"
              />
              <button
  onClick={() => updateBalance(user._id)}
  className="bg-green-500 text-white px-2 py-1 mt-1 w-full"
>
  Update Balance
</button>

{/* 🚫 BLOCK / UNBLOCK USER */}
{user.isBlocked ? (
  <button
    onClick={() => unblockUser(user._id)}
    className="bg-yellow-500 text-white px-2 py-1 mt-1 w-full"
  >
    🔓 Unblock User
  </button>
) : (
  <button
    onClick={() => blockUser(user._id)}
    className="bg-gray-800 text-white px-2 py-1 mt-1 w-full"
  >
    🚫 Block User
  </button>
)}


{user.isFrozen ? (
  <button
    onClick={() => axios.put(`${API}/admin/user/${user._id}/unfreeze`).then(fetchUsers)}
    className="bg-blue-600 text-white px-2 py-1 mt-1 w-full"
  >
    🧊 Unfreeze Account
  </button>
) : (
  <button
    onClick={() => axios.put(`${API}/admin/user/${user._id}/freeze`).then(fetchUsers)}
    className="bg-gray-900 text-white px-2 py-1 mt-1 w-full"
  >
    🥶 Freeze Account
  </button>
)}


              <button onClick={() => deleteUser(user._id)} className="bg-red-500 text-white px-2 py-1 mt-1 w-full">Delete User</button>

              <hr className="my-2"/>
              <button onClick={() => fetchTransactions(user._id)} className="text-blue-600 underline mb-1">View Transactions</button>

              <div className="border p-2 mt-2 rounded bg-gray-100">
                <h3 className="font-semibold mb-1 text-gray-700">Add Transaction</h3>
                <input
                  className="border w-full mb-1"
                  placeholder="Recipient Name"
                  value={newTransaction[user._id]?.recipientName || ""}
                  onChange={e => setNewTransaction({
                    ...newTransaction,
                    [user._id]: { ...newTransaction[user._id], recipientName: e.target.value }
                  })}
                />
                <input
                  className="border w-full mb-1"
                  placeholder="Recipient Account"
                  value={newTransaction[user._id]?.counterpartyAccount || ""}
                  onChange={e => setNewTransaction({
                    ...newTransaction,
                    [user._id]: { ...newTransaction[user._id], counterpartyAccount: e.target.value }
                  })}
                />
                <input
                  className="border w-full mb-1"
                  placeholder="Description"
                  value={newTransaction[user._id]?.description || ""}
                  onChange={e => setNewTransaction({
                    ...newTransaction,
                    [user._id]: { ...newTransaction[user._id], description: e.target.value }
                  })}
                />
                <input
                  type="number"
                  className="border w-full mb-1"
                  placeholder="Amount"
                  value={newTransaction[user._id]?.amount || ""}
                  onChange={e => setNewTransaction({
                    ...newTransaction,
                    [user._id]: { ...newTransaction[user._id], amount: parseFloat(e.target.value) }
                  })}
                />
                <select
                  className="border w-full mb-1"
                  value={newTransaction[user._id]?.type || "credit"}
                  onChange={e => setNewTransaction({
                    ...newTransaction,
                    [user._id]: { ...newTransaction[user._id], type: e.target.value }
                  })}
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
                <button
                  onClick={() => createTransaction(user._id)}
                  className="bg-blue-500 text-white px-2 py-1 w-full"
                >
                  Add Transaction
                </button>
              </div>

              {(transactions[user._id] || []).map(tx => (
                <div key={tx._id} className="border p-2 mb-2 mt-2 rounded bg-gray-100 flex flex-col">
                  <input
                    className="border w-full mb-1"
                    value={editingTransaction[tx._id]?.recipientName ?? tx.recipientName}
                    onChange={e => setEditingTransaction({
                      ...editingTransaction,
                      [tx._id]: {...editingTransaction[tx._id], recipientName: e.target.value}
                    })}
                    placeholder="Recipient Name"
                  />
                  <input
                    className="border w-full mb-1"
                    value={editingTransaction[tx._id]?.counterpartyAccount ?? tx.counterpartyAccount}
                    onChange={e => setEditingTransaction({
                      ...editingTransaction,
                      [tx._id]: {...editingTransaction[tx._id], counterpartyAccount: e.target.value}
                    })}
                    placeholder="Recipient Account"
                  />
                  <input
                    className="border w-full mb-1"
                    value={editingTransaction[tx._id]?.description ?? tx.description}
                    onChange={e => setEditingTransaction({
                      ...editingTransaction,
                      [tx._id]: {...editingTransaction[tx._id], description: e.target.value}
                    })}
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    className="border w-full mb-1"
                    value={editingTransaction[tx._id]?.amount ?? tx.amount}
                    onChange={e => setEditingTransaction({
                      ...editingTransaction,
                      [tx._id]: {...editingTransaction[tx._id], amount: parseFloat(e.target.value)}
                    })}
                  />
                  <select
                    className="border w-full mb-1"
                    value={editingTransaction[tx._id]?.type ?? tx.type}
                    onChange={e => setEditingTransaction({
                      ...editingTransaction,
                      [tx._id]: {...editingTransaction[tx._id], type: e.target.value}
                    })}
                  >
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>

                    
                  </select>
                  <input
  type="datetime-local"
  className="border w-full mb-1"
  value={
    editingTransaction[tx._id]?.date
      ?? new Date(tx.date).toISOString().slice(0, 16)
  }
  onChange={e =>
    setEditingTransaction({
      ...editingTransaction,
      [tx._id]: {
        ...editingTransaction[tx._id],
        date: e.target.value,
      },
    })
  }
/>
                  <button
                    onClick={() => updateTransaction(user._id, tx._id)}
                    className="bg-purple-500 text-white px-2 py-1 w-full"
                  >
                    Update Transaction
                  </button>
                  <button
            onClick={() => deleteTransaction(user._id, tx._id)}
           className="bg-red-600 text-white px-2 py-1 w-full mt-1"
           >
          Delete Transaction
         </button>

                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-col gap-4">
          <AdminCards />
          <AdminChat />
          <AdminNotifications />
          <AdminUserImages />
          <AdminIdCardManager />
          <AdminBankDetailsManager />
          <AdminLoans />
          <AdminSavingsManager />
          <AdminFixedDepositManager />
        </div>
      </main>
    </div>
  );
}
