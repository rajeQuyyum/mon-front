import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NotificationPopup from "../Components/NotificationPopup";

export default function Trransfer() {
  const [latestNotification, setLatestNotification] = useState(null);
    const [dismissedId, setDismissedId] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [recipientAccount, setRecipientAccount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
   const API = import.meta.env.VITE_API || 'http://localhost:8000'


   // ✅ Fetch latest notification
  useEffect(() => {
    if (!user?.email) return;

    const fetchLatest = async () => {
      try {
        const res = await axios.get(`${API}/user/${user.email}/notifications?limit=1`);
        const newest = res.data[0];
        if (newest && newest._id !== dismissedId) {
          setLatestNotification(newest);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 10000);
    return () => clearInterval(interval);
  }, [user, dismissedId]);

  // ✅ Close handler
  const handleClose = (id) => {
    setLatestNotification(null);
    setDismissedId(id);
    localStorage.setItem("dismissedNotificationId", id);
  };


  // Fetch transactions for the logged-in user
  const fetchTransactions = () => {
  if (!user?.id) return;
  if (user?.isFrozen) return;

  axios
    .get(`${API}/user/${user.id}/transactions`)
    .then((res) => setTransactions(res.data))
    .catch(err => {
      if (err?.response?.status === 423) alert("Account is frozen. Contact customer care.");
      else console.log(err);
    });
};

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Generate printable receipt
  const generateReceipt = (tx) => {
    const html = `
      <div style="padding:20px; font-family: Arial;">
        <h2>Transaction Receipt</h2>
        <p><strong>sender:</strong> ${user?.name}</p>
        <p><strong>Type:</strong> ${tx.type}</p>
        <p><strong>Amount:</strong> $${tx.amount}</p>
        <p><strong>Recipient Account:</strong> ${tx.counterpartyAccount}</p>
        <p><strong>Recipient Name:</strong> ${tx.recipientName}</p>
        <p><strong>Description:</strong> ${tx.description}</p>
        <p><strong>Date:</strong> ${new Date(tx.date).toLocaleString()}</p>
      </div>
    `;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    w.print();
  };

  // Handle sending money
  const handleSend = () => {
    if (user?.isFrozen) return alert("Account is frozen. Contact customer care.");
    if (!recipientAccount || !recipientName || !amount)
      return alert("All fields required");

    const amt = parseFloat(amount);

    axios
      .post(`${API}/admin/user/${user.id}/transaction`, {
        type: "debit",
        amount: amt,
        counterpartyAccount: recipientAccount,
        recipientName,
        description,
      })
      .then((res) => {
        // Update transaction history immediately
        setTransactions((prev) => [res.data, ...prev]);

        // Clear form fields
        setRecipientAccount("");
        setRecipientName("");
        setAmount("");
        setDescription("");

        // Generate receipt
        generateReceipt(res.data);
      })
      .catch(console.log);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 mt-28 mb-20">
        <h1 className="text-center text-lg sm:text-xl md:text-2xl font-bold text-black mb-6">
          Transfer Money
        </h1>

        {/* Send Money Form */}
        <div className="p-6 max-w-lg mx-auto bg-white text-black rounded-xl shadow-md">
          <h2 className="text-xl mb-3 font-bold text-gray-800">Send Money</h2>

          <input
            placeholder="Recipient Account"
            value={recipientAccount}
            onChange={(e) => setRecipientAccount(e.target.value)}
            className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            placeholder="Recipient Name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 w-full text-red-600 mb-3 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-3 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send
          </button>

          {/* Transaction History */}
          <h3 className="mt-6 font-semibold text-lg text-gray-700">
            Transaction History
          </h3>
          <div className="max-h-80 overflow-y-auto mt-2 space-y-3">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div
                  key={tx._id}
                  className="border p-3 rounded-lg flex justify-between items-center bg-gray-50 shadow-sm"
                >
                  <div>
                    <div className="font-semibold text-gray-800">
                      {tx.type.toUpperCase()} ${tx.amount}
                    </div>
                    <div className="text-sm text-gray-600">
                      Recipient: {tx.recipientName} ({tx.counterpartyAccount})
                    </div>
                    {tx.description && (
                      <div className="text-sm text-gray-500">
                        {tx.description}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => generateReceipt(tx)}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                  >
                    Receipt
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No transactions yet.</p>
            )}
          </div>
        </div>
      </main>
          {/* ✅ Notification popup */}
                <NotificationPopup notification={latestNotification} onClose={handleClose} />
      <Footer />
    </div>
  );
}
