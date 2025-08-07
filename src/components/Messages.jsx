const Messages = ({ message }) => {
  const time = new Date(message.timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div
      key={message._id}
      className={`flex ${
        message.from === message.wa_id ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`flex flex-col max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md ${
          message.from === message.wa_id
            ? "bg-white text-gray-800 rounded-bl-none"
            : "bg-green-200 text-gray-800 rounded-br-none"
        }`}
      >
        <div className="text-sm">{message.message_body}</div>
        <div className="flex items-end justify-end mt-2 mb-0 gap-1 text-xs text-gray-500 self-end">
          <span>{time}</span>
          {message.from != message.wa_id && (
            <span
              className={`${
                message.status === "read" ? "text-blue-500" : "text-gray-400"
              }`}
            >
              <i className="fa-solid fa-check-double"></i>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
