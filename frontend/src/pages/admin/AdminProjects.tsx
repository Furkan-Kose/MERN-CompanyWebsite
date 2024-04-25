import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useProjects, useDeleteProject } from '../../api/projectApi'
import { Project } from '../../types'
import { apiURL } from '../../constants'


const AdminProjects = () => {

    const { data: projects, isLoading, isError } = useProjects()
    const { mutateAsync: deleteProject } = useDeleteProject()

    const toastOptions = {
        position: 'bottom-right' as 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      };

    const handleDelete = async (slug: string) => {
        try {
            await deleteProject(slug)
            toast.success('Proje başarıyla silindi', toastOptions)
        } catch (error) {   
            console.log(error)
            toast.error('Proje silinirken bir hata oluştu', toastOptions)
        }
    }


  return (
    <div className=' w-full p-16'>
        <div className="flex justify-between items-center border-b border-slate-600 pb-2 mb-4">
            <h1 className="text-white text-2xl font-bold">Projeler</h1>
            <Link to="/admin/projeler/ekle">
                <button className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-lg">
                    Proje Ekle
                </button>
            </Link>
        </div>

        <table className="w-full border-collapse space-y-12">
            <thead>
                <tr>
                    <th className="text-left text-white py-2">Proje Adı</th>
                    <th className="text-left text-white py-2">Yapım Yılı</th>
                    <th className="text-left text-white py-2">Lokasyon</th>
                    <th className="text-left text-white py-2">İşlemler</th>
                </tr>
            </thead>
            <tbody>
            {projects?.map((project: Project) => (
                <tr key={project._id} className="text-white font-light border border-slate-500">
                    <td className="p-4">
                        <div className="flex items-center gap-4">
                            <img src={`${apiURL}${project.img}`} alt={project.name} width={64} height={64} className="object-cover"/>
                            {project.name}
                        </div>
                    </td>
                    <td className="py-4">{project.year}</td>
                    <td className="py-4">{project.location}</td>
                    <td className="py-4">
                        <div className="flex gap-4">
                            <Link to={`/admin/projeler/${project.slug}`}>
                                <button className="py-1 px-3 rounded-md bg-green-500 text-xs font-medium">Güncelle</button>
                            </Link>
                            <button 
                                className="py-1 px-3 rounded-md bg-red-500 text-xs font-medium"
                                onClick={() => handleDelete(project.slug)}
                            >
                                Sil
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>

    </div>
  )
}

export default AdminProjects