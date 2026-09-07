
import { Children, createContext, useContext, useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { authAPI } from "../Api";
import { useBeforeUnload, useNavigate } from "react-router-dom";
export const AuthContext = createContext()


export default function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);
    // console.log("currentUserToken",currentUser);
    const navigate = useNavigate()
    
    // console.log(currentUser);
    

    function currentUserlogout() {
        localStorage.removeItem("token")
        setCurrentUser(null)
        navigate('/')
    }
   
    // currentUserlogout()

    useEffect(() => {
        async function currentLogin() {
            try {
                setLoading(true)
                const res = await authAPI.get("/auth/profile")
                setCurrentUser(res.data.user)
                // console.log("authContext", res.data.user.email);
            } catch (error) {
                console.error(error.message)
            }
            finally{
                setLoading(false)
            }
        }
        currentLogin()
    }, [])


    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser,currentUserlogout , loading}}>
            {children}
        </AuthContext.Provider>
    )
}