import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProject } from '../../api/projectApi'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import { updateProject } from '../../api/projectApi'
import { apiURL } from '../../constants'


const AdminUpdateProject = () => {

    const [project, setProject] = useState<any>({})
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
        getProject(slug).then((data) => {
            setProject(data)
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
            formData.append('name', data.name || project?.name);
            formData.append('employer', data.employer || project?.employer);
            formData.append('location', data.location || project?.location);
            formData.append('type', data.type || project?.type);
            formData.append('year', data.year || project?.year);
            formData.append('time', data.time || project?.time);
            formData.append('img', data.img[0] || project?.img);
            await updateProject(slug, formData)
            toast.success('Proje başarıyla güncellendi', toastOptions)
            navigate('/admin/projeler')
        } catch (error) {
            toast.error('Proje güncellenirken bir hata oluştu', toastOptions)
            console.log(error)
        }
    }

  return (
    <div className='p-12 w-full flex gap-12 mb-5'>
        <div className='w-1/4 p-5 rounded-lg font-bold'>
            <div className='w-full relative rounded-lg overflow-hidden mb-6'>
                <img src={`${apiURL}${project.img}`} alt={project?.name} />
            </div>
            <p>{project?.name} - {project?.year}</p>
        </div>
        <div className='w-3/4 p-4 rounded-lg'>
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <label className='text-sm'>Proje Adı:</label>
                <input 
                    className='p-4 border-2 border-slate-500 rounded-md bg-slate-900 text-white mt-2 mb-4 outline-teal-500 outline-1' 
                    type="text" 
                    placeholder={project?.name}
                    {...register("name")}
                />
                <label className='text-sm'>İşveren:</label>
                <input 
                    className='p-4 border-2 border-slate-500 rounded-md bg-slate-900 text-white mt-2 mb-4 outline-teal-500 outline-1' 
                    type="text" 
                    placeholder={project?.employer}
                    {...register("employer")}
                />
                <label className='text-sm'>Lokasyon:</label>
                <input 
                    className='p-4 border-2 border-slate-500 rounded-md bg-slate-900 text-white mt-2 mb-4 outline-teal-500 outline-1' 
                    type="text" 
                    placeholder={project?.location}
                    {...register("location")}
                />
                <label className='text-sm'>Faaliyet Türü:</label>
                <input 
                    className='p-4 border-2 border-slate-500 rounded-md bg-slate-900 text-white mt-2 mb-4 outline-teal-500 outline-1' 
                    type="text" 
                    placeholder={project?.type}
                    {...register("type")}
                />
                <label className='text-sm'>Yapım Yılı:</label>
                <input 
                    className='p-4 border-2 border-slate-500 rounded-md bg-slate-900 text-white mt-2 mb-4 outline-teal-500 outline-1' 
                    type="text" 
                    placeholder={project?.year}
                    {...register("year")}
                />
                <label className='text-sm'>Yapım Süresi:</label>
                <input 
                    className='p-4 border-2 border-slate-500 rounded-md bg-slate-900 text-white mt-2 mb-4 outline-teal-500 outline-1' 
                    type="text" 
                    placeholder={project?.time}
                    {...register("time")}
                />
                <label htmlFor='img' className='text-sm'>Proje Resmi:</label>
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

export default AdminUpdateProject