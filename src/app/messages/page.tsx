"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Send,
  ArrowLeft,
  MessageCircle,
  MoreVertical,
  Video,
  Smile,
  Plus,
  Phone,
  Check,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface ChatItem {
  name: string;
  time: string;
  message: string;
  avatar: string;
  unread?: number;
}

const chat: ChatItem[] = [
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // Message handling types
  type MessageChangeEvent = React.ChangeEvent<HTMLInputElement>;
  type KeyboardPressEvent = React.KeyboardEvent<HTMLInputElement>;

  // Message handlers
  const handleMessageChange = (e: MessageChangeEvent) => {
    setMessageValue(e.target.value);
  };

  const createNewMessage = (text: string): Message => ({
    id: Date.now(),
    sender: "Me",
    text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isSent: true,
  });

  const sendHandler = () => {
    if (messageValue.trim() === "" || !selectedChat) return;

    setMessageList((prev) => ({
      ...prev,
      [selectedChat]: [
        ...(prev[selectedChat] || []),
        createNewMessage(messageValue),
      ],
    }));
    setMessageValue("");
    setJustSentMessage(true);
  };

  const handleKeyPress = (e: KeyboardPressEvent) => {
    if (e.key === "Enter") sendHandler();
  };

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedChat(null);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Auto-scroll handler
  useEffect(() => {
    if (!justSentMessage || !messagesWrapperRef.current) return;

    const container = messagesWrapperRef.current;
    const SCROLL_THRESHOLD = 100;
    const scrollDistance =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    if (scrollDistance <= SCROLL_THRESHOLD) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }

    setJustSentMessage(false);
  }, [justSentMessage]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden">
      {/* Left sidebar */}
      <aside
        className={`bg-white w-80 border-r border-gray-200 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 `}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">Messages</h1>
            <Button variant="ghost" size="icon">
              <MoreVertical size={20} />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          {chat
            .filter((item) =>
              item.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item, index) => (
              <div
                key={index}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat === item.name ? "bg-blue-50" : ""
                }`}
                onClick={() => {
                  setSelectedChat(item.name);
                  setSidebarOpen(false);
                }}
              >
                <div className="flex items-center  gap-3">
                  <Avatar className="h-10 w-10 flex items-center justify-center bg-emerald-500">
                    <div className="text-white">{item.avatar}</div>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{item.name}</h3>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </aside>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <header className="px-4 py-3 border-b bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <ArrowLeft size={20} />
                  </Button>
                  <Avatar className="h-10 w-10 flex items-center justify-center bg-emerald-500">
                    <div className="text-white">{selectedChat[0]}</div>
                  </Avatar>
                  <div>
                    <h2 className="font-medium">{selectedChat}</h2>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical size={20} />
                  </Button>
                </div>
              </div>
            </header>

            <div
              className="flex-1 overflow-y-auto p-4"
              ref={messagesWrapperRef}
            >
              {messageList[selectedChat]?.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.isSent ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isSent
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p>{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.isSent ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 bg-white/80 backdrop-blur-sm border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Plus size={20} />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={messageValue}
                  onChange={handleMessageChange}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-yellow-500 transition-colors"
                >
                  <Smile size={20} />
                </Button>
                <Button
                  onClick={sendHandler}
                  size="icon"
                  variant="default"
                  className="bg-emerald-500 hover:bg-emerald-600 transition-colors"
                  disabled={!messageValue.trim()}
                >
                  <Send size={20} className="mr-1" />
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col gap-4 p-4 text-center">
            <MessageCircle size={48} className="text-gray-400" />
            <h2 className="text-xl font-semibold">Select a conversation</h2>
            <p className="text-gray-500">
              Choose from your existing conversations or start a new one
            </p>
            <Button
              variant="outline"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden "
            >
              Show Conversations
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Messages;
