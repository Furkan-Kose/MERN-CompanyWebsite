import {useState, useEffect} from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
    {
        title: 'Anasayfa',
        path: '/'
    },
    {
        title: 'Hakkımızda',
        path: '/hakkimizda'
    },
    {
        title: 'Projelerimiz',
        path: '/projeler'
    },
    {
        title: 'Faaliyet Alanlarımız',
        path: '/faaliyet-alanlarimiz'
    },
    {
        title: 'Referanslar',
        path: '/referanslar'
    },
    {
        title: 'İletişim',
        path: '/iletisim'
    }
]

const Header = () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const handleBodyScroll = () => {
          document.body.style.overflow = open ? 'hidden' : 'auto';
          document.documentElement.style.overflow = open ? 'hidden' : 'auto';
        };
    
        handleBodyScroll();
    
        return () => {
          document.body.style.overflow = 'auto';
          document.documentElement.style.overflow = 'auto';
        };
    }, [open]);

    const topVariants = {
        closed: {
          rotate: 0,
        },
        opened: {
          rotate: 45,
          backgroundColor: "rgb(255,255,255)"
        }
      }
    
      const centerVariants = {
        closed: {
          opacity: 1,
        },
        opened: {
          opacity: 0,
        }
      }
    
      const bottomVariants = {
        closed: {
          rotate: 0,
        },
        opened: {
          rotate: -45,
          backgroundColor: "rgb(255,255,255)"
        }
      };
    
      const listVariants = {
        closed: {
          x: "100vw",
        },
        opened: {
          x: 0,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
          },
        }
      };
    
      const listItemVariants = {
        closed: {
          x: -10,
          opacity: 0,
        },
        opened: {
          x: 0,
          opacity: 1,
        },
      }

  return (
    <div className={`h-20 md:h-[5.5rem] w-full flex items-center justify-between px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 text-xl border-b border-white border-opacity-20 z-20 bg-slate-800 bg-opacity-80 backdrop-blur-sm fixed`}>
        {/* LOGO */}
            <Link to='/'>
                <img src="https://egeizyapi.com/images/logo.png" alt="logo" className='h-16 md:h-20' />
            </Link>

        {/* LINKS */}
        <div className='hidden md:flex gap-4 md:text-sm lg:text-base xl:text-lg text-white'>
            <NavLink to='/hakkimizda' className={({isActive}) => isActive ? "text-blue-500 p-3" : "hover:bg-slate-900 p-3"}>Hakkımızda</NavLink>
            <NavLink to='/projeler' className={({isActive}) => isActive ? "text-blue-500 p-3" : "hover:bg-slate-900 p-3"}>Projelerimiz</NavLink>
            <NavLink to='/faaliyet-alanlarimiz' className={({isActive}) => isActive ? "text-blue-500 p-3" : "hover:bg-slate-900 p-3"}>Faaliyet Alanlarımız</NavLink>
            <NavLink to='/referanslar' className={({isActive}) => isActive ? "text-blue-500 p-3" : "hover:bg-slate-900 p-3"}>Referanslar</NavLink>
            <NavLink to='/iletisim' className={({isActive}) => isActive ? "text-blue-500 p-3" : "hover:bg-slate-900 p-3"}>İletişim</NavLink>
        </div>

        {/* MOBILE MENU */}
        <div className='md:hidden z-50'>
            <button 
                className='w-10 h-8 flex flex-col justify-between z-50 relative'
                onClick={() => setOpen((prev) => !prev)}  
            >
            <motion.div 
                variants={topVariants} 
                animate={open ? "opened" : "closed"}
                className='w-10 h-1 bg-white rounded origin-left'
            ></motion.div>
            <motion.div 
                variants={centerVariants} 
                animate={open ? "opened" : "closed"}
                className='w-10 h-1 bg-white rounded'
            ></motion.div>
            <motion.div 
                variants={bottomVariants} 
                animate={open ? "opened" : "closed"}
                className='w-10 h-1 bg-white rounded origin-left'
            ></motion.div>
            </button>
            {/* MOBILE MENU LINKS */}
            {open && (
                <motion.div 
                    variants={listVariants}
                    initial='closed'
                    animate='opened'
                    className='absolute top-0 left-0 w-full h-screen overflow-hidden bg-black bg-opacity-90 text-white flex flex-col items-center justify-center gap-8 text-3xl z-40'
                >
                    {links.map((link) => (
                        <motion.div 
                            variants={listItemVariants}
                            key={link.title}
                        >
                            <Link to={link.path} onClick={()=>setOpen(false)}>
                                {link.title}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    </div>
  )
}

export default Header