import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function PayBills() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [billName, setBillName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(user?.balance ?? 0);

   const API = import.meta.env.VITE_API || 'http://localhost:8000'

  // Fetch transactions and balance
  const fetchTransactions = () => {
    if (!user?.id) return;
    axios.get(`${API}/user/${user.id}/transactions`)
      .then(res => setTransactions(res.data))
      .catch(console.log);
  };

  const fetchBalance = () => {
    if (!user?.id) return;
    axios.get(`${API}/user/${user.id}/balance`)
      .then(res => setBalance(res.data.balance))
      .catch(console.log);
  };

  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  }, []);

  // Generate printable receipt
  const generateReceipt = (tx) => {
    const html = `
      <div style="padding:20px; font-family: Arial;">
        <h2>Bill Payment Receipt</h2>
        <p><strong>User:</strong> ${user?.name}</p>
        <p><strong>Bill:</strong> ${tx.description}</p>
        <p><strong>Amount Paid:</strong> $${tx.amount}</p>
        <p><strong>Date:</strong> ${new Date(tx.date).toLocaleString()}</p>
      </div>
    `;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.print();
  };

  // Handle bill payment
  const handlePayBill = () => {
    if (user?.isFrozen) return alert("Account is frozen. Contact customer care.");
    if (!billName || !amount) return alert("Bill name and amount are required");
    const amt = parseFloat(amount);
    if (amt > balance) return alert("Insufficient balance");

    axios.post(`${API}/admin/user/${user.id}/transaction`, {
      type: "debit",
      amount: amt,
      counterpartyAccount: "BILL_PAYMENT",
      recipientName: billName,
      description: billName
    })
    .then(res => {
      setTransactions(prev => [res.data, ...prev]);
      setBalance(prev => prev - amt);
      setBillName("");
      setAmount("");
      setDescription("");
      generateReceipt(res.data);
    })
    .catch(console.log);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="p-4 sm:p-6 md:p-10 w-full max-w-4xl mx-auto">
        <h1 className="text-base sm:text-lg md:text-xl mb-6 text-justify text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, magnam? Aut numquam unde facilis fugit! Tenetur fugiat, reprehenderit repellat ad illo iusto explicabo aliquam ut maiores sequi...
        </h1>

        <div className="p-6 max-w-full bg-gray-500 text-black rounded shadow my-10">
          <h2 className="text-xl mb-3 font-bold">Pay Bills</h2>
          <p className="mb-3 font-semibold text-green-600">
  Current Balance: {user?.isFrozen ? "" : `$${balance.toFixed(2)}`}
</p>

{user?.isFrozen && (
  <p className="mb-3 font-semibold text-red-600">
    Account Frozen — Contact customer care.
  </p>
)}

          <input
            placeholder="Bill Name"
            value={billName}
            onChange={e => setBillName(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="border p-2 w-full mb-2 text-red-600 rounded"
          />
          <input
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <button
            onClick={handlePayBill}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
          >
            Pay Bill
          </button>

          <h3 className="mt-6 font-semibold text-lg">Bill Payment History</h3>
          <div className="max-h-96 overflow-y-auto mt-2 space-y-2">
            {transactions.map(tx => (
              <div key={tx._id} className="border p-2 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-200">
                <div className="mb-2 sm:mb-0">
                  <div className="font-semibold">{tx.description}: ${tx.amount}</div>
                  <div className="text-sm">Recipient: {tx.recipientName}</div>
                  <div className="text-sm text-gray-700">{tx.description}</div>
                </div>
                <button
                  onClick={() => generateReceipt(tx)}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
                >
                  Receipt
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

