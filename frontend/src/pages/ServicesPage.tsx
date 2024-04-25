import Services from '../components/Services'
import { Helmet } from 'react-helmet'

const ServicesPage = () => {
  return (
    <div className='py-16 mt-20 md:mt-[5.5rem]'>
        <Helmet>
          <title>Faaliyet Alanlarımız - Ege İz Yapı</title>
          <meta name="description" content="Şirketinizin faaliyet alanları hakkında bilgi alın." />
        </Helmet>
        <Services />
    </div>
  )
}

export default ServicesPage