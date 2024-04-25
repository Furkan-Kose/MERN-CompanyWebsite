import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import { updateService, getService } from '../../api/serviceApi'
import { apiURL } from '../../constants'


const AdminUpdateService = () => {

    const [service, setService] = useState<any>({})
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const navigate = useNavigate()
    
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
    
    const { slug }: any = useParams()
    
    useEffect(() => {
        getService(slug).then((data) => {
            setService(data)
            setIsLoading(false)
        }).catch(() => {
            setIsError(true)
            setIsLoading(false)
        })
    }, [slug])
    

    const onSubmit: SubmitHandler<any> = async (data, e: any) => {
        e.preventDefault()
        try {

            const formData = new FormData();
            formData.append('name', data.name || service?.name);
            formData.append('desc', data.desc || service?.desc);
            formData.append('img', data.img[0] || service?.img);
            await updateService(slug, formData)
            toast.success('Faaliyet alanı başarıyla güncellendi', toastOptions)
            navigate('/admin/faaliyet-alanları')
        } catch (error) {
            toast.error('Faaliyet alanı güncellenirken bir hata oluştu', toastOptions)
            console.log(error)
        }
    }

  return (
    <div className='p-12 w-full flex gap-12 mb-5'>
        <div className='w-1/4 p-5 rounded-lg font-bold'>
            <div className='w-full relative rounded-lg overflow-hidden mb-6'>
                <img src={`${apiURL}${service.img}`} alt={service?.name} />
            </div>
            <p>{service?.name}</p>
        </div>
        <div className='w-3/4 p-4 rounded-lg'>
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <label className='text-sm'>Faaliyet Alanı Adı:</label>
                <input 
                    className='p-4 border-2 border-slate-500 rounded-md bg-slate-900 text-white mt-2 mb-4 outline-teal-500 outline-1' 
                    type="text" 
                    placeholder={service?.name}
                    {...register("name")}
                />
                <label className='text-sm'>Faaliyet Alanı Açıklaması:</label>
                <textarea 
                    className='p-4 border-2 border-slate-500 rounded-md bg-slate-900 text-white mt-2 mb-4 outline-teal-500 outline-1' 
                    placeholder={service?.desc}
                    rows={12}
                    {...register("desc")}
                />
                <label htmlFor='img' className='text-sm'>Faaliyet Alanı Resmi:</label>
                <input 
                    className='p-4 border-2 border-slate-500 rounded-md bg-slate-900 text-gray-300 mt-2 mb-4 outline-teal-500 outline-1' 
                    type="file" 
                    {...register("img")}
                />
                <button 
                    className='w-full p-4 bg-teal-500 text-white rounded-md mt-5 border-2 border-teal-300'
                    type="submit"
                >   
                    Güncelle
                </button>
            </form>
        </div>
    </div>
  )
}

export default AdminUpdateService