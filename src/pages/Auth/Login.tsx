import { LoginForm } from "@/components/auth/LoginForm";
import { SocialLogins } from "@/components/auth/SocialLogins";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="w-full flex flex-col items-stretch justify-center">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold">Sign in to your Account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email and password to Log In
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>

        <div className="mt-5">
          <SocialLogins />
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
