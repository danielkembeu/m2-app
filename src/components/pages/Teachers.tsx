import { ClassView } from "@/src/components/teachers/ClassView";
import { NotificationForm } from "@/src/components/notifications/NotificationForm";

export function TeacherPage() {
  return (
    <div className="p-4 space-y-8">
      <h1 className="text-xl font-bold text-purple-600">Espace Enseignant</h1>

      <section>
        <NotificationForm />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Élèves & classes</h2>
        <ClassView />
      </section>
    </div>
  );
}
