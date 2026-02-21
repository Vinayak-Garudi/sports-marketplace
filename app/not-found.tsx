import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 text-blue-600 hover:text-blue-800 underline"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
