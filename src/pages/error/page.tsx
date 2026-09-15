import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
}

export default function ErrorPage({
  title,
  description,
  showHomeButton = true,
}: ErrorPageProps) {
  const { t } = useLanguage();
  const heading = title ?? t("error.heading");
  const body = description ?? t("error.description");

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <AlertCircle className="h-20 w-20 text-muted-foreground/50" />
        </div>

        <h1 className="mb-4 text-4xl font-bold text-foreground">{heading}</h1>
        <p className="mb-8 max-w-md text-lg text-muted-foreground">{body}</p>

        {showHomeButton && (
          <Link to="/">
            <Button>
              <Home className="mr-2 h-4 w-4" />
              {t("error.goHome")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}