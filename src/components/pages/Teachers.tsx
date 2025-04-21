import { ClassView } from "@/src/components/teachers/ClassView";
import { NotificationSection } from "@/src/components/notifications/NotificationSection";
import { Banner } from "../Banner";

export function TeacherPage() {
  return (
    <div className="px-32 py-6 space-y-8">
      <Banner />

      <section>
        <NotificationSection />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Élèves & classes</h2>
        <ClassView />
      </section>
    </div>
  );
}
