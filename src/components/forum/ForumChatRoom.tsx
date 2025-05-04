"use client";

import { useSendMessages } from "@/src/hooks/useSendMessage";
import { ChatTile } from "./ChatTile";
import { useAuth } from "@/src/hooks/useAuth";
import { MessageCard } from "../Messages";
import { useState } from "react";
import { Input } from "../Input";
import { Input as SCNInput } from "../ui/input";
import { Button } from "../ui/button";
import { File } from "lucide-react";

export function ForumChatRoom() {
  const { loading, messages, error, fetchMessages, sendMessage } =
    useSendMessages();

  const { user } = useAuth();

  const [messageContent, setMessageContent] = useState<string>("");

  if (loading) return <p>En attente des derniers messages...</p>;

  return (
    <div className="w-full h-full rounded-md p-6 my-4 space-y-4">
      <div className="bg-gray-50 p-6">
        {!error && messages.length === 0 ? (
          <div>Aucun message pour l'instant...</div>
        ) : (
          messages.map((message) => (
            <ChatTile
              key={message.id}
              content={message.content}
              isUserSide={user.id === message.senderId}
              senderId={message.senderId}
            />
          ))
        )}
        {error && (
          <div className="space-y-6">
            <MessageCard content={error} type="error" />

            <Button onClick={fetchMessages}>Reessayer</Button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Input
          setValue={(e) => setMessageContent(e.target.value)}
          value={messageContent}
          placeholder="Faites par de votre avis..."
        />

        <SCNInput
          type="file"
          placeholder="Ajouter"

          className="max-w-46 w-full h-12 mb-3 rounded-full file:hidden"
        />

        <Button
          className="h-12 mb-3 bg-purple-600 w-32"
          onClick={() => sendMessage(messageContent, user.id)}
        >
          Envoyer
        </Button>
      </div>
    </div>
  );
}
