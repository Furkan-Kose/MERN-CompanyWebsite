import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { getProjects } from '../api/projectApi'
import Loading from './Loading'
import { useProjects } from '../api/projectApi'
import { Project } from '../types'
import { apiURL } from '../constants'


const Projects = () => {

    const { data: projects, isLoading, isError } = useProjects()

    const titleRef = useRef(null)
    const titleIsInView = useInView(titleRef, { margin: "-100px", once: true})
    
    const cardRef = useRef(null)
    const cardIsInView = useInView(cardRef, { margin: "-100px", once: true})

  return (
    <div className='px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col gap-10 z-40' ref={titleRef}>
        <motion.h2 
            initial={{ scale: 0 }}
            animate={ titleIsInView ? { scale: 1 }: {}}
            transition={{ duration: 0.5 }}
            className='text-center text-white font-bold text-3xl border-b border-white pb-4'>Projelerimiz</motion.h2>
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-8' ref={cardRef}>
            <>
            {isLoading &&
                <div className='p-16 mb-8'>
                    <Loading />
                </div>
            }
            {!isLoading && projects?.map((project: Project, index: any) => (
                <motion.div
                    initial={{ opacity: 0, y: -30, x: -300 }}
                    animate={ cardIsInView ? { opacity: 1, y: 0, x:0 }: {}}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    key={index}
                    className='w-3/4 md:w-[45%] lg:w-1/4 rounded-lg overflow-hidden bg-black bg-opacity-50 h-[24rem]'
                >
                    <Link to={`/projeler/${project.slug}`} className=''>
                        <img 
                            src={`${apiURL}${project.img}`} alt={project.name} className='w-full h-5/6 object-cover' 
                        />
                        <div 
                            className='flex flex-col items-center justify-center py-2 w-full h-1/6 text-white'
                        >
                            <h3 className='font-bold text-xl'>{project.name}</h3>
                            <p>{project.year}</p>
                        </div>
                    </Link>
                </motion.div>
            ))}
            {isError && 
                <div className='p-16 mb-8'>
                    <p className='text-center text-white'>Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
                </div>
            }
            {!isLoading && projects?.length === 0 && 
                <div className='p-16 mb-8'>
                    <p className='text-center text-white'>Henüz bir proje eklenmedi.</p>
                </div>
            }
            </>
        </div>
    </div>
  )
}

export default Projects