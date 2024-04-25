import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax } from 'swiper/modules';
import { useProjects } from '../api/projectApi';
import { Project } from '../types';

import Loading from './Loading';

import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { apiURL } from '../constants';


const Slider = () => {

    const { data: projects, isLoading, isError } = useProjects()

    if (isLoading) {
        return (
            <div className='w-full h-full m-auto'>
                <Loading />
            </div>
        )
    }

    if(isError) {
        return (
            <div className='text-center text-white font-bold text-3xl border-b border-white pb-4'>Bir hata oluştu</div>
        )
    }


  return (
    <Swiper 
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax]}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        parallax={true}
        speed={2000}
        loop={true}
        className='h-[30rem] sm:h-[35rem] md:h-full w-full mt-20 md:mt-0'
    >
        {projects.map((project: Project) => (
            <SwiperSlide key={project._id}>
                <div className='relative h-full w-full'>
                    <img src={`${apiURL}${project.img}`} alt={project.name} className='h-full w-full' />
                    <div className='absolute top-0 left-0 h-full w-full bg-black opacity-50'></div>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center flex flex-col gap-6 md:gap-8 items-center justify-center'>
                        <h1 className='font-bold text-3xl sm:text-5xl md:text-6xl'>EGE İZ YAPI</h1>
                        <div className='flex gap-4'>
                            
                            <p className='text-base sm:text-xl md:text-2xl'>Sizin için her zaman en iyisini ve en kalitesini sunmaya hazırız.</p>
                        </div>
                        <div className='flex gap-2 md:gap-4'>
                        <Link to='/projeler' className='text-sm sm:text-lg md:text-xl bg-blue-400 bg-opacity-90 px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg hover:bg-slate-200 hover:text-blue-500 flex items-center justify-center'>Projelerimiz</Link>
                        <Link to='/iletisim' className='text-sm sm:text-lg md:text-xl bg-blue-400 bg-opacity-90 px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg hover:bg-slate-200 hover:text-blue-500 flex items-center justify-center'>Bize Ulaşın</Link>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default Slider