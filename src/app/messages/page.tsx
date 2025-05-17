"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, Send, ArrowLeft, Sidebar } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const chat = [
  {
    name: "Sarah",
    time: "now",
    message: "Please send me the report",
    avatar: "S",
  },
  {
    name: "Tobiloba",
    time: "2h ago",
    message: "I will send it to you later",
    avatar: "T",
  },
  {
    name: "Micheal",
    time: "now",
    message: "Please send me the report Monday",
    avatar: "M",
  },
  {
    name: "Emily",
    time: "20m ago",
    message: "Yes, at 3PM",
    avatar: "E",
  },
  {
    name: "Dacron",
    time: "29m ago",
    message: "See you soon",
    avatar: "D",
  },
  {
    name: "Kratos",
    time: "1hr ago",
    message: "See you soon Aretus",
    avatar: "K",
  },
  {
    name: "Sheldon",
    time: "1hr ago",
    message: "Hi Leonard!!",
    avatar: "S",
  },
  {
    name: "Yamal",
    time: "3hr ago",
    message: "Hi Rapha",
    avatar: "Y",
  },
  {
    name: "Pedri",
    time: "8hr ago",
    message: "When are we training?",
    avatar: "P",
  },
  {
    name: "Frenkie",
    time: "2m ago",
    message: "Call me soon",
    avatar: "F",
  },
  {
    name: "Bruno",
    time: "7m ago",
    message: "I'll be with you shortly",
    avatar: "F",
  },
];

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isSent: boolean;
}

const initialMessages: Record<string, Message[]> = {
  Sarah: [
    {
      id: 1,
      sender: "Sarah",
      text: "Hey there! How are you today?",
      time: "10:03 AM",
      isSent: false,
    },
    {
      id: 2,
      sender: "You",
      text: "I'm doing well, thanks!",
      time: "10:05 AM",
      isSent: true,
    },
    {
      id: 3,
      sender: "You",
      text: "Did you go to the last class ?",
      time: "12:08 PM",
      isSent: true,
    },
  ],
  Tobiloba: [
    {
      id: 4,
      sender: "Tobiloba",
      text: "Yo! Got the files?",
      time: "9:00 AM",
      isSent: false,
    },
    {
      id: 5,
      sender: "You",
      text: "Yes, sending them now.",
      time: "9:05 AM",
      isSent: true,
    },
  ],
  Micheal: [
    {
      id: 6,
      sender: "Micheal",
      text: "Can we reschedule?",
      time: "11:00 AM",
      isSent: false,
    },
    {
      id: 7,
      sender: "You",
      text: "Sure, when works?",
      time: "11:02 AM",
      isSent: true,
    },
  ],
  Emily: [
    {
      id: 8,
      sender: "Emily",
      text: "Meeting later today?",
      time: "1:00 PM",
      isSent: false,
    },
    {
      id: 9,
      sender: "You",
      text: "Yes, at 3 PM.",
      time: "1:05 PM",
      isSent: true,
    },
  ],
};

function Messages() {
  const [search, setSearch] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const messagesWrapperRef = useRef<HTMLDivElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messageList, setMessageList] = useState(initialMessages);
  const [justSentMessage, setJustSentMessage] = useState(false);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  };

  const sendHandler = () => {
    if (messageValue.trim() === "" || !selectedChat) return;
    const newMessage: Message = {
      id: Date.now(),
      sender: "Me",
      text: messageValue,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSent: true,
    };

    setMessageList((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage],
    }));
    setMessageValue("");
    setJustSentMessage(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendHandler();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedChat(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);
  useEffect(() => {
    const container = messagesWrapperRef.current;
    if (!container) return;

    const scrollBuffer = 100; // px threshold to define "near bottom"
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    const isUserNearBottom = distanceFromBottom <= scrollBuffer;

    if (justSentMessage && isUserNearBottom) {
      container.scrollTop = container.scrollHeight;
    }

    setJustSentMessage(false);
  }, [messageList[selectedChat as keyof typeof messageList]]);

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Sidebar */}
      <nav
        className={`flex flex-col 
          ${sidebarOpen ? "w-full" : "w-0"}
          ${!sidebarOpen ? "hidden" : "block"}
          md:w-90 bg-white transition-transform transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:block border-r border-gray-200`}
      >
        {/* Header */}
        <header className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        </header>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search conversations..."
              className="pl-9 bg-gray-50 hover:bg-gray-100 focus:bg-white transition-colors"
              aria-label="Search conversations"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>

        {/* Chat List */}
        <ul className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {chat
            .filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setSelectedChat(user.name);
                    setSidebarOpen(!sidebarOpen);
                  }}
                  className="w-full px-4 py-3 flex gap-4 hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none"
                >
                  <Avatar className="h-12 w-12 bg-primary/10 text-primary font-semibold flex justify-center items-center">
                    {user.avatar}
                  </Avatar>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <span className="text-xs text-gray-500">{user.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {user.message}
                    </p>
                  </div>
                </button>
              </li>
            ))}
        </ul>
      </nav>

      {/* Chat Area */}
      <main
        className={`flex-1 flex-col bg-white min-h-screen md:h-auto  md:flex ${
          sidebarOpen ? "hidden" : "flex"
        }`}
      >
        {/* Chat Header */}
        {selectedChat ? (
          <header className="px-2 py-2 border-b-2 border-gray-200">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 bg-primary/10 text-primary flex justify-center items-center">
                  {selectedChat[0]}
                </Avatar>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {selectedChat}
                  </h2>
                  <p className="text-sm text-emerald-500">Online</p>
                </div>
              </div>
            </div>
          </header>
        ) : null}

        {/* Chat Body */}
        {selectedChat ? (
          <div className="flex flex-col flex-1  max-h-[calc(100vh-50px)] ">
            {/* Scrollable Messages */}
            <div
              ref={messagesWrapperRef}
              className="flex-1 overflow-y-auto px-6 py-4 "
            >
              {(messageList[selectedChat] || []).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isSent ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div>
                    <div
                      className={`p-3 max-w-xs md:max-w-md rounded-2xl ${
                        message.isSent
                          ? "bg-emerald-500 text-white rounded-br-none"
                          : "bg-gray-200 text-black rounded-bl-none"
                      }`}
                    >
                      {message.text}
                    </div>
                    <span
                      className={`text-xs text-gray-500 block mt-1 ${
                        message.isSent ? "text-right" : "text-left"
                      }`}
                    >
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesWrapperRef} />
            </div>

            {/* Fixed Input Bar */}
            <div className="bg-white border-t border-gray-200 px-4 py-3 sticky bottom-0 z-10">
              <div className="flex items-center">
                <Input
                  value={messageValue}
                  onChange={handleMessageChange}
                  onKeyDown={handleKeyPress}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Button
                  onClick={sendHandler}
                  className="ml-2 bg-emerald-500 text-white p-2 rounded-full flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
            <p className="text-lg font-medium">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Messages;
