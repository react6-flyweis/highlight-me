export function SocialLogins() {
  return (
    <div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-muted-foreground/40" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-muted-foreground">or</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-muted-foreground/40 text-sm shadow-sm hover:shadow focus:outline-none"
        >
          {/* Google icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M17.64 9.2045c0-.638-.057-1.25-.164-1.84H9v3.48h4.844c-.208 1.12-.84 2.07-1.793 2.71v2.25h2.9c1.695-1.56 2.678-3.86 2.678-6.6z"
              fill="#4285F4"
            />
            <path
              d="M9 18c2.43 0 4.47-.804 5.96-2.18l-2.9-2.25c-.81.54-1.86.86-3.06.86-2.35 0-4.34-1.58-5.05-3.7H.97v2.32C2.45 15.9 5.5 18 9 18z"
              fill="#34A853"
            />
            <path
              d="M3.95 10.96a5.41 5.41 0 010-3.92V4.72H.97a9 9 0 000 8.56l2.98-2.32z"
              fill="#FBBC05"
            />
            <path
              d="M9 3.58c1.32 0 2.5.45 3.43 1.34l2.57-2.57C13.46.78 11.43 0 9 0 5.5 0 2.45 2.1.97 4.72l2.98 2.32C4.66 5.16 6.65 3.58 9 3.58z"
              fill="#EA4335"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-muted-foreground/40 text-sm shadow-sm hover:shadow focus:outline-none"
        >
          {/* Facebook icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.38-3.62 3.5-3.62.99 0 2.02.18 2.02.18v2.22h-1.13c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.9h-2.1v7.03C18.34 21.2 22 17.06 22 12.07z"
              fill="#1877F2"
            />
            <path
              d="M16.5 14.97l.4-2.9h-2.5v-1.7c0-.72.35-1.42 1.47-1.42h1.13V6.73s-1.03-.18-2.02-.18c-2.12 0-3.5 1.29-3.5 3.62v1.64H8.08v2.9h2.36v7.03c.8.12 1.62.18 2.56.18s1.76-.06 2.5-.18v-7.03h-2.5z"
              fill="#fff"
            />
          </svg>
          <span>Continue with Facebook</span>
        </button>
      </div>
    </div>
  );
}
