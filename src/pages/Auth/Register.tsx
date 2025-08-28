import { RegisterForm } from "@/components/auth/RegisterForm";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="w-full flex flex-col items-stretch justify-center">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold">Register in to your account</h2>
        <p className="text-sm text-muted-foreground mt-1">Let's get Started</p>

        <div className="mt-5">
          <RegisterForm />
        </div>

        <div className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
