"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "./Button";
import { Plus } from "lucide-react";

type DialogFormProps = Readonly<
  React.PropsWithChildren & {
    label: string;
    title: string;
    subTitle: string;
    buttonLabel: string;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  }
>;
export function DialogForm({
  children,
  label,
  title,
  subTitle,
  buttonLabel,
  onSubmit,
}: DialogFormProps) {
  return (
    <Dialog>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold mb-2">{label}</h2>
        <DialogTrigger asChild>
          <div className="w-40">
            <Button variant="outlined">
              <Plus className="mr-4 size-5" />
              Créer
            </Button>
          </div>
        </DialogTrigger>
      </div>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="mt-4">
          <Button type="submit" onClick={onSubmit}>
            {buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
