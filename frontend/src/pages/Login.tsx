import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from 'react-toastify'
import { login } from '../api/userApi'
import { useNavigate } from 'react-router-dom'

const Login = () => {

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

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            const { username, password } = data;
            const user = await login(username, password);
            sessionStorage.setItem("token", user.token);
            toast.success('Giriş Başarılı', toastOptions);
            navigate('/admin')
        } catch (error) {
            toast.error('Giriş Yapılırken bir hata oluştu', toastOptions)
        }
    }

  return (
    <div className='bg-gradient-to-b from-slate-900 to-slate-800 h-screen flex items-center justify-center'>
        <div className='bg-slate-600 px-8 py-16 md:p-16 rounded-lg shadow-lg w-full md:w-[40%] text-white'>
            <h1 className='text-3xl font-semibold mb-8 text-center'>Giriş Yap</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
                <label htmlFor="username">Kullanıcı Adı:</label>
                <input 
                    type='text' 
                    placeholder='Kullanıcı Adı' 
                    {...register("username", { required: true })}
                    className='p-3 border border-gray-300 rounded-md bg-slate-900 mb-8' 
                />
                <label htmlFor="password">Şifre:</label>
                <input 
                    type='password' 
                    placeholder='Şifre' 
                    {...register("password", { required: true })}
                    className='p-3 border border-gray-300 rounded-md bg-slate-900 mb-8' 
                />
                <button type='submit' className='bg-blue-500 text-white p-3 rounded-md'>Giriş Yap</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Login