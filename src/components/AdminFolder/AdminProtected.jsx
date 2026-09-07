import React, { useContext } from 'react'
import { AuthContext } from '../../Context/authContext'
import { Navigate } from 'react-router-dom'

export default function AdminProtected({ children, role }) {

   

    const { currentUser, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (currentUser == null) {
        return <Navigate to="/login" replace />
    }

    if (currentUser.role !== role) {
        return <Navigate to="/" replace />
    }

    return children
}