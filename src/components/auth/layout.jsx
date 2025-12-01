import { Outlet } from "react-router-dom";

function Authlayout() {
  return (
    <>
      <div className="flex min-h-screen w-full">
        {/* left part  */}
        <div className="hidden lg:flex items-center justify-center bg-black  px-22">
          <div className="max-w-md space-y-6 text-center text-primary-foreground">
            <h1 className="text-4xl font-extrabold tracking-tight">
              Welcome to E-cart
            </h1>
          </div>
        </div>
        {/* other child component */}
        <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sn:px-6 lg:px-8">
            <Outlet/>
        </div>
      </div>
    </>
  );
}

export default Authlayout;
