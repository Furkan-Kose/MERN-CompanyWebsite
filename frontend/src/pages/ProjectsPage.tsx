import Projects from '../components/Projects'
import { Helmet } from 'react-helmet'

const ProjectsPage = () => {
  return (
    <div className='py-16 mt-20 md:mt-[5.5rem]'>
        <Helmet>
          <title>Projelerimiz - Ege İz Yapı</title>
          <meta name="description" content="İnşaat projelerimiz hakkında detaylı bilgileri burada bulabilirsiniz." />
        </Helmet>
        <Projects />
    </div>
  )
}

export default ProjectsPage