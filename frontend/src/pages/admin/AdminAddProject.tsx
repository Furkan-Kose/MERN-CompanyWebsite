import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useAddProject } from '../../api/projectApi'

const AdminAddProject = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const { mutateAsync: addProject } = useAddProject()

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
    

    const onSubmit: SubmitHandler<any> = async (data, e: any) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("employer", data.employer);
        formData.append("location", data.location);
        formData.append("type", data.type);
        formData.append("year", data.year);
        formData.append("time", data.time); 
        if(data.img && data.img[0]) {
            formData.append("img", data.img[0]);
        }
        e.preventDefault()
        try {
            await addProject(formData)
            toast.success('Proje başarıyla eklendi', toastOptions)
            console.log(data)
            navigate('/admin/projeler')
        } catch (error) {
            toast.error('Proje eklenirken bir hata oluştu', toastOptions)
            console.log(error)
            console.log(data)
        }
    }

  return (
    <div className='p-12 w-full'>
         <h2 className="text-center text-white text-3xl mb-6 pb-2 border-b border-slate-600 font-semibold">Proje Ekle</h2>
         <form className="flex flex-wrap justify-between" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2 w-[45%]'>
                <label htmlFor="name">Proje Adı:</label>
                <input 
                className="p-4 mb-6 rounded-md bg-slate-900 text-white border-2 border-slate-500 outline-teal-500 outline-1" 
                type="text" 
                placeholder="Proje Adı" 
                {...register("name", { required: true })}
                />
            </div>
            <div className='flex flex-col gap-2 justify-between w-[45%]'>
                <label htmlFor="year">İşveren:</label>
                <input 
                className="p-4 mb-6 rounded-md bg-slate-900 text-white border-2 border-slate-500 outline-teal-500 outline-1" 
                type="text" 
                placeholder="İşveren" 
                {...register("employer", { required: true })}
                />
            </div>
            <div className='flex flex-col gap-2 justify-between w-[45%]'>
                <label htmlFor="location">Lokasyon:</label>
                <input 
                className="p-4 mb-6 rounded-md bg-slate-900 text-white border-2 border-slate-500 outline-teal-500 outline-1" 
                type="text" 
                placeholder="Lokasyon" 
                {...register("location", { required: true })}
                />
            </div>
            <div className='flex flex-col gap-2 justify-between w-[45%]'>
                <label htmlFor="type">Faaliyet Türü:</label>
                <input 
                className="p-4 mb-6 rounded-md bg-slate-900 text-white border-2 border-slate-500 outline-teal-500 outline-1" 
                type="text" 
                placeholder="Faaliyet Türü" 
                {...register("type", { required: true })}
                />
            </div>
            <div className='flex flex-col gap-2 justify-between w-[45%]'>
                <label htmlFor="time">Yapım Yılı:</label>
                <input 
                className="p-4 mb-6 rounded-md bg-slate-900 text-white border-2 border-slate-500 outline-teal-500 outline-1" 
                type="number" 
                placeholder="Yapım Yılı" 
                {...register("year", { required: true })}
                />
            </div>
            <div className='flex flex-col gap-2 justify-between w-[45%]'>
                <label htmlFor="time">Yapım Süresi:</label>
                <input 
                className="p-4 mb-6 rounded-md bg-slate-900 text-white border-2 border-slate-500 outline-teal-500 outline-1" 
                type="text" 
                placeholder="Yapım Süresi" 
                {...register("time", { required: true })}
                />
            </div>
            <div className='flex flex-col gap-2 justify-between m-auto w-[45%]'>
                <label htmlFor="img">Proje Resmi:</label>
                <input 
                className="p-4 mb-6 rounded-md bg-slate-900 text-gray-300 border-2 border-slate-500 outline-teal-500 outline-1" 
                type="file" 
                placeholder="Resim" 
                {...register("img", {required: true})}
                />
            </div>
            <button 
              className="w-full p-4 bg-teal-500 rounded-md text-white border-2 border-teal-300 mt-8" 
              type="submit"
            >
                Ekle
            </button>
        </form>
    </div>
  )
}

export default AdminAddProject