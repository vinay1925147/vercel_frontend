import { Outlet } from 'react-router-dom';
import Shoppingheader from './header';

function Shoppinglayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden sticky">
      <div className=" sticky top-0 z-50 bg-white ">
        <Shoppingheader />
      </div>
      <main className='flex flex-col w-full'>
        <Outlet/>
      </main>
    </div>
  )
}

export default Shoppinglayout;