import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import { updateReference, getReference } from '../../api/referenceApi'
import { apiURL } from '../../constants'


const AdminUpdateReference = () => {

    const [reference, setReference] = useState<any>({})
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
    
    const { id }: any = useParams()
    
    useEffect(() => {
        getReference(id).then((data) => {
            setReference(data)
            setIsLoading(false)
        }).catch(() => {
            setIsError(true)
            setIsLoading(false)
        })
    }, [id])
    

    const onSubmit: SubmitHandler<any> = async (data, e: any) => {
        e.preventDefault()
        try {

            const formData = new FormData();
            formData.append('img', data.img[0] || reference?.img);
            await updateReference(id, formData)
            toast.success('Referans başarıyla güncellendi', toastOptions)
            navigate('/admin/referanslar')
        } catch (error) {
            toast.error('Referans güncellenirken bir hata oluştu', toastOptions)
            console.log(error)
        }
    }

  return (
    <div className='p-12 w-full flex gap-12 mb-5'>
        <div className='w-1/4 p-5 rounded-lg font-bold'>
            <div className='w-full relative rounded-lg overflow-hidden mb-6'>
                <img src={`${apiURL}${reference?.img}`} alt={reference?.name} />
            </div>
            <p>{reference?.name}</p>
        </div>
        <div className='w-3/4 p-4 rounded-lg'>
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='img' className='text-sm'>Referans Resmi:</label>
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

export default AdminUpdateReference