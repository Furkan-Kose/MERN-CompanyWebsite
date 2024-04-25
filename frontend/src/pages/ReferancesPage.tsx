import Referances from '../components/Referances'
import { Helmet } from 'react-helmet'

const ReferancesPage = () => {
  return (
    <div className='pt-4 pb-16 mt-20 md:mt-[5.5rem]'>
        <Helmet>
          <title>Referanslar - Ege İz Yapı</title>
          <meta name="description" content="Firma referansları ve başarıları." />
        </Helmet>
        <Referances />
    </div>
  )
}

export default ReferancesPage