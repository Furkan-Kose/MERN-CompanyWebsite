import { useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { motion } from 'framer-motion'
import { useService } from '../api/serviceApi'

import { Helmet } from 'react-helmet'


const ServiceDetails = () => {

    const { slug }: any = useParams()

    const { data: service, isLoading, isError } = useService(slug)

    if (isLoading) return (
        <div className='bg-black bg-opacity-50 flex items-center justify-center mt-20 md:mt-[5.5rem] py-48'>
            <Loading />
        </div>
    )

  return (
    <div className='bg-black bg-opacity-50 text-white mt-20 md:mt-[5.5rem]'>
        <Helmet>
          <title>{service?.name + ' - Ege İz Yapı'}</title>
          <meta name="description" content={service?.desc} />
        </Helmet>
        <div className='px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 p-16 flex flex-col gap-8 md:gap-12'>
            <motion.h2 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className='text-center text-white text-3xl font-bold border-b border-white pb-4'
            >
              {service?.name}
            </motion.h2>
            <motion.article 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className='pb-16 whitespace-pre-line font-normal'
            >
                {service?.desc}
            </motion.article>
        </div>
    </div>
  )
}

export default ServiceDetails