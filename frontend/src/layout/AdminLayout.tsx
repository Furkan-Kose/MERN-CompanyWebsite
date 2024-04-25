import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen'> 
        <div className='w-1/4 border-r border-slate-600'>
            <Sidebar />
        </div>
        <div className='w-3/4'>
            <Outlet />
        </div>
    </div>
  )
}

export default AdminLayout