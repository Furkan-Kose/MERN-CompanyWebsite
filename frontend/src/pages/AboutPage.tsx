import React from 'react'
import { motion } from 'framer-motion'
import References from '../components/Referances'
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useContactInfo } from '../api/contactApi';
import { useAboutInfo } from '../api/aboutApi';
import Loading from '../components/Loading'

import { Helmet } from 'react-helmet';
import { apiURL } from '../constants';


const AboutPage = () => {

  const { data: contactInfo } = useContactInfo()

  const { data: aboutInfo, isLoading, isError } = useAboutInfo()


  return (
    <div className='mt-20 md:mt-[5.5rem] py-16 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col gap-10 bg-black bg-opacity-50'>

    <Helmet>
      <title>Hakkımızda - Ege İz Yapı</title>
      <meta name='description' content='Ege İz Yapı Hakkında - Faaliyetlerimiz, Referanslarımız ve İletişim Bilgilerimiz.' />
    </Helmet>

      <motion.h2 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className='text-center text-white text-3xl font-bold border-b border-white pb-4'
      >
        Hakkımızda
      </motion.h2>
      {isLoading && (
        <div className='p-16 mb-8 m-auto'>
          <Loading />
        </div>
      )}
      {aboutInfo?.map((about: any) => (
        <div key={about._id} className='flex flex-col md:flex-row gap-8 md:gap-16'>
          <motion.div 
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full md:w-1/2'
          >
            <img src={`${apiURL}${about.img}`} alt="about" className='w-full' />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full md:w-1/2 py-4'
          >
            <p className='text-white whitespace-pre-line'>{about.desc}</p>
          </motion.div>
        </div>
      ))}

      <div className='pb-16'>
        <References />
      </div>

      <div className='pb-16 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32'>
        <motion.h2 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className='text-center text-white text-3xl font-bold border-b border-white pb-4'
        >
          İletişim
        </motion.h2>
        {contactInfo?.map((contact: any) => (
                <motion.div 
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  key={contact._id} 
                  className='text-white'
                >

                    <div className='flex gap-2 mt-8'>
                        <IoLocation className='mt-2 text-xl' />
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-lg font-semibold'>Adres:</h3>
                            <p>{contact.address}</p>
                        </div>
                    </div>

                    <div className='flex gap-2 mt-8'>
                        <MdEmail className='mt-2 text-xl' />
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-lg font-semibold'>E-Posta:</h3>
                            <p>{contact.email}</p>
                        </div>
                    </div>

                    <div className='flex gap-2 my-8'>
                        <BsTelephoneFill className='mt-2 text-xl' />
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-lg font-semibold'>Telefon:</h3>
                            <p>{contact.phone}</p>
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <FaFacebook className='text-2xl ' />
                        <FaInstagram className='text-2xl ' />
                        <FaLinkedin className='text-2xl ' />
                    </div>
                </motion.div>
            ))}
      </div>

    </div>
  )
}

export default AboutPage