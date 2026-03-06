// StockDemo.js
import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";

const sampleStocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 150 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 2800 },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 3400 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 720 },
];

function StockDemo() {
  const [stocks, setStocks] = useState(
    sampleStocks.map((s) => ({
      ...s,
      change: 0,
      history: [{ time: 0, price: s.price }],
    }))
  );

  // simulate updates every 3s
  useEffect(() => {
    let tick = 1;
    const interval = setInterval(() => {
      setStocks((prev) =>
        prev.map((s) => {
          const randomChange = (Math.random() - 0.5) * 10; // -5 to +5
          const newPrice = parseFloat((s.price + randomChange).toFixed(2));

          return {
            ...s,
            price: newPrice,
            change: parseFloat(randomChange.toFixed(2)),
            history: [...s.history, { time: tick, price: newPrice }].slice(-10), // keep last 10 points
          };
        })
      );
      tick++;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 sm:p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        📈 Stock Market Demo
      </h1>

      {/* Table wrapper for responsiveness */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 text-sm sm:text-base">
              <th className="py-2 px-3 sm:px-4">Symbol</th>
              <th className="py-2 px-3 sm:px-4">Company</th>
              <th className="py-2 px-3 sm:px-4">Price ($)</th>
              <th className="py-2 px-3 sm:px-4">Change</th>
              <th className="py-2 px-3 sm:px-4">Trend</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-600 text-sm sm:text-base"
              >
                <td className="py-2 px-3 sm:px-4 font-bold">{stock.symbol}</td>
                <td className="py-2 px-3 sm:px-4">{stock.name}</td>
                <td className="py-2 px-3 sm:px-4">{stock.price}</td>
                <td
                  className={`py-2 px-3 sm:px-4 flex items-center gap-2 ${
                    stock.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stock.change >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {stock.change}
                </td>
                <td className="py-2 px-3 sm:px-4">
                  <div className="w-[120px] sm:w-[150px] h-[50px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stock.history}>
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={stock.change >= 0 ? "#22c55e" : "#ef4444"}
                          strokeWidth={2}
                          dot={false}
                        />
                        <XAxis dataKey="time" hide />
                        <YAxis domain={["auto", "auto"]} hide />
                        <Tooltip />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-gray-400 text-center text-sm sm:text-base">
        💡 Prices update randomly every 3 seconds. Charts show the last 10
        updates for each stock.
      </p>
    </div>
  );
}

export default StockDemo;
