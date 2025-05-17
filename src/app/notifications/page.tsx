"use client";

import { Button } from "@/components/ui/button";
import {
  Bell,
  Funnel,
  ArrowRight,
  X,
  Home,
  MessageSquare,
  Calendar,
  CreditCard,
  User,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function page() {
  const initialNotifications = [
    {
      id: 1,
      title: "New message from Agent Williams",
      description:
        "Hi there! I received your inquiry about the 3-bedroom apartment on Oak Street. Would you like to schedule a viewing?",
      time: "2 minutes ago",
      read: false,
      type: "message",
    },
    {
      id: 2,
      title: "Viewing appointment reminder",
      description:
        "Your viewing for the townhouse at 124 Pine Avenue is tomorrow at 3:00 PM.",
      time: "1 hour ago",
      read: false,
      type: "appointment",
    },
    {
      id: 3,
      title: "New property match",
      description:
        "A new property matching your search criteria is now available: 2-bedroom condo in Downtown.",
      time: "3 hours ago",
      read: true,
      type: "property",
    },
    {
      id: 4,
      title: "Rent payment confirmed",
      description:
        "Your monthly rent payment of $1,200 for 45 Maple Street has been processed successfully.",
      time: "Yesterday",
      read: true,
      type: "payment",
    },
    {
      id: 5,
      title: "Application status update",
      description:
        "Your rental application for the studio apartment at Riverside Complex has been approved!",
      time: "2 days ago",
      read: true,
      type: "application",
    },
  ];
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
      ? notifications.filter((n) => !n.read)
      : notifications.filter((n) => n.read);

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare size={16} className="text-blue-500" />;
      case "appointment":
        return <Calendar size={16} className="text-amber-500" />;
      case "property":
        return <Home size={16} className="text-green-500" />;
      case "payment":
        return <CreditCard size={16} className="text-orange-300" />;
      case "application":
        return <User size={16} className="text-purple-500" />;
      default:
        return <Bell size={16} />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Top */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Notifications</h1>
        <Button
          variant={"ghost"}
          className="text-emerald-500 font-semibold hover:bg-transparent hover:text-emerald-300 cursor-pointer"
          onClick={markAllAsRead}
        >
          Mark all as read
        </Button>
      </div>
      {/* Filter */}
      <div className="flex gap-4 mt-8 items-center">
        <Funnel className="w-5 text-gray-500" />
        <Button
          onClick={() => setFilter("all")}
          variant={"ghost"}
          className={`cursor-pointer ${
            filter === "all"
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-300"
              : "hover:bg-gray-100"
          }`}
        >
          All
        </Button>
        <Button
          onClick={() => setFilter("unread")}
          variant={"ghost"}
          className={`cursor-pointer ${
            filter === "unread"
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-300"
              : "hover:bg-gray-100"
          }`}
        >
          Unread
        </Button>
        <Button
          onClick={() => setFilter("read")}
          variant={"ghost"}
          className={`cursor-pointer ${
            filter === "read"
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-300"
              : "hover:bg-gray-100"
          }`}
        >
          Read
        </Button>
      </div>
      {/* Notification list */}
      <div className="space-y-4 mt-6">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`cursor-pointer p-3 sm:p-4 rounded-lg border transition-colors ${
              notification.read
                ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                : "bg-emerald-100 dark:bg-blue-900/10 border-emerald-100 dark:border-blue-900/20"
            }`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <h2 className="font-semibold text-base sm:text-lg">
                    {notification.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {notification.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                      className="text-emerald-500 text-xs h-7 px-2 hover:bg-transparent hover:text-emerald-700"
                    >
                      <Check size={12} className="mr-1" />
                      Mark as read
                    </Button>
                  )}
                </div>

                <div className="flex gap-1">
                  <Link
                    href={notification.type === "message" ? "/messages" : "#"}
                  >
                    <Button
                      size="icon"
                      variant="ghost"
                      aria-label="View notification details"
                      className="h-8 w-8 hover:bg-transparent cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4 text-gray-500" />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => deleteNotification(notification.id)}
                    size="icon"
                    variant="ghost"
                    aria-label="Remove notification"
                    className="h-8 w-8 hover:bg-transparent cursor-pointer"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
