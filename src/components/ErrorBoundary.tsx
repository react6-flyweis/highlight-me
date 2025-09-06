import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { Button } from "./ui/button";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console; replace with reporting service if available.
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  renderFallback() {
    // Detect Vite dev mode without using `any`.
    const meta = import.meta as unknown as { env?: { DEV?: boolean } };
    const isDev = Boolean(meta.env?.DEV);

    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full">
          <CardHeader>
            <CardTitle>Something went wrong</CardTitle>
            <CardDescription>
              An unexpected error occurred. You can try reloading the page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Only show the raw error message in development */}
            {isDev && this.state.error?.message && (
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground bg-muted/30 rounded-md p-4 overflow-auto">
                {this.state.error.message}
              </pre>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={this.handleReload}>
              Reload
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  render() {
    if (this.state.hasError) return this.renderFallback();

    return this.props.children;
  }
}
