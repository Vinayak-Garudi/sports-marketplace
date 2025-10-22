import { Card } from "@/components/custom/Card";
import AdminLoginForm from "./AdminLoginForm";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Access the admin dashboard
            </p>
          </div>

          <AdminLoginForm />

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to Home
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
