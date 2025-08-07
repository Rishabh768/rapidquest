import Messages from "./Messages";
const SideBarChat = ({
  isChatListVisible,
  chats,
  selectedChat,
  handleSelectChat
}) => {
  return (
    <div
      className={`flex-col border-r border-gray-200 bg-white rounded-l-lg shadow-md ${
        isChatListVisible
          ? "flex w-full md:w-1/3 lg:w-1/4 xl:w-1/5"
          : "hidden md:flex md:w-1/3 lg:w-1/4 xl:w-1/5"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <span className="text-xl font-semibold text-gray-800">WhatsApp</span>
        </div>

        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <i className="fas fa-ellipsis-v text-lg"></i>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="relative">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto chat-list-scroll">
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out ${
              selectedChat && chat._id === selectedChat.id ? "bg-blue-50" : ""
            }`}
            onClick={() => handleSelectChat(chat)}
          >
            <img
              src={"xxx"}
              alt={"dummy"}
              className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-md font-semibold text-gray-800">
                  {chat._id}
                </h3>
                <span className="text-xs text-gray-500">
                  {new Date(chat.timestamp * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {chat.latest_message.split(" ").slice(0, 5).join(" ")}
                {chat.latest_message.split(" ").length > 5 && "..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBarChat;