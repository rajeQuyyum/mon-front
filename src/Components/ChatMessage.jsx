const ChatMessage = ({ message, currentUserId }) => {
  const isSender = message.senderId === currentUserId;
  return (
    <div style={{
      textAlign: isSender ? "right" : "left",
      margin: "5px 0"
    }}>
      <span style={{
        display: "inline-block",
        padding: "5px 10px",
        borderRadius: "10px",
        backgroundColor: isSender ? "#4caf50" : "#e0e0e0",
        color: isSender ? "white" : "black"
      }}>
        {message.text}
      </span>
    </div>
  );
};

export default ChatMessage;
