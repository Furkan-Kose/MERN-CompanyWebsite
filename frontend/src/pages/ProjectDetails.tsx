import React, {useRef} from 'react'
import { useParams } from 'react-router-dom'
import {motion, useInView } from 'framer-motion'
import Loading from '../components/Loading'
import { useProject } from '../api/projectApi'

import { Helmet } from 'react-helmet'
import { apiURL } from '../constants'


const ProjectDetails = () => {

    const { slug }: any = useParams()

    const { data: project, isLoading, isError } = useProject(slug)

    console.log(project)
    
    const ref = useRef(null)
    const isInView = useInView(ref, { margin: "-100px", once: true})

    if (isLoading) {
        <div className='bg-black bg-opacity-50 flex items-center justify-center mt-20 md:mt-[5.5rem] py-40'>
            <Loading />
        </div>
    }

    if (isError) {
        <div className='bg-black bg-opacity-50 flex items-center justify-center mt-20 md:mt-[5.5rem] py-40'>
            <p className='text-white'>Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
        </div>
    }

  return (
    <div className='md:px-8 lg:px-16 xl:px-32 md:py-16 mt-20 md:mt-[5.5rem]' ref={ref}>
        <Helmet>
            <title>{`Proje Detayları - ${project?.name}`}</title>
            <meta name="description" content={project?.location} />
        </Helmet>
        {isLoading && (
            <div className='flex items-center justify-center py-40'>
                <Loading />
            </div>
        )}
        <motion.div
            initial={{ opacity: 0, y: 300 }}
            animate={ isInView ? { opacity: 1, y: 0 }: {}}
            transition={{ duration: 0.5 }}
            className='flex flex-col md:flex-row bg-black bg-opacity-50 md:rounded-lg shadow-md'>
            <img src={`${apiURL}${project?.img}`} alt={project?.name} className='w-full h-1/2 md:w-1/2 md:h-full' />
            <div className='flex flex-col gap-8 px-4 py-16 sm:px-8 md:p-16 justify-center w-full md:w-1/2'>
                <div className='flex gap-8 items-center'>
                    <h3 className='text-white font-bold w-1/2'>İŞVEREN:</h3>
                    <p className='text-white w-1/2'>{project?.employer}</p>
                </div>
                <div className='flex gap-8 items-center'>
                    <h3 className='text-white font-bold w-1/2'>LOKASYON:</h3>
                    <p className='text-white w-1/2'>{project?.location}</p>
                </div>
                <div className='flex gap-8 items-center'>
                    <h3 className='text-white font-bold w-1/2'>FAALİYET TÜRÜ:</h3>
                    <p className='text-white w-1/2'>{project?.type}</p>
                </div>
                <div className='flex gap-8 items-center'>
                    <h3 className='text-white font-bold w-1/2'>YAPIM YILI:</h3>
                    <p className='text-white w-1/2'>{project?.year}</p>
                </div>
                <div className='flex gap-8 items-center'>
                    <h3 className='text-white font-bold w-1/2'>YAPIM SÜRESİ:</h3>
                    <p className='text-white w-1/2'>{project?.time}</p>
                </div>
            </div>
        </motion.div>
    </div>
  )
}

export default ProjectDetails