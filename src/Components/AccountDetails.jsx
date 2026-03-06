import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotificationPopup from "./NotificationPopup";

export default function AccountDetails() {
  const [latestNotification, setLatestNotification] = useState(null);
  

  const [idCardFront, setIdCardFront] = useState(null);
  const [idCardBack, setIdCardBack] = useState(null);
  const [dismissedId, setDismissedId] = useState(null);
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState({
    phone: "",
    address: "",
    gender: "",
    nextOfKin: "",
    nextOfKinNumber: "",
    nextOfKinAddress: "",
    nextOfKinGender: "",
  });
  const [editField, setEditField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleClose = (id) => {
    setLatestNotification(null);
    setDismissedId(id);
    localStorage.setItem("dismissedNotificationId", id);
  };

  // ✅ Fetch user info + additional info
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.id) {
      setUser(storedUser);

      axios
        .get(`${API}/user/${storedUser.id}/additional-info`)
        .then((res) => {
          const data = res.data || {};
          setInfo({
  phone: data.phone || "",
  address: data.address || "",
  gender: data.gender || "",
  nextOfKin: data.nextOfKin || "",
  nextOfKinNumber: data.nextOfKinNumber || "",
  nextOfKinAddress: data.nextOfKinAddress || "",
  nextOfKinGender: data.nextOfKinGender || "",

  // ✅ BANK (ADMIN MANAGED)
  bankAccountNumber: data.bankAccountNumber || "",
  bankTransitNumber: data.bankTransitNumber || "",
  bankInstitutionNumber: data.bankInstitutionNumber || "",

  // ✅ ID CARD
  idCardFrontUrl: data.idCardFrontUrl || "",
  idCardBackUrl: data.idCardBackUrl || "",
});

        })
        .catch((err) => console.error(err));
    }
    }, []);

     const handleSaveField = async (field, value) => {
    if (!user || !user.id) return;

    setLoading(true);
    setMessage("");

    try {
      const payload = { ...info, [field]: value };
      await axios.post(`${API}/user/${user.id}/additional-info`, payload);

      setInfo((prev) => ({ ...prev, [field]: value }));
      setEditField(null);
      setMessage("Field updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error saving field.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading user...</div>;

  return (
    <section>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 mt-28 flex flex-col gap-6 mb-10">

        {/* =============== ACCOUNT INFO SECTION =============== */}
        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Account Info</h2>
          <div className="mb-2"><strong>User ID</strong> {user.id}</div>
          <div className="mb-2"><strong>Name:</strong> {user.name}</div>
          <div className="mb-2"><strong>Email:</strong> {user.email}</div>
        </div>


        {/* =============== BANK DETAILS SECTION =============== */}
<div className="bg-white p-6 shadow-md rounded-md">
  <h2 className="text-2xl font-bold mb-4">Bank Details</h2>

  {info.bankAccountNumber ||
  info.bankTransitNumber ||
  info.bankInstitutionNumber ? (
    <>
      <div className="mb-2">
        <strong>Account Number:</strong>{" "}
        {info.bankAccountNumber || "—"}
      </div>

      <div className="mb-2">
        <strong>Transit Number:</strong>{" "}
        {info.bankTransitNumber || "—"}
      </div>

      <div className="mb-2">
        <strong>Institution Number:</strong>{" "}
        {info.bankInstitutionNumber || "—"}
      </div>
    </>
  ) : (
    <p className="text-gray-500 text-sm">
      Bank details not added yet
    </p>
  )}
</div>


        {/* =============== SAVED INFO SECTION =============== */}
        <div className="bg-gray-100 p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Saved Info</h2>

          {/* Phone */}
          <div className="mb-4 flex sm:flex-row sm:items-center sm:gap-2">
            <div className="flex-1 min-w-[120px]">
              <strong>Phone:</strong>{" "}
              {editField === "phone" ? (
                <input
                  type="text"
                  className="border p-1 rounded w-full sm:w-[140px]"
                  value={info.phone}
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                />
              ) : (
                info.phone || "Not added"
              )}
            </div>
            <button
              className={`px-3 py-1 rounded text-sm ${
                editField === "phone" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() =>
                editField === "phone"
                  ? handleSaveField("phone", info.phone)
                  : setEditField("phone")
              }
              disabled={loading}
            >
              {editField === "phone" ? "Save" : "Edit"}
            </button>
          </div>

          {/* Address */}
          <div className="mb-4 flex sm:flex-row sm:items-center sm:gap-2">
            <div className="flex-1 min-w-[120px]">
              <strong>Address:</strong>{" "}
              {editField === "address" ? (
                <input
                  type="text"
                  className="border p-1 rounded w-full sm:w-[140px]"
                  value={info.address}
                  onChange={(e) => setInfo({ ...info, address: e.target.value })}
                />
              ) : (
                info.address || "Not added"
              )}
            </div>
            <button
              className={`px-3 py-1 rounded text-sm ${
                editField === "address" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() =>
                editField === "address"
                  ? handleSaveField("address", info.address)
                  : setEditField("address")
              }
              disabled={loading}
            >
              {editField === "address" ? "Save" : "Edit"}
            </button>
          </div>

          {/* Gender */}
          <div className="mb-4 flex sm:flex-row sm:items-center sm:gap-2">
            <div className="flex-1 min-w-[120px]">
              <strong>Gender:</strong>{" "}
              {editField === "gender" ? (
                <select
                  className="border p-1 rounded w-full sm:w-[140px] text-sm"
                  value={info.gender}
                  onChange={(e) => setInfo({ ...info, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                info.gender || "Not selected"
              )}
            </div>
            <button
              className={`px-3 py-1 rounded text-sm ${
                editField === "gender" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() =>
                editField === "gender"
                  ? handleSaveField("gender", info.gender)
                  : setEditField("gender")
              }
              disabled={loading}
            >
              {editField === "gender" ? "Save" : "Edit"}
            </button>
          </div>


          {/* =============== ID CARD UPLOAD =============== */}
    <div className="mb-4">
    <strong>ID Card (Front & Back):</strong>

    <div className="mt-3 flex gap-4 flex-wrap">
    {/* FRONT */}
    <div>
      <p className="text-sm mb-1">Front</p>
      {info.idCardFrontUrl ? (
        <div className="w-[320px] aspect-[1.586/1] border rounded overflow-hidden shadow">
          <img
            src={info.idCardFrontUrl}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No front uploaded</p>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setIdCardFront(e.target.files[0])}
        className="mt-2"
      />
    </div>

    {/* BACK */}
    <div>
      <p className="text-sm mb-1">Back</p>
      {info.idCardBackUrl ? (
        <div className="w-[320px] aspect-[1.586/1] border rounded overflow-hidden shadow">
          <img
            src={info.idCardBackUrl}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No back uploaded</p>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setIdCardBack(e.target.files[0])}
        className="mt-2"
      />
    </div>
  </div>

  <button
    className="mt-4 px-4 py-1 bg-green-600 text-white rounded text-sm"
    disabled={loading}
    onClick={async () => {
      if (!idCardFront && !idCardBack)
        return alert("Select front or back image");

      const formData = new FormData();
      if (idCardFront) formData.append("idCardFront", idCardFront);
      if (idCardBack) formData.append("idCardBack", idCardBack);

      try {
        setLoading(true);
        const res = await axios.post(
          `${API}/user/${user.id}/id-card`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setInfo((prev) => ({
          ...prev,
          idCardFrontUrl: res.data.idCardFrontUrl || prev.idCardFrontUrl,
          idCardBackUrl: res.data.idCardBackUrl || prev.idCardBackUrl,
        }));

        alert("ID card updated");
      } catch {
        alert("Upload failed");
      } finally {
        setLoading(false);
      }
    }}
  >
    Upload / Replace ID Card
  </button>
</div>

        </div>

        {/* =============== NEXT OF KIN SECTION =============== */}
        <div className="bg-gray-50 p-6 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Next of Kin Info</h2>

          {/* Next of Kin */}
          <div className="mb-4 flex sm:flex-row sm:items-center sm:gap-2">
            <div className="flex-1 min-w-[120px]">
              <strong>Next of Kin:</strong>{" "}
              {editField === "nextOfKin" ? (
                <input
                  type="text"
                  className="border p-1 rounded w-full sm:w-[140px]"
                  value={info.nextOfKin}
                  onChange={(e) => setInfo({ ...info, nextOfKin: e.target.value })}
                />
              ) : (
                info.nextOfKin || "Not added"
              )}
            </div>
            <button
              className={`px-3 py-1 rounded text-sm ${
                editField === "nextOfKin" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() =>
                editField === "nextOfKin"
                  ? handleSaveField("nextOfKin", info.nextOfKin)
                  : setEditField("nextOfKin")
              }
              disabled={loading}
            >
              {editField === "nextOfKin" ? "Save" : "Edit"}
            </button>
          </div>

          {/* Next of Kin Number */}
          <div className="mb-4 flex  sm:flex-row sm:items-center sm:gap-2">
            <div className="flex-1 min-w-[120px]">
              <strong>Next of Kin Number:</strong>{" "}
              {editField === "nextOfKinNumber" ? (
                <input
                  type="text"
                  className="border p-1 rounded w-full sm:w-[140px]"
                  value={info.nextOfKinNumber}
                  onChange={(e) => setInfo({ ...info, nextOfKinNumber: e.target.value })}
                />
              ) : (
                info.nextOfKinNumber || "Not added"
              )}
            </div>
            <button
              className={`px-3 py-1 rounded text-sm ${
                editField === "nextOfKinNumber" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() =>
                editField === "nextOfKinNumber"
                  ? handleSaveField("nextOfKinNumber", info.nextOfKinNumber)
                  : setEditField("nextOfKinNumber")
              }
              disabled={loading}
            >
              {editField === "nextOfKinNumber" ? "Save" : "Edit"}
            </button>
          </div>

          {/* Next of Kin Address */}
          <div className="mb-4 flex sm:flex-row sm:items-center sm:gap-2">
            <div className="flex-1 min-w-[120px]">
              <strong>Next of Kin Address:</strong>{" "}
              {editField === "nextOfKinAddress" ? (
                <input
                  type="text"
                  className="border p-1 rounded w-full sm:w-[140px]"
                  value={info.nextOfKinAddress}
                  onChange={(e) => setInfo({ ...info, nextOfKinAddress: e.target.value })}
                />
              ) : (
                info.nextOfKinAddress || "Not added"
              )}
            </div>
            <button
              className={`px-3 py-1 rounded text-sm ${
                editField === "nextOfKinAddress" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() =>
                editField === "nextOfKinAddress"
                  ? handleSaveField("nextOfKinAddress", info.nextOfKinAddress)
                  : setEditField("nextOfKinAddress")
              }
              disabled={loading}
            >
              {editField === "nextOfKinAddress" ? "Save" : "Edit"}
            </button>
          </div>

          {/* Next of Kin Gender */}
          <div className="mb-4 flex sm:flex-row sm:items-center sm:gap-2">
            <div className="flex-1 min-w-[120px]">
              <strong>Next of Kin Gender:</strong>{" "}
              {editField === "nextOfKinGender" ? (
                <select
                  className="border p-1 rounded w-full sm:w-[140px] text-sm"
                  value={info.nextOfKinGender}
                  onChange={(e) => setInfo({ ...info, nextOfKinGender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                info.nextOfKinGender || "Not selected"
              )}
            </div>
            <button
              className={`px-3 py-1 rounded text-sm ${
                editField === "nextOfKinGender" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
              }`}
              onClick={() =>
                editField === "nextOfKinGender"
                  ? handleSaveField("nextOfKinGender", info.nextOfKinGender)
                  : setEditField("nextOfKinGender")
              }
              disabled={loading}
            >
              {editField === "nextOfKinGender" ? "Save" : "Edit"}
            </button>
          </div>

          {message && <p className="text-green-600 mt-4">{message}</p>}
        </div>
      </div>

      {/* ✅ Notification popup */}
      <NotificationPopup notification={latestNotification} onClose={handleClose} />
      <Footer />
    </section>
  );
}
