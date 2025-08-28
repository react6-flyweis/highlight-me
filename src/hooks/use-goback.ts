import type { MouseEvent } from "react";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

/**
 * A hook that provides a function to navigate back to the previous page.
 * Falls back to a default path based on user type if there's no previous page in history.
 * @param customFallbackPath Optional custom fallback path that overrides the default user type-based paths
 */
export function useGoBack(customFallbackPath?: string) {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = useCallback(
    (eventOrSteps?: MouseEvent<HTMLButtonElement> | number) => {
      let stepsToGoBack = 1;

      // Check if the argument is a number
      if (typeof eventOrSteps === "number") {
        stepsToGoBack = eventOrSteps;
      }

      // Determine the fallback path based on user type if no custom path is provided
      const fallbackPath = customFallbackPath || "/";

      if (location.key === "default") {
        // If there's no history (user navigated directly to this page)
        navigate(fallbackPath);
      } else {
        try {
          // For multiple steps back, use browser's history API
          if (Math.abs(stepsToGoBack) > 1) {
            // Set up a fallback timer in case history navigation fails
            const fallbackTimer = setTimeout(() => {
              navigate(fallbackPath);
            }, 100);

            // Listen for popstate to clear the timer if navigation succeeds
            const handlePopState = () => {
              clearTimeout(fallbackTimer);
              window.removeEventListener("popstate", handlePopState);
            };

            window.addEventListener("popstate", handlePopState);
            window.history.go(stepsToGoBack);
          } else {
            // For single step, use React Router
            navigate(-stepsToGoBack);
          }
        } catch {
          //   console.error('Navigation error:', error);
          navigate(fallbackPath);
        }
      }
    },
    [navigate, customFallbackPath, location.key]
  );

  return goBack;
}
