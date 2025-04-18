"use client";

type ButtonProps = React.PropsWithChildren & {
  onClick: (e?: any) => void;
  variant?: "link" | "outlined" | "default";
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
};

export function Button({
  children,
  onClick,
  variant = "default",
  type = "button",
  loading,
}: ButtonProps) {
  let baseClass =
    "rounded-md w-full flex items-center justify-center py-2 font-semibold";

  let typeClass = "";

  switch (variant) {
    case "link":
      typeClass = "text-purple-600 font-normal hover:underline bg-transparent";
      break;
    case "outlined":
      typeClass =
        "border border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50 active:bg-purple-100";
      break;
    case "default":
    default:
      typeClass =
        "text-white bg-purple-600 hover:bg-purple-500 active:bg-purple-700";
      break;
  }

  return (
    <button
      disabled={loading}
      type={type}
      onClick={onClick}
      className={`${baseClass} ${typeClass}`}
    >
      {children}
    </button>
  );
}
