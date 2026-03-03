import { ResetForm } from "@/components/forms/reset-form";
import { AuthCard } from "@/components/shared/auth-card";

export default function ResetPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <AuthCard>
        <ResetForm />
      </AuthCard>
    </div>
  );
}
