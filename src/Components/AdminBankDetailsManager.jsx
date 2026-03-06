import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBankDetailsManager() {
  const API = import.meta.env.VITE_API || "http://localhost:8000";

  const [users, setUsers] = useState([]);
  const [bankForms, setBankForms] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔹 FETCH BANK DETAILS ONLY
  const fetchBankDetails = async () => {
    try {
      const res = await axios.get(`${API}/admin/users/bank-details`);
      setUsers(res.data);

      const forms = {};
      res.data.forEach((u) => {
        forms[u.id] = {
          bankAccountNumber: u.bankAccountNumber || "",
          bankTransitNumber: u.bankTransitNumber || "",
          bankInstitutionNumber: u.bankInstitutionNumber || "",
        };
      });

      setBankForms(forms);
    } catch (err) {
      console.error("FETCH BANK DETAILS ERROR:", err);
    }
  };

  useEffect(() => {
    fetchBankDetails();
  }, []);

  // 🔹 SAVE BANK DETAILS
  const saveBankDetails = async (userId) => {
    try {
      setLoading(true);
      await axios.post(
        `${API}/admin/user/${userId}/bank-details`,
        bankForms[userId]
      );
      await fetchBankDetails();
      alert("Bank details saved");
    } catch (err) {
      console.error("SAVE BANK DETAILS ERROR:", err);
      alert("Failed to save bank details");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 DELETE BANK DETAILS
  const deleteBankDetails = async (userId) => {
    if (!window.confirm("Delete this user's bank details?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API}/admin/user/${userId}/bank-details`);
      await fetchBankDetails();
      alert("Bank details deleted");
    } catch (err) {
      console.error("DELETE BANK DETAILS ERROR:", err);
      alert("Failed to delete bank details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">
        User Bank Details (Admin Only)
      </h2>

      {users.length === 0 && (
        <p className="text-gray-500">No users found</p>
      )}

      {users.map((u) => (
        <div
          key={u.id}
          className="border rounded-lg p-4 mb-6"
        >
          {/* USER INFO */}
          <div className="mb-4">
            <p className="font-semibold text-lg">{u.name}</p>
            <p className="text-sm text-gray-500">{u.email}</p>
          </div>

          {/* BANK FORM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Account Number"
              value={bankForms[u.id]?.bankAccountNumber || ""}
              onChange={(e) =>
                setBankForms({
                  ...bankForms,
                  [u.id]: {
                    ...bankForms[u.id],
                    bankAccountNumber: e.target.value,
                  },
                })
              }
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Transit Number"
              value={bankForms[u.id]?.bankTransitNumber || ""}
              onChange={(e) =>
                setBankForms({
                  ...bankForms,
                  [u.id]: {
                    ...bankForms[u.id],
                    bankTransitNumber: e.target.value,
                  },
                })
              }
              className="border p-2 rounded"
            />

            <input
              type="text"
              placeholder="Institution Number"
              value={bankForms[u.id]?.bankInstitutionNumber || ""}
              onChange={(e) =>
                setBankForms({
                  ...bankForms,
                  [u.id]: {
                    ...bankForms[u.id],
                    bankInstitutionNumber: e.target.value,
                  },
                })
              }
              className="border p-2 rounded"
            />
          </div>

          {/* ACTIONS */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => saveBankDetails(u.id)}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-1.5 rounded text-sm"
            >
              Save Bank Details
            </button>

            <button
              onClick={() => deleteBankDetails(u.id)}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-1.5 rounded text-sm"
            >
              Delete Bank Details
            </button>
          </div>

          {/* STATUS */}
          {(u.bankAccountNumber ||
            u.bankTransitNumber ||
            u.bankInstitutionNumber) && (
            <p className="text-xs text-gray-500 mt-2">
              Bank details exist for this user
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
