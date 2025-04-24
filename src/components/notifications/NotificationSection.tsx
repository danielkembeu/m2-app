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
} from "@/src/components/ui/dialog";
import { Plus } from "lucide-react";
import { NoData } from "../NoData";
import { useAuth } from "@/src/hooks/useAuth";
import { MessageCard } from "../Messages";
import { ListeClasses } from "@/src/generated/prisma"; // Importez l'enum ListeClasses

type Notification = {
  id: string;
  title: string;
  message: string;
  subject: string;
  creatorId: string;
  createdAt: string;
};

type Parent = {
  id: string;
  fullname: string;
};

export function NotificationSection() {
  const DEFAULT_TIMEOUT = 5000;

  const { user } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("EVENEMENT");
  const [selectedParents, setSelectedParents] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data.events || []);
        setLoading(false);
      });

    // Récupérer la liste des parents
    fetch("/api/users/parents")
      .then((res) => res.json())
      .then((data) => {
        setParents(data.parents || []);
        setLoading(false);
      });

    return () => {
      setLoading(false);
    };
  }, [refresh]);

  const handleSubmit = async () => {
    setFormLoading(true);

    if (
      !title ||
      !message ||
      !subject ||
      selectedParents.length === 0 ||
      selectedClasses.length === 0
    ) {
      setError("Tous les champs sont requis !");
      setTimeout(() => {
        setError("");
        setFormLoading(false);
      }, DEFAULT_TIMEOUT);
      return;
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        message,
        subject,
        creatorId: user.id,
        parentIds: selectedParents,
        classes: selectedClasses, // Utilisation directe des classes
      }),
    });

    if (res.ok) {
      setTitle("");
      setMessage("");
      setSubject("EVENEMENT");
      setSelectedParents([]);
      setSelectedClasses([]);
      setRefresh(!refresh);
      setFormLoading(false);
    } else {
      setError("Erreur lors de la création de la notification.");
      setTimeout(() => {
        setError("");
        setFormLoading(false);
      }, DEFAULT_TIMEOUT);
    }
  };

  if (loading) return <p>Chargement des classes...</p>;

  return (
    <div className="space-y-6">
      {/* {error && <MessageCard type="error" content={error} />} */}
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
              className="border-2 focus:border-purple-600 p-2 w-full rounded"
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

            <select
              multiple
              className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200 focus:border-purple-600 py-4"
              value={selectedParents}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );

                if (selectedOptions.includes("ALL")) {
                  // Si "Tous les parents" est sélectionné, ajoutez tous les IDs des parents
                  setSelectedParents(parents.map((parent) => parent.id));
                } else {
                  setSelectedParents(selectedOptions);
                }
              }}
            >
              <option value="ALL">Tous les parents</option>
              {parents.map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.fullname}
                </option>
              ))}
            </select>

            <select
              multiple
              className="border-2 text-gray-700 p-2 w-full rounded-md border-gray-200 focus:border-purple-600 py-4"
              value={selectedClasses}
              onChange={(e) => {
                const selectedOptions = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );

                if (selectedOptions.includes("ALL")) {
                  // Si "Toutes les classes" est sélectionnée, ajoutez toutes les classes
                  setSelectedClasses(Object.values(ListeClasses));
                } else {
                  setSelectedClasses(selectedOptions);
                }
              }}
            >
              {Object.values(ListeClasses).map((classe) => (
                <option key={classe} value={classe}>
                  {classe}
                </option>
              ))}
            </select>
          </form>
          <DialogFooter className="mt-4">
            <Button loading={formLoading} type="button" onClick={handleSubmit}>
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
