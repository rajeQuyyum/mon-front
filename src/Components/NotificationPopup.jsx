import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function NotificationPopup({ notification }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissedId = localStorage.getItem("dismissedNotificationId");

    // ✅ Show only if it's a new notification
    if (notification && notification._id !== dismissedId) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [notification]);

  if (!notification || !visible) return null;

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("dismissedNotificationId", notification._id);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99999]">
      <div className="bg-amber-100 border border-gray-300 rounded-lg shadow-lg p-4 w-96 md:w-80 relative animate-slideIn">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={20} />
        </button>

        <h3 className="font-semibold text-gray-800">
          {notification.title}
        </h3>
        <p className="text-gray-600">{notification.message}</p>
        <span className="text-xs text-gray-400">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
