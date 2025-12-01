
import React from "react";
import { Link } from "react-router-dom";

function UnauthPage(){
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
      <p className="text-gray-700 mt-3 text-center">
        You do not have permission to access this page.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          to="/shop/home"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go to Home
        </Link>

        <Link
          to="/auth/login"
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
        >
          Login as Admin
        </Link>
      </div>
    </div>
  );
};

export default UnauthPage;
