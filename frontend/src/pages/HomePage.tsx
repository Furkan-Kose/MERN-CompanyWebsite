import React from 'react'
import Slider from '../components/Slider'
import Services from '../components/Services'
import Referances from '../components/Referances'
import Projects from '../components/Projects'
import Contact from '../components/Contact'

import { Helmet } from 'react-helmet';

const HomePage = () => {
  return (
    <div className='h-full'>
      <Helmet>
        <title>Ana Sayfa - Ege İz Yapı</title>
        <meta
          name='description'
          content='Egeiz Yapı Şirketi olarak inşaat ve proje hizmetleri sunuyoruz. Projelerimizi inceleyin ve bizimle iletişime geçin.'
        />
      </Helmet>
      <section className='md:h-screen mb-16'>
        <Slider />
      </section>
      <section className='mb-16'>
        <Services />
      </section>
      <section className='mb-16'>
        <Projects />
      </section>
      <section className='bg-slate-800 pb-12'>
        <Referances />
      </section>
      <section className=''>
        <Contact />
      </section>
    </div>
  )
}

export default HomePage