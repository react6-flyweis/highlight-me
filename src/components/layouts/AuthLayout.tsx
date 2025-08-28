import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - gradient / marketing (hidden on small screens) */}
      <aside className="hidden md:flex md:w-1/2 items-end justify-start p-12 bg-primary-gradient">
        <div className="max-w-md text-white mb-10">
          <h2 className="text-2xl font-semibold">
            Stay Updated with What You Love
          </h2>
          <p className="mt-3 text-sm opacity-90">
            Instant messaging, voice & video calls — stay connected anytime,
            anywhere!
          </p>
        </div>
      </aside>

      {/* Right panel - card containing forms */}
      <main className="flex-1 flex justify-center items-center p-8">
        <div className="w-full flex flex-col items-center gap-8">
          <h1 className="text-3xl font-semibold text-teal-600">
            Weekend Highlights
          </h1>

          <Outlet />
        </div>
      </main>
    </div>
  );
}
