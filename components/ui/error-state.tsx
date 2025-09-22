import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title: string;
  onRetry: () => void;
}

export function ErrorState({ title, onRetry }: Readonly<ErrorStateProps>) {
  return (
    <div className={`flex items-center justify-center h-64 `}>
      <div className="text-center">
        <p className="text-destructive mb-4 font-medium">{title}</p>
        <Button variant="default" onClick={onRetry} className="dark:text-white">
          Retry
        </Button>
      </div>
    </div>
  );
}
