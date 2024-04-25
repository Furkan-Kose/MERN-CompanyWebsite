import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useReferences, useDeleteReference } from '../../api/referenceApi'
import { Reference } from '../../types'
import { apiURL } from '../../constants'


const AdminReferences = () => {

    const { data: references, isLoading, isError } = useReferences()

    const {mutateAsync: deleteReference} = useDeleteReference()

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

    const handleDelete = async (id: string) => {
        try {
            await deleteReference(id)
            toast.success('Referans başarıyla silindi', toastOptions)
        } catch (error) {   
            console.log(error)
            toast.error('Referans silinirken bir hata oluştu', toastOptions)
        }
    }


  return (
    <div className=' w-full p-16'>
        <div className="flex justify-between items-center border-b border-slate-600 pb-2 mb-4">
            <h1 className="text-white text-2xl font-bold">Referanslar</h1>
            <Link to="/admin/referanslar/ekle">
                <button className="bg-blue-500 text-white font-semibold px-3 py-1 rounded-lg">
                    Referans Ekle
                </button>
            </Link>
        </div>

        <table className="w-full border-collapse space-y-12">
            <thead>
                <tr>
                    <th className="text-left text-white py-2">Referans Resmi</th>
                    <th className="text-left text-white py-2">İşlemler</th>
                </tr>
            </thead>
            <tbody>
            {references?.map((reference: Reference) => (
                <tr key={reference._id} className="text-white font-light border border-slate-500">
                    <td className="p-4">
                        <div className="flex items-center gap-4">
                            <img src={`${apiURL}${reference.img}`} alt="referans" width={64} height={64} className="object-cover"/>
                        </div>
                    </td>
                    <td className="py-4">
                        <div className="flex gap-4">
                            <Link to={`/admin/referanslar/${reference._id}`}>
                                <button className="py-2 px-4 rounded-md bg-green-500 text-xs font-medium">Güncelle</button>
                            </Link>
                            <button 
                                className="py-2 px-4 rounded-md bg-red-500 text-xs font-medium"
                                onClick={() => handleDelete(reference._id)}
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

export default AdminReferences