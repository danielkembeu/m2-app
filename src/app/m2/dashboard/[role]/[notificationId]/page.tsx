"use client";

import { Notification } from "@/src/generated/prisma";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/components/Button";
import { useRouter } from "next/navigation";

export default function Notifications() {
  const { notificationId } = useParams();
  const [notification, setNotification] = useState<Notification | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(`/api/events/${notificationId}`);
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Notification data:", data);
        setNotification(data.notification);
      } catch (error) {
        console.error("Error fetching notification:", error);
        setNotification(null);
      }
    };

    fetchNotification();
  }, []);

  return (
    <div>
      <div className="flex justify-start mb-4 w-full">
        <Button variant="link" onClick={() => router.back()}>
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Notification Details
      </h1>
      <div className="mx-auto my-5 p-5 max-w-xl border border-gray-300 rounded-lg shadow-md bg-gray-50">
        {notification ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {notification.title}
            </h2>
            <strong>Sujet:</strong>
            <p className="text-lg text-gray-600 mt-2">{notification.subject}</p>
            <strong>Message:</strong>
            <p className="text-lg text-gray-600 mt-2">{notification.message}</p>
            <strong>Created At:</strong>
            <p className="text-sm text-gray-500 mt-4">
              {new Date(notification.createdAt).toLocaleDateString()}{" "}
              {new Date(notification.createdAt).toLocaleTimeString()}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading notification...</p>
        )}
      </div>
    </div>
  );
}
