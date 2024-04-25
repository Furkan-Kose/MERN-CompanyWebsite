import { addService } from '../../api/serviceApi'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminAddService = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

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
    

    const onSubmit: SubmitHandler<any> = async (data, e: any) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("desc", data.desc);
        if(data.img && data.img[0]) {
            formData.append("img", data.img[0]);
        }
        e.preventDefault()
        try {
            await addService(formData)
            toast.success('Faaliyet alanı başarıyla eklendi', toastOptions)
            console.log(data) 
            navigate('/admin/faaliyet-alanları')
        } catch (error) {
            toast.error('Faaliyet alanı eklenirken bir hata oluştu', toastOptions)
            console.log(error)
            console.log(data)
        }
    }

  return (
    <div className='p-12 w-full'>
         <h2 className="text-center text-white text-3xl mb-12 pb-2 border-b border-slate-600 font-semibold">Faaliyet Alanı Ekle</h2>
         <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2 w-1/2'>
                <label htmlFor="name">Faaliyet Alanı Adı:</label>
                <input 
                className="p-4 mb-6 rounded-md bg-slate-900 text-white border-2 border-slate-500 outline-teal-500 outline-1" 
                type="text" 
                placeholder="Faaliyet Alanı Adı" 
                {...register("name", { required: true })}
                />
            </div>
            <div className='flex flex-col gap-2 w-1/2'>
                <label htmlFor="desc">Faaliyet Alanı Açıklaması:</label>
                <textarea 
                    className="p-4 mb-6 rounded-md bg-slate-900 text-white border-2 border-slate-500 outline-teal-500 outline-1" 
                    placeholder="Faaliyet Alanı Açıklaması" 
                    {...register("desc", { required: true })}
                />
            </div>
            <div className='flex flex-col gap-2 w-1/2'>
                <label htmlFor="img">Faaliyet Alanı Resmi:</label>
                <input 
                className="p-4 mb-6 rounded-md bg-slate-900 text-gray-300 border-2 border-slate-500 outline-teal-500 outline-1" 
                type="file" 
                placeholder="Resim" 
                {...register("img")}
                />
            </div>
            <button 
              className="w-1/2 p-4 bg-teal-500 rounded-md text-white border-2 border-teal-300 mt-8" 
              type="submit"
            >
                Ekle
            </button>
        </form>
    </div>
  )
}

export default AdminAddService