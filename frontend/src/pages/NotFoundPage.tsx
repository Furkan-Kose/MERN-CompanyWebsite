import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-800 text-white h-screen gap-8">
        <h1 className="text-3xl font-bold">404 - Not Found</h1>
        <Link className="text-xl font-semibold bg-blue-400 px-4 py-2 rounded-lg" to="/">Ana Sayfaya Dön</Link>
    </div>
  )
}

export default NotFoundPage