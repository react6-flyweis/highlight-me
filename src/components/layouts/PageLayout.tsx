import React, { type PropsWithChildren } from "react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGoBack } from "@/hooks/use-goback";

type PageLayoutProps = PropsWithChildren<{
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  // optional route to navigate back to. If not provided, will render a back button with history.back
  backTo?: string;
  // optional actions (buttons) rendered on the right side of the header
  actions?: React.ReactNode;
}>;

export function PageLayout({
  children,
  title,
  subtitle,
  backTo,
  actions,
}: PageLayoutProps) {
  const goBack = useGoBack();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {backTo ? (
            <Link to={backTo} aria-label="Back">
              <Button variant="ghost" size="icon">
                <ArrowLeftIcon className="size-5 " />
              </Button>
            </Link>
          ) : (
            <button
              type="button"
              aria-label="Back"
              onClick={goBack}
              className="inline-flex items-center rounded-md p-2 hover:bg-accent"
            >
              <ArrowLeftIcon className="size-5 " />
            </button>
          )}

          <div className="flex flex-col">
            {title ? (
              <div className="text-lg font-semibold">{title}</div>
            ) : null}
            {subtitle ? (
              <div className="text-sm text-muted-foreground">{subtitle}</div>
            ) : null}
          </div>
        </div>

        {actions ? <div className="ml-4">{actions}</div> : null}
      </div>

      <div>{children}</div>
    </div>
  );
}
