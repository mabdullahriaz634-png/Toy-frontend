
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { API, setToken } from "../Api";
import { AuthContext } from "../Context/authContext";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import Login_Loader from "./loginLoader";

export default function Login() {
    const { setCurrentUser } = useContext(AuthContext)
    // console.log("current User", currentUser);
    const [login, setlogin] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        if (login.email == '' && login.password == '') {
            toast.info("Plz Enter your Credientials")
        } else {
            try {
                setLoading(true)
                const res = await API.post(`/auth/login`, login)
                setCurrentUser(res.data.user)
                console.log(res.data);
                localStorage.setItem('token', res.data.token)
                navigate('/profile')
                toast.success(res.data.msg)
            } catch (error) {
                toast.error(error.response.data.msg)
                console.log(error);
            }
            finally {
                setLoading(false)
            }

        }
    }
    useEffect(() => {
        // console.log(login);
    }, [login])

    return (
        <>
            {/* Responsive code from gpt */}
            <div className="min-h-screen flex justify-center items-center px-4 ">
                <div className="w-full max-w-md sm:max-w-lg shadow-2xl  rounded-md  bg-[#f5eded] ">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full py-6 px-4 sm:px-6 rounded-lg border-2 border-white flex flex-col gap-4">

                        <input
                            type="text"
                            name="email"
                            value={login.email}
                            onChange={(e) =>
                                setlogin({ ...login, [e.target.name]: e.target.value })
                            }
                            placeholder="Enter your email"
                            className="h-[45px] sm:h-[50px] w-full pl-3 bg-transparent outline outline-blue-400 rounded-md text-blue-600"
                        />

                        <input
                            type="password" name="password" value={login.password}
                            onChange={(e) =>
                                setlogin({ ...login, [e.target.name]: e.target.value })
                            }
                            placeholder="Enter your password"
                            className="h-[45px] sm:h-[50px] w-full pl-3 bg-transparent outline outline-blue-400 rounded-md text-blue-600"
                        />

                        <button className="h-[45px] sm:h-[50px] flex items-center justify-center
                        w-full bg-blue-500 hover:bg-blue-400 text-white text-lg sm:text-2xl font-semibold rounded-lg cursor-pointer">
                            {loading ? (<span className="h-[40px] w-full sm:h-[38px]">
                                <Login_Loader />
                            </span>) : 'Login'}
                        </button>

                        <h1 className="text-sm sm:text-lg text-green-400 text-center">
                            Don't have account?  &nbsp;
                            <Link to={"/signup"}>
                                <span className="text-blue-500 cursor-pointer hover:text-red-400">
                                    Sign up
                                </span>
                            </Link> <br />
                            
                            <Link to={"/forgotPassword"}>
                                <span className="text-left">
                                    Forgot password
                                </span>
                            </Link>
                        </h1>

                    </form>
                </div>
            </div>
        </>
    )
}