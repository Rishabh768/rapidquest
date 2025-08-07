import React from 'react'
import Messages from './Messages';
const MainChatArea = ({handleBackToChatList,handleSendMessage,selectedChat}) => {
    console.log("selectedChat", selectedChat);
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center">
          <button
            onClick={handleBackToChatList}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none mr-3"
          >
            <i className="fas fa-arrow-left text-xl"></i>
          </button>

          <img
            src={"https://avatar.iran.liara.run/public"}
            alt={selectedChat[0]?.name}
            className="w-10 h-10 rounded-full mr-3 border-2 border-gray-300"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedChat[0]?.name}
            </h3>
            <p className="text-sm text-gray-500">
              {selectedChat[0]?.phone_number}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <i className="fas fa-video text-xl"></i> {/* Video call icon */}
          </button>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <i className="fas fa-phone text-xl"></i> {/* Phone call icon */}
          </button>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <i className="fas fa-ellipsis-v text-xl"></i> {/* More options */}
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 overflow-y-auto bg-cover bg-center chat-messages">
        <div className="flex flex-col space-y-4">
          {selectedChat?.map((message) => (
            <Messages key={message._id} message={message} />
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center p-4 border-t border-gray-200 bg-white shadow-md rounded-br-lg"
      >
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 focus:outline-none mr-3"
        >
          <i className="far fa-grin text-2xl"></i> {/* Emoji icon */}
        </button>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 focus:outline-none mr-3"
        >
          <i className="fas fa-paperclip text-2xl"></i> {/* Attach icon */}
        </button>
        <input
          type="text"
          name="messageInput"
          placeholder="Type a message"
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        />
        <button
          type="submit"
          className="ml-3 p-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
        >
          <i className="fas fa-paper-plane "></i>
        </button>
      </form>
    </>
  );
}

export default MainChatArea