import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminIdCardManager() {
  const API = import.meta.env.VITE_API || "http://localhost:8000";
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/admin/users/id-cards`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteIdCard = async (userId) => {
    if (!window.confirm("Delete BOTH front & back ID cards?")) return;
    await axios.delete(`${API}/admin/user/${userId}/id-card`);
    fetchUsers();
  };

  return (
    <div className=" mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">User ID Cards</h2>

      {users.map((u) => (
        <div
          key={u.id}
          className="border rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* LEFT SIDE — USER INFO */}
          <div>
            <p className="font-semibold text-lg">{u.name}</p>
            <p className="text-sm text-gray-500">{u.email}</p>

            <div className="mt-4 text-sm grid grid-cols-1 gap-2">
              <p><strong>Phone:</strong> {u.phone || "—"}</p>
              <p><strong>Address:</strong> {u.address || "—"}</p>
              <p><strong>Gender:</strong> {u.gender || "—"}</p>

              <p><strong>Next of Kin:</strong> {u.nextOfKin || "—"}</p>
              <p><strong>Next of Kin Number:</strong> {u.nextOfKinNumber || "—"}</p>
              <p><strong>Next of Kin Address:</strong> {u.nextOfKinAddress || "—"}</p>
              <p><strong>Next of Kin Gender:</strong> {u.nextOfKinGender || "—"}</p>
            </div>
          </div>

          {/* RIGHT SIDE — ID CARDS */}
          <div>
            {u.idCardFrontUrl || u.idCardBackUrl ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* FRONT */}
                  {u.idCardFrontUrl && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        ID Card (Front)
                      </p>
                      <div className="w-[320px] aspect-[1.586/1] border rounded overflow-hidden bg-gray-100">
                        <img
                          src={u.idCardFrontUrl}
                          alt="ID Card Front"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* BACK */}
                  {u.idCardBackUrl && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">
                        ID Card (Back)
                      </p>
                      <div className="w-[320px] aspect-[1.586/1] border rounded overflow-hidden bg-gray-100">
                        <img
                          src={u.idCardBackUrl}
                          alt="ID Card Back"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteIdCard(u.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-1.5 rounded text-sm"
                >
                  Delete ID Card (Front & Back)
                </button>
              </>
            ) : (
              <p className="text-sm text-gray-400 mt-4">
                No ID card uploaded
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
