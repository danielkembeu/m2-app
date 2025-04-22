import { RequestForm } from "@/src/components/request/RequestForm";
import { StudentList } from "@/src/components/eleves/StudentsList";
import { NotificationList } from "@/src/components/notifications/NotificationsList";
import { Banner } from "../Banner";

export function ParentPage() {
  return (
    <div className="py-6 space-y-8 px-32">
      <Banner />

      <section>
        <h2 className="text-lg font-semibold mb-2">Mes notifications</h2>
        <NotificationList />
      </section>

      <section>
        <StudentList />
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
