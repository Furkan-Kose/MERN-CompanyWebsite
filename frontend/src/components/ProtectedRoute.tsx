import React, {PropsWithChildren, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

type ProtectedRouteProps = PropsWithChildren

const ProtectedRoute = ({children}: ProtectedRouteProps) => {

    const user = sessionStorage.getItem('token')

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/admin/login', {replace: true})
        }
    }, [user, navigate])

  return children
}

export default ProtectedRoute