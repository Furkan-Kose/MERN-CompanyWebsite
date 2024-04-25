import React, {useRef, useEffect, useState} from 'react'
import { IoLocation } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion, useInView } from 'framer-motion';
import Loading from './Loading';
import { useContactInfo } from '../api/contactApi';
import { toast } from 'react-toastify';
import { z, ZodError } from 'zod';
import emailjs from '@emailjs/browser';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
    name: string,
    email: string,
    phone: string,
    message: string
}

const Contact = () => {

    const { data: contactInfo, isLoading, isError } = useContactInfo()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const form = useRef(null)

    const leftRef = useRef(null)
    const leftIsInView = useInView(leftRef, { margin: "-100px", once: true})

    const rightRef = useRef(null)
    const rightIsInView = useInView(rightRef, { margin: "-100px", once: true})


    const sendEmail = async (data: any ) => {
        try {
          await emailjs.send('service_2hgr45d', 'template_nikxrda', data, 'DQwMtBf01K2q4-rYx');
    
          console.log('SUCCESS!');
          toast.success('Mesajınız başarıyla gönderildi!');
          reset();
        } catch (error) {
          console.error('E-posta gönderme hatası:', error);
          toast.error('Mesajınız gönderilemedi! Lütfen daha sonra tekrar deneyin.');
        }
      };


  return (
    <div className='flex flex-col md:flex-row'>

        {/* Contact Info  */}
        <motion.div 
            initial={{ opacity: 0, x: -100}}
            animate={ leftIsInView ? { opacity: 1, x: 0 }: {}} 
            transition={{ duration: 0.5 }}
            className='bg-slate-100 w-full md:w-1/2 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-16 lg:py-32' ref={leftRef}>
            <h2 className='text-3xl font-bold text-center border-b border-black pb-4 mb-8'>Bize Ulaşın</h2>
            {contactInfo?.map((contact: any) => (
                <div key={contact._id}>
                    <p>{contact.desc}</p>

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
                </div>
            ))}

        </motion.div>


        {/* Contact Form  */}
        <motion.div 
            initial={{ opacity: 0, x: 100}}
            animate={ rightIsInView ? { opacity: 1, x: 0 }: {}}
            transition={{ duration: 0.5 }}
            className='bg-slate-900 w-full md:w-1/2 px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 py-16 lg:py-32' ref={rightRef}>
            <h2 className='text-3xl font-bold text-center text-white border-b border-white pb-4'>İletişim Formu</h2>
            <form ref={form} onSubmit={handleSubmit(sendEmail)} className='flex flex-col gap-4 mt-8'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='name' className='text-white'>Ad Soyad:</label>
                    <input 
                        type='text' 
                        id='name' 
                        {...register('name', { required: true, minLength: 2, maxLength: 75})}
                        className='p-2 rounded-lg bg-slate-700 text-white'
                    />
                    {errors.name && <p className='text-red-500 text-sm'>Ad en az 2 karakter olmalıdır.</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='email' className='text-white'>E-Posta:</label>
                    <input 
                        type='email' 
                        id='email' 
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i, maxLength: 75, minLength: 5})}
                        className='p-2 rounded-lg bg-slate-700 text-white' 
                    />
                    {errors.email && <p className='text-red-500 text-sm'>Geçerli bir e-posta adresi giriniz.</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='phone' className='text-white'>Telefon:</label>
                    <input 
                        type='tel' 
                        id='phone' 
                        {...register('phone', { required: true, minLength: 10, maxLength: 15, pattern: /^[0-9]+$/i})}
                        className='p-2 rounded-lg bg-slate-700 text-white'
                    />
                    {errors.phone && <p className='text-red-500 text-sm'>
                        Telefon numarası en az 10 karakter olmalıdır ve sadece rakam içermelidir.</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='message' className='text-white'>Mesajınız:</label>
                    <textarea 
                        id='message' 
                        {...register('message', { required: true, minLength: 10, maxLength: 1000})}
                        className='p-2 rounded-lg bg-slate-700 text-white'
                    ></textarea>
                    {errors.message && <p className='text-red-500 text-sm'>Mesaj en az 10 karakter olmalıdır.</p>}
                </div>
                <button type='submit' className='bg-blue-400 bg-opacity-90 text-white font-semibold py-2 rounded-lg hover:bg-slate-200 hover:text-blue-500 mt-4'>Gönder</button>
            </form>
        </motion.div>


    </div>
  )
}

export default Contact