import React, {useRef, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { getServices } from '../api/serviceApi'
import Loading from './Loading'
import { useServices } from '../api/serviceApi'
import { Service } from '../types'
import { apiURL } from '../constants'


const Services = () => {

    const { data: services, isLoading, isError } = useServices()

    const titleRef = useRef(null)
    const titleIsInView = useInView(titleRef, { margin: "-100px", once: true})

    const cardRef = useRef(null)
    const cardIsInView = useInView(cardRef, { margin: "-100px", once: true})

return (
    <div className='px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col gap-10' ref={titleRef}>
        <motion.h2 
            initial={{ scale: 0 }}
            animate={ titleIsInView ? { scale: 1 }: {}}
            transition={{ duration: 0.5 }}
            className='text-center text-white text-3xl font-bold border-b border-white pb-4'>Faaliyet Alanlarımız</motion.h2>
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-8' ref={cardRef}>
            <>
            {isLoading &&
                <div className='p-16 mb-8'>
                    <Loading />
                </div>
            }
            {services?.map((service: Service, index: any) => (
                <motion.div
                    initial={{ opacity: 0, y: "-30px", x: "-300px" }}
                    animate={ cardIsInView ? { opacity: 1, y: 0, x:0 }: {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    key={index}
                >
                    <Link to={`/faaliyet-alanlarimiz/${service.slug}`} className='min-w-40 md:min-w-64 p-4 md:p-8 rounded-lg shadow-md bg-gradient-to-b from-slate-300 to-slate-500 flex flex-col justify-center items-center gap-4 hover:scale-105 hover:opacity-75 hover:border hover:border-blue-500 transition'>
                        <motion.img 
                            whileHover={{ scale: 1.1 }}
                            initial={{ opacity: 0 }}
                            animate={ cardIsInView ? { opacity: 1 }: {}}
                            transition={{ duration: 0.1, delay: index * 0.2 + 0.5}}
                            src={`${apiURL}${service.img}`} alt={service.name} className='' 
                        />
                        <motion.h3 
                            initial={{ opacity: 0 }}
                            animate={ cardIsInView ? { opacity: 1 }: {}}
                            transition={{ duration: 0.1, delay: index * 0.2 + 0.5}}

                            className='text-lg md:text-xl font-semibold text-white'
                        >{service.name}</motion.h3>
                    </Link>
                </motion.div>
            ))}
            {isError && 
                <div className='p-16 mb-8'>
                    <p className='text-center text-white'>Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
                </div>
            }
            {!isLoading && services.length === 0 && 
                <div className='p-16 mb-8'>
                    <p className='text-center text-white'>Henüz bir faaliyet alanı eklenmedi.</p>
                </div>
            }
            </>
        
        </div>
    </div>
)
}

export default Services