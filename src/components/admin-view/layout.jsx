import React, { useState } from 'react'
import Adminsidebar from './sidebar'
import Adminheader from './header'
import { Outlet } from 'react-router-dom'

function Adminlayout() {

  const [openSidebar, setOpenSidebar]=useState(false);
 return (
  <>
    <div className="flex min-h-screen w-full">

      {/* Sidebar */}
      <Adminsidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <div className="sticky top-0 z-20 bg-background border-b shadow-sm">
          <Adminheader setOpen={setOpenSidebar} />
        </div>
        {/* Main Content */}
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  </>
);
}

export default Adminlayout