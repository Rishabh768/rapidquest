import axios from "axios";
import { useState, useEffect } from "react";
import Messages from "./components/Messages";
import SideBarChat from "./components/SideBarChat";
import MainChatArea from "./components/MainChatArea";

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatListVisible, setIsChatListVisible] = useState(true);
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    const res = await axios.get("http://localhost:5000/chats");
    setChats(res.data);
  };

  useEffect(() => {
    getChats();
  }, []);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    const input = e.target.elements.messageInput;
    const messageText = input.value.trim();

    if (messageText && selectedChat) {
      const timestamp = Math.floor(Date.now() / 1000);
      const messageId = `wamid.${timestamp}`;

      const test = {
        payload_type: "whatsapp_webhook",
        _id: "conv1-msg2-api",
        metaData: {
          entry: [
            {
              changes: [
                {
                  field: "messages",
                  value: {
                    messaging_product: "whatsapp",
                    metadata: {
                      display_phone_number: "918329446654",
                      phone_number_id: "629305560276479",
                    },
                    contacts: [
                      {
                        profile: {
                          name: selectedChat[0]?.name,
                        },
                        wa_id: selectedChat[0]?.wa_id,
                      },
                    ],
                    messages: [
                      {
                        from: "918329446654",
                        id: messageId,
                        timestamp: timestamp,
                        text: {
                          body: messageText,
                        },
                        type: "text",
                      },
                    ],
                  },
                },
              ],
              id: messageId,
            },
          ],
          gs_app_id: "conv1-app",
          object: "whatsapp_business_account",
        },
      };

      // Clear input
      input.value = "";

      // Send to backend
      await axios.post("http://localhost:5000/webhook", test);

      // Get the message from test
      const sentMessage = test.metaData.entry[0].changes[0].value.messages[0];
      sentMessage.message_body = sentMessage.text.body;
      sentMessage.status = "sent";

      // Update frontend state (no newMessage)
      setSelectedChat((prev) => [...prev, sentMessage]);
    }
  };


  const handleSelectChat = async (chat) => {
    const res = await axios.get(`http://localhost:5000/messages/${chat._id}`);
    setSelectedChat(res.data);
    if (window.innerWidth < 768) {
      setIsChatListVisible(false);
    }
  };

  const handleBackToChatList = () => {
    setIsChatListVisible(true);
    setSelectedChat(null);
  };

  return (
    <div className="flex h-screen antialiase</div>d text-gray-800 font-inter">
      <div className="flex flex-row h-full w-full overflow-hidden bg-gray-100 rounded-lg shadow-lg">
        {/* Chat Sidebar */}
        <SideBarChat
          isChatListVisible={isChatListVisible}
          chats={chats}
          selectedChat={selectedChat}
          handleSelectChat={handleSelectChat}
        />

        {/* Main Chat Area */}
        <div
          className={`flex-col flex-1 bg-gray-50 rounded-r-lg ${
            isChatListVisible ? "hidden md:flex" : "flex w-full"
          }`}
        >
          {selectedChat ? (
            <MainChatArea
              handleBackToChatList={handleBackToChatList}
              selectedChat={selectedChat}
              handleSendMessage={handleSendMessage}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500    text-xl">
              <i className="fab fa-whatsapp text-6xl text-green-500 mb-4"></i>
              <span>Select a chat to start messaging</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
