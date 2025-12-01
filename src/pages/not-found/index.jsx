import React from "react";
import { Link } from "react-router-dom";

function Notfound(){
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-seminbold mb-2">Page Not Found</h2>
      <p className="mb-6">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>
      <div className=" bg-blue-500 text-white px-3 py-1 rounded-2xl cursor-pointer">
       <Link to="/">
         <h1 className="font-semibold font-sans">Go to Home</h1>
       </Link>
      </div>
    </div>
  );
};

export default Notfound;
