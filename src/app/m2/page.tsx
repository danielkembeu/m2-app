import banner from "@/public/images/students.jpeg";
import Image from "next/image";

export default function App() {
  return (
    <div>
      <section className="h-full w-full">
        {/* <h1>This is the home first landing page.</h1> */}
        <div>
          <Image
            src={banner}
            alt="Banner image"
            width={0}
            height={0}
            className="w-full"
          />
        </div>
      </section>
    </div>
  );
}
