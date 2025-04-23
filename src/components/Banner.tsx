import Image from "next/image";
import image from "@/public/images/teachers.jpeg";

type BannerProps = {
  message?: string;
  title?: string;
  imgSource?: string;
};

export function Banner({ message, title, imgSource }: BannerProps) {
  return (
    <div className="bg-purple-600 rounded-xl h-64 w-full my-6">
      <div>
        {/* <Image src={imgSource ?? image} alt="Professeur image" /> */}
      </div>
      <div className="flex flex-col items-center justify-center h-full space-y-4 px-20">
        <h2 className="text-3xl font-bold text-white">
          {title ?? "Bienvenue dans votre espace !"}
        </h2>
        <p className="text-white text-center">
          {/* Texte de description */}
          {message ??
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem repellat quos fugiat corporis esse natus ducimus quaerat velit architecto, officiis totam facere labore illo nisi cumque sit magni consequuntur dignissimos."}
        </p>
      </div>
    </div>
  );
}
