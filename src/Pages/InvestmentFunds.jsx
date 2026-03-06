import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { NavLink } from "react-router-dom";

export default function InvestmentFunds() {
  return (
    <div>
        <Navbar />
        <div className="mt-28 max-w-4xl mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-6">Investment Funds</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Invest in diversified portfolios managed by financial experts.
        </p>

        <div className="mt-6 space-y-3">
          <p><strong>Risk Level:</strong> Medium</p>
          <p><strong>Minimum Investment:</strong> $500</p>
          <p><strong>Potential Growth Opportunities</strong></p>
          <NavLink to="/invest">
            <p><strong className="bg-green-500 text-white py-2 px-2 rounded-md">Invest Now</strong></p>
          </NavLink>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}