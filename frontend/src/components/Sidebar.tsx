import React from 'react'
import { MdDashboard, MdPerson, MdConstruction, MdTurnLeft } from 'react-icons/md'
import { LuConstruction } from "react-icons/lu";
import { VscReferences } from "react-icons/vsc";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcAbout } from 'react-icons/fc';
import { toast } from 'react-toastify';


const menuItems = [
    {
        name: 'Panel',
        icon: <MdDashboard size={25} />,
        path: '/admin',
    },
    {
        name: 'Projeler',
        icon: <LuConstruction size={25} />,
        path: '/admin/projeler',
    },
    {
        name: 'Faaliyet Alanları',
        icon: <MdConstruction size={25} />,
        path: '/admin/faaliyet-alanları',
    },
    {
        name: 'Referanslar',
        icon: <VscReferences size={25} />,
        path: '/admin/referanslar',
    },
    {
        name: 'İletişim',
        icon: <MdPerson size={25} />,
        path: '/admin/iletişim',
    },
    {
        name: 'Hakkımızda',
        icon: <FcAbout size={25} />,
        path: '/admin/hakkımızda',
    }
]


const Sidebar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const toastOptions = {
        position: 'bottom-right' as 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    };
    
    const handleLogout = () => {
        sessionStorage.removeItem('token')
        toast.success('Çıkış Yapıldı', toastOptions)
        navigate('/')
    }
    
    return (
    <div className='fixed top-0 left-0 px-8 py-16 h-full w-1/4'>
        <div className='flex items-center mb-16 justify-between'>
            <div className='flex items-center gap-4'>
                <MdPerson size={25}  />
                <div className='flex flex-col'>
                    <span className="font-medium">Admin</span>
                    <span className="text-xs text-gray-400">Administrator</span>
                </div>
            </div>
            <button className='flex items-center p-2 rounded-md hover:bg-slate-700 border-b border-slate-500 font-semibold text-sm' onClick={handleLogout}>
                Çıkış Yap
            </button>
        </div>
        <div className='flex flex-col gap-6'>
            {menuItems.map((item, index) => (
                <Link to={item.path} key={index} className={`flex items-center gap-4 p-2 rounded-md border-b border-slate-500 ${location.pathname === item.path ? 'bg-slate-700' : 'hover:bg-slate-700'}`}>
                    {item.icon}
                    <span>{item.name}</span>
                </Link>
            ))}
        </div>
        <Link 
            to="/"
            className="p-2 px-10 my-4 flex items-center gap-4 rounded-md hover:bg-slate-700 border-b border-slate-500 font-semibold bottom-2 absolute"
        >
            <MdTurnLeft size="25"/>
            Siteye Geri Dön
        </Link>
    </div>
  )
}

export default Sidebar