import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white py-16'>

        <div className='px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32 flex flex-col md:flex-row gap-16 md:gap-20'>
            
            <div className='md:w-1/3 flex flex-col gap-8'>
                <img src="https://egeizyapi.com/images/logo-footer.png" alt="" className='w-1/2' />
                <p>Sizin için her zaman en iyisini ve en kalitesini sunmaya hazırız.</p>
                <div className='flex gap-4'>
                    <FaFacebook className='text-2xl ' />
                    <FaInstagram className='text-2xl ' />
                    <FaLinkedin className='text-2xl ' />
                </div>
            </div>

            <div className='flex flex-col md:w-1/3'>
                <h2 className='text-2xl font-bold'>Bize Ulaşın</h2>
                <div className='flex gap-2 mt-6'>
                    <IoLocation className='mt-2 text-xl' />
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-lg font-semibold'>Adres:</h3>
                        <p>Mimar Sinan Mah. Bosna Cad. Gün Plaza No: 12/6 Çekmeköy / İstanbul</p>
                    </div>
                </div>

                <div className='flex gap-2 mt-4'>
                    <MdEmail className='mt-2 text-xl' />
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-lg font-semibold'>E-Posta:</h3>
                        <p>info@egeizyapi.com</p>
                    </div>
                </div>

                <div className='flex gap-2 mt-4'>
                    <BsTelephoneFill className='mt-2 text-xl' />
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-lg font-semibold'>Telefon:</h3>
                        <p>+90 216 629 98 32</p>
                    </div>
                </div>

            </div>

            <div className='md:w-1/3 flex flex-col gap-8'>
                <h2 className='text-2xl font-bold'>Önemli Linkler</h2>
                <ul className='flex flex-col gap-4'>
                    <Link to="/projeler">
                        <li>Projelerimiz</li>
                    </Link>
                    <Link to="/referanslar">
                        <li>Referanslarımız</li>
                    </Link>
                    <Link to="/hakkımızda">
                        <li>Hakkımızda</li>
                    </Link>
                    <Link to="/iletişim">
                        <li>İletişim</li>
                    </Link>
                </ul>
            </div>

        </div>

    </div>
  )
}

export default Footer