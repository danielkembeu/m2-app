import { RequestForm } from "@/src/components/request/RequestForm";
import { StudentList } from "@/src/components/eleves/StudentsList";
import { NotificationList } from "@/src/components/notifications/NotificationsList";

export function ParentPage() {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-xl font-bold text-purple-600">Espace Parent</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">Mes enfants</h2>
        <StudentList />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Notifications</h2>
        <NotificationList />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">
          Contacter l'administration
        </h2>
        <RequestForm />
      </section>
    </div>
  );
}
