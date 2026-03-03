import { ForgotForm } from "@/components/forms/forgot-form";
import { AuthCard } from "@/components/shared/auth-card";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <AuthCard>
        <ForgotForm />
      </AuthCard>
    </div>
  );
}
