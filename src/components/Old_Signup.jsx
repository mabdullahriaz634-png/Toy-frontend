// import { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import lamp from '../assets/lamp.jpg'
// import { API, setToken } from "../Api";
// import { toast } from "react-toastify";

// export default function Signup() {
//     const [signup, setSignup] = useState(
//         { name: '', email: '', password: '' })
//     const navigate = useNavigate()

//     async function handleSubmit(e) {
//         e.preventDefault()
//         if (signup.name == '' || signup.email == '' || signup.password == '') {
//             toast.info("Plz fill all details")
//             return
//         }
//         else {
//             try {
//                 const res = await API.post(`/auth/signup`, signup)
//                 console.log(res);
//                 toast.success(res.data.msg)
//                 if (!res.ok) return
//                 setSignup({ name: '', email: '', password: '' })
//                 navigate('/login')
//             } catch (error) {
//                 toast.error(error.response.data.msg)
//                 console.log(error);
//             }
//         }
//     }

//     useEffect(() => {
//         // console.log(signup);
//     }, [signup])


//     return (
//         <>
//             <div className="min-h-screen w-full  flex items-center justify-center px-4 py-6 border-2">
//                 <div className="w-full  max-w-[420px] sm:max-w-[480px] md:max-w-[520px] ">
//                     <form
//                         onSubmit={handleSubmit}
//                         className="w-full p-5 sm:p-8 rounded-2xl  
//                         border border-white/40 backdrop-blur-xl shadow-2xl flex flex-col gap-4
//                     ">
//                         <input type="text" name="name" value={signup.name}
//                             onChange={(e) =>
//                                 setSignup({
//                                     ...signup,
//                                     [e.target.name]: e.target.value
//                                 })
//                             }
//                             placeholder="Enter your name"
//                             className="
//                             w-full h-12 px-4 bg-transparent border border-white/70
//                             rounded-lg  outline-none  text-blue-600 placeholder:text-gray-300 text-sm sm:text-base
//                              "/>


//                         <input
//                             type="text"
//                             name="email"
//                             value={signup.email}
//                             onChange={(e) =>
//                                 setSignup({
//                                     ...signup,
//                                     [e.target.name]: e.target.value
//                                 })
//                             }
//                             placeholder="Enter your email"
//                             className="
//                             w-full
//                             h-12
//                             px-4
//                             bg-transparent
//                             border
//                             border-white/70
//                             rounded-lg
//                             outline-none
//                             text-green-400
//                             placeholder:text-gray-300
//                             text-sm
//                             sm:text-base
//                         "
//                         />


//                         <input
//                             type="password"
//                             name="password"
//                             value={signup.password}
//                             onChange={(e) =>
//                                 setSignup({
//                                     ...signup,
//                                     [e.target.name]: e.target.value
//                                 })
//                             }
//                             placeholder="Enter your password"
//                             className="
//                             w-full
//                             h-12
//                             px-4
//                             bg-transparent
//                             border
//                             border-white/70
//                             rounded-lg
//                             outline-none
//                             text-green-400
//                             placeholder:text-gray-300
//                             text-sm
//                             sm:text-base
//                         "
//                         />

//                         <button
//                             className="
//                             w-full
//                             h-12
//                             bg-blue-500
//                             hover:bg-green-300
//                             text-white
//                             rounded-lg
//                             font-semibold
//                             text-base
//                             sm:text-lg
//                             transition
//                             cursor-pointer
//                         "
//                         >
//                             SignUp
//                         </button>

//                         <h1
//                             className="
//                             text-center
//                             text-sm
//                             sm:text-base
//                             text-green-400
//                         "
//                         >
//                             Already have account?{" "}

//                             <Link to="/login">
//                                 <span
//                                     className="
//                                     text-white
//                                     hover:text-red-400
//                                     cursor-pointer
//                                 "
//                                 >
//                                     Login
//                                 </span>
//                             </Link>
//                         </h1>

//                     </form>

//                 </div>

//             </div>
//         </>
//     )
// }