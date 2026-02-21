import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-600">
        You do not have permission to access this page.
      </p>
      <Link
        href="/"
        className="mt-6 text-blue-600 hover:text-blue-800 underline"
      >
        Return to Home
      </Link>
    </div>
  );
}
