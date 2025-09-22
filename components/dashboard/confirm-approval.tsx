"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface ConfirmApprovalDialogProps {
  children: React.ReactNode;
  isApproved: boolean;
  count?: number;
  onConfirm: () => void;
}

export function ConfirmApprovalDialog({
  children,
  isApproved,
  count,
  onConfirm,
}: Readonly<ConfirmApprovalDialogProps>) {
  const actionLabel = isApproved ? "Remove" : "Approve";
  const target = count && count > 1 ? "selected reviews" : "this review";

  const handleConfirm = () => {
    onConfirm();
    toast(isApproved ? `Removed ${target} from public` : `Approved ${target}`, {
      description: isApproved
        ? "The review(s) will no longer be visible on the property page."
        : "The review(s) are now visible on the property page.",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isApproved
              ? `Remove ${target} from public?`
              : `Make ${target} public?`}
          </AlertDialogTitle>
          <AlertDialogDescription className="py-5">
            {isApproved
              ? `The ${target} will no longer appear on the public property page.`
              : `The ${target} will be visible on the public property page.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="dark:text-white"
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
