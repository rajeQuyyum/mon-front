import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Investment from "../Pages/Investment";

const TransactionHistory = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [transactions, setTransactions] = useState([]);

  const API = import.meta.env.VITE_API  || 'http://localhost:6000';

  useEffect(() => {
    if (user?.id) {
      const fetchTransactions = () => {
        axios.get(`${API}/user/${user.id}/transactions`)
          .then(res => setTransactions(res.data))
          .catch(console.log);
      };

      fetchTransactions();
      const interval = setInterval(fetchTransactions, 5000); // auto-refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [user]);

  if (!user) return <p>Please log in to see your transactions.</p>;

  return (
    <div className="">
      <div>
        <Navbar />
      </div>
      <div>
        <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda in sunt sint, qui consequuntur unde molestiae labore placeat, tempora cupiditate sapiente officiis omnis ab alias! Eum, minima. Asperiores atque veritatis provident voluptatibus quae adipisci? Asperiores neque nostrum rem quod vero recusandae, aperiam velit odio voluptatum aspernatur maiores, dolores animi culpa ab sunt obcaecati iure aliquam porro, doloremque officia a qui cupiditate minus quibusdam. Vitae eius, accusamus minima repellendus inventore repellat nisi iusto iste velit quia in esse reprehenderit expedita! Officiis eaque, suscipit ad odit maiores perferendis inventore, natus culpa itaque sunt voluptate tenetur numquam quasi. Eveniet obcaecati fugit blanditiis officia.</h1>
      </div>
      <div className="bg-white p-10 rounded shadow w-[1000px] ml-52 mb-42">
        <h2 className="text-xl font-bold mb-2">Transaction History</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {transactions.map(tx => (
              <div key={tx._id} className="border-b py-2 flex justify-between items-center">
                <div>
                  <span className="font-semibold">{tx.type.toUpperCase()}</span> ${tx.amount}{" "}
                  <span className="text-gray-500">- {tx.description}</span>
                  <br />
                  <span className="text-gray-700 text-sm">
                    Recipient: {tx.recipientName} ({tx.counterpartyAccount})
                  </span>
                </div>
                <div className="text-gray-400 text-sm">{new Date(tx.date).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TransactionHistory;
