import { useForm } from 'react-hook-form'
import { useContactInfo, useUpdateContactInfo } from '../../api/contactApi'
import { IoLocation } from "react-icons/io5";
import { MdEmail, MdDescription } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Contact } from '../../types';



const AdminContact = () => {

    const { register, handleSubmit, reset } = useForm()

    const { data: contactInfo, isLoading, isError } = useContactInfo()
    const { mutateAsync: updateContactInfo } = useUpdateContactInfo()

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

    const onSubmit = async (data: any) => {
        try {
            const updateData = {
                desc: data.desc || (contactInfo[0] as Contact).desc,
                address: data.address || (contactInfo[0] as Contact).address,
                phone: data.phone || (contactInfo[0] as Contact).phone,
                email: data.email || (contactInfo[0] as Contact).email,
                facebook: data.facebook || (contactInfo[0] as Contact).facebook,
                instagram: data.instagram || (contactInfo[0] as Contact).instagram,
                linkedin: data.linkedin || (contactInfo[0] as Contact).linkedin,
            }
            await updateContactInfo(updateData)
            toast.success('İletişim bilgileri başarıyla güncellendi', toastOptions)
        } catch (error) {
            console.error('İletişim bilgileri güncellenirken bir hata oluştu:', error);
            toast.error('İletişim bilgileri güncellenirken bir hata oluştu', toastOptions)
        }
    }

  return (
    <div className='w-full p-16'>
        <div className="flex items-center border-b border-slate-600 pb-2 mb-4">
            <h1 className="text-white text-2xl font-bold">İletişim</h1>
        </div>
        <div className='flex gap-4 justify-between'>

            <div className='w-[30%]'>
                {contactInfo?.map((contact: Contact) => (
                    <div key={contact._id} className=''>
  
                        <div className='flex gap-2 mt-8'>
                            <MdDescription className='mt-2 text-xl' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-lg font-semibold'>Açıklama:</h3>
                                <p className=''>{contact.desc}</p>
                            </div>
                        </div>

                        <div className='flex gap-2 mt-8'>
                            <IoLocation className='mt-2 text-xl' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-lg font-semibold'>Adres:</h3>
                                <p>{contact.address}</p>
                            </div>
                        </div>

                        <div className='flex gap-2 mt-8'>
                            <MdEmail className='mt-2 text-xl' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-lg font-semibold'>E-Posta:</h3>
                                <p>{contact.email}</p>
                            </div>
                        </div>

                        <div className='flex gap-2 my-8'>
                            <BsTelephoneFill className='mt-2 text-xl' />
                            <div className='flex flex-col gap-1'>
                                <h3 className='text-lg font-semibold'>Telefon:</h3>
                                <p>{contact.phone}</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <div className='flex gap-2'>
                                <FaFacebook className='text-2xl ' />
                                <p>{contact.facebook}</p>
                            </div>
                            <div className='flex gap-2'>
                                <FaInstagram className='text-2xl ' />
                                <p>{contact.instagram}</p>
                            </div>
                            <div className='flex gap-2'>
                                <FaLinkedin className='text-2xl ' />
                                <p>{contact.linkedin}</p>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-[60%]'>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="desc">Açıklama</label>
                    <textarea id="desc" rows={3} {...register('desc')} className='p-3 rounded-md bg-slate-900 text-white border-2 border-slate-500' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="address">Adres</label>
                    <textarea id="address" rows={3} {...register('address')} className='p-3 rounded-md bg-slate-900 text-white border-2 border-slate-500' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="phone">Telefon</label>
                    <input type="text" id="phone" {...register('phone')} className='p-3 rounded-md bg-slate-900 text-white border-2 border-slate-500' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email">E-posta</label>
                    <input type="text" id="email" {...register('email')} className='p-3 rounded-md bg-slate-900 text-white border-2 border-slate-500' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="facebook">Facebook</label>
                    <input type="text" id="facebook" {...register('facebook')} className='p-3 rounded-md bg-slate-900 text-white border-2 border-slate-500' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="instagram">Instagram</label>
                    <input type="text" id="instagram" {...register('instagram')} className='p-3 rounded-md bg-slate-900 text-white border-2 border-slate-500' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="linkedin">Linkedin</label>
                    <input type="text" id="linkedin" {...register('linkedin')} className='p-3 rounded-md bg-slate-900 text-white border-2 border-slate-500' />
                </div>
                
                <button type="submit" className='bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg mt-3'>
                    Kaydet
                </button>
            </form>

        </div>

    </div>
  )
}

export default AdminContact