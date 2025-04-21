"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/Button";
import { Input } from "../Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { NoData } from "../NoData";
import { useAuth } from "@/src/hooks/useAuth";
import { MessageCard } from "../Messages";

type Notification = {
  id: string;
  title: string;
  message: string;
  subject: string;
  creatorId: string;
  receiverId: string;
  createdAt: string;
};

export function NotificationSection() {
  const DEFAULT_TIMEOUT = 5000;

  const { getUser } = useAuth();
  const user = getUser();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("EVENEMENT");
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setNotifications(data.events || []));
  }, [refresh]);

  const handleSubmit = async () => {
    if (!title || !message || !subject) {
      setError("Tous les champs sont requis !");
      setTimeout(() => {
        setError("");
      }, DEFAULT_TIMEOUT);
      return;
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, message, subject, creatorId: user.id }),
    });

    if (res.ok) {
      setTitle("");
      setMessage("");
      setSubject("EVENEMENT");
      setRefresh(!refresh);
    } else {
      alert("Erreur lors de la création de la notification.");
      setError("Erreur lors de la création de la notification.");
      setTimeout(() => {
        setError("");
      }, DEFAULT_TIMEOUT);
    }
  };

  return (
    <div className="space-y-6">
      <Dialog>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          <DialogTrigger asChild>
            <div className="w-40">
              <Button variant="outlined" onClick={() => {}}>
                <Plus className="mr-4 size-5" />
                Créer
              </Button>
            </div>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[512px]">
          <DialogHeader>
            <DialogTitle>Créer une notification</DialogTitle>
            <DialogDescription>
              Remplissez les champs pour créer une nouvelle notification.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-2">
            {error && <MessageCard type="error" content={error} />}
            <Input
              label="Titre"
              placeholder="Titre de la notification"
              value={title}
              setValue={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="border p-2 w-full roune.target.valueded"
              placeholder="Message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <select
              className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200 focus:border-purple-600 py-4"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="RESULTAT">Résultat</option>
              <option value="ABSENCE">Absence</option>
              <option value="COMPORTEMENT">Comportement</option>
              <option value="EVENEMENT">Événement</option>
              <option value="EXCLUSION">Exclusion</option>
            </select>
          </form>
          <DialogFooter className="mt-4">
            <Button type="button" onClick={handleSubmit}>
              Créer la notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div>
        {notifications.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="border-2 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
              >
                <h4 className="font-semibold text-md mb-2">{n.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{n.message}</p>
                <p className="text-xs text-gray-500 mb-1">
                  <strong>Sujet:</strong> {n.subject}
                </p>
                <p className="text-xs text-gray-500 mb-1">
                  <strong>Créateur:</strong> {n.creatorId}
                </p>
                <p className="text-xs text-gray-400">
                  <strong>Créé le:</strong>{" "}
                  {new Date(n.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <NoData message="Aucune notification enregistrée pour le moment." />
        )}
      </div>
    </div>
  );
}
