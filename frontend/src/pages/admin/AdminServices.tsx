import { useServices, useDeleteService } from '../../api/serviceApi'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Service } from '../../types'
import { apiURL } from '../../constants'



const AdminServices = () => {

    const { data: services, isLoading, isError } = useServices()

    const {mutateAsync: deleteService} = useDeleteService()

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
            await deleteService(slug)
            toast.success('Faaliyet alanı başarıyla silindi', toastOptions)
        } catch (error) {   
            console.log(error)
            toast.error('Faaliyet alanı silinirken bir hata oluştu', toastOptions)
        }
    }


  return (
    <div className=' w-full p-16'>
        <div className="flex justify-between items-center border-b border-slate-600 pb-2 mb-4">
            <h1 className="text-white text-2xl font-bold">Faaliyet Alanları</h1>
            <Link to="/admin/faaliyet-alanları/ekle">
                <button className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-lg">
                    Faaliyet Alanı Ekle
                </button>
            </Link>
        </div>

        <table className="w-full border-collapse space-y-12">
            <thead>
                <tr>
                    <th className="text-left text-white py-2">Faaliyet Alanı Resmi</th>
                    <th className="text-left text-white py-2">Faaliyet Alanı Adı Adı</th>
                    <th className="text-left text-white py-2">İşlemler</th>
                </tr>
            </thead>
            <tbody>
            {services?.map((service: Service) => (
                <tr key={service._id} className="text-white font-light border border-slate-500">
                    <td className="p-4">
                        <img src={`${apiURL}${service.img}`} alt={service.name} width={64} height={64} className="object-cover"/>
                    </td>
                    <td className='py-4'>{service.name}</td>
                    <td className="py-4">
                        <div className="flex gap-4">
                            <Link to={`/admin/faaliyet-alanları/${service.slug}`}>
                                <button className="py-1 px-3 rounded-md bg-green-500 text-xs font-medium">Güncelle</button>
                            </Link>
                            <button 
                                className="py-1 px-3 rounded-md bg-red-500 text-xs font-medium"
                                onClick={() => handleDelete(service.slug)}
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

export default AdminServices