import React from 'react'
import Contact from '../components/Contact'
import { Helmet } from 'react-helmet'

const ContactPage = () => {
  return (
    <div className=' mt-20 md:mt-[5.5rem]'>
        <Helmet>
          <title>İletişim - Ege İz Yapı</title>
          <meta name="description" content="Ege İz Yapı ile iletişime geçmek için bilgiler." />
        </Helmet>
        <Contact />
    </div>
  )
}

export default ContactPage