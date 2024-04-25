import React, {useRef, useState, useEffect} from 'react';
import { motion, useInView } from 'framer-motion'
import { getReferences } from '../api/referenceApi';
import Loading from './Loading';
import { useReferences } from '../api/referenceApi';
import { Reference } from '../types';
import { apiURL } from '../constants';


const References = () => {

    const { data: references, isLoading, isError } = useReferences()

    const titleRef = useRef(null)
    const titleIsInView = useInView(titleRef, { margin: "-100px", once: true})

    const cardRef = useRef(null)
    const cardIsInView = useInView(cardRef, { margin: "-100px", once: true})

  return (
    <div className='px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32' ref={titleRef}>
        <motion.h2 
            initial={{ scale: 0 }}
            animate={ titleIsInView ? { scale: 1 }: {}}
            transition={{ duration: 0.5 }}
            className='text-center font-bold text-3xl text-white pt-12 border-b border-white pb-4'>Referanslarımız</motion.h2>
        <div className='flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-8' ref={cardRef}>
            <>
            {isLoading &&
                <div className='p-16 mb-8'>
                    <Loading />
                </div>
            }
            {!isLoading && references.map((reference: Reference, index: any) => (
                <motion.div 
                    initial={{ opacity: 0, y: -30, x: -300 }}
                    animate={ cardIsInView ? { opacity: 1, y: 0, x:0 }: {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className='w-1/4 md:w-1/6 lg:w-[12%] rounded-lg overflow-hidden' key={index}>
                    <motion.img 
                        initial={{ scale: 0 }}
                        animate={ cardIsInView ? { scale: 1 }: {}}
                        transition={{ duration: 0.5, delay: index * 0.2}}
                        src={`${apiURL}${reference.img}`} alt={`reference-${index}`} className='object-cover' />
                </motion.div>
            ))}
            {isError && 
                <div className='p-16 mb-8'>
                    <p className='text-center text-white'>Bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
                </div>
            }
            {!isLoading && references.length === 0 && 
                <div className='p-16 mb-8'>
                    <p className='text-center text-white'>Henüz bir referans eklenmedi.</p>
                </div>
            }
            </>
        </div>
    </div> 
  );
};

export default References;
