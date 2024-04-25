import { useAboutInfo, useUpdateAboutInfo } from '../../api/aboutApi'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { apiURL } from '../../constants'


const AdminAbout = () => {

    const { register, handleSubmit, reset } = useForm()

    const { data: aboutInfo, isLoading, isError } = useAboutInfo()
    const { mutateAsync: updateAboutInfo } = useUpdateAboutInfo()

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

    const onSubmit = async (data: any, e: any) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append('img', data.img[0] || aboutInfo[0].img);
            formData.append('desc', data.desc || aboutInfo[0].desc);
            await updateAboutInfo(formData)
            toast.success('Hakkımızda başarıyla güncellendi', toastOptions)
            reset()
        } catch (error) {
            console.error('Hakkımızda bilgileri güncellenirken bir hata oluştu:', error);
        }
    }

  return (
    <div className='w-full p-16'>
        <div className="flex items-center border-b border-slate-600 pb-2 mb-4">
            <h1 className="text-white text-2xl font-bold">Hakkımızda</h1>
        </div>
        <div className='flex gap-4 justify-between'>

            <div className='w-[30%]'>
                {aboutInfo?.map((about: any) => (
                    <div key={about._id} className='flex flex-col gap-8'>
                        <img src={`${apiURL}${about.img}`} alt={about.desc} />
                        <p className='whitespace-pre-line'>{about.desc}</p>
                    </div>
                ))}
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-[60%]'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="img" className='text-white'>Resim</label>
                    <input type="file" id="img" {...register("img")} className='p-3 rounded-md bg-slate-900 text-white border-2 border-slate-500' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="desc" className='text-white'>Açıklama</label>
                    <textarea id="desc" rows={12} className='p-3 rounded-md bg-slate-900 text-white border-2 border-slate-500' {...register("desc")}  />
                </div>
                <button type="submit" className='bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg mt-3'>
                    Kaydet
                </button>
            </form>

        </div>
    </div>
  )
}

export default AdminAbout