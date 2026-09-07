import { useContext, useEffect, useInsertionEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Navigate, useNavigate } from "react-router-dom";
import { authAPI } from "../Api";
import ProfileCover from '../assets/profile cover.jpg'
import userProfile from '../assets/userprofile.jfif'
import { AuthContext } from "../Context/authContext";

export default function Profile() {
    // const [profile, setProfile] = useState({})
    // console.log("profile state value", profile);
    const { currentUser, setCurrentUser, currentUserlogout } = useContext(AuthContext)
    // console.log("profile user",currentUser, );

    // if (!currentUser) {
    //    Navigate('/')
    // }
    // useEffect(() => {
    //     async function fetchuser() {
    //         try {
    //             const res = await authAPI.get(`/auth/profile`,)
    //             // console.log("profile response", res);
    //             // localStorage.getItem('token', res.data.token)
    //             // setProfile(res.data.user)
    //             setCurrentUser(res.data.user)
    //         } catch (error) {
    //             console.error(error.message)
    //         }
    //     }
    //     fetchuser()
    // }, [])

    // const { state, dispatch } = useContext(MyContext)
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if (state.user == null) {
    //         navigate('/login')
    //     }
    // }, [])

    return (
        <>
            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Cover */}
                    <div className="h-40 md:h-60 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                        <img src={ProfileCover} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute -bottom-16 left-6 md:left-10">
                            <img
                                // src="https://i.pravatar.cc/300" server api 
                                src={userProfile}
                                alt="profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                            />
                        </div>
                    </div>
                    {/* Profile Header */}
                    <div className="pt-20 px-6 md:px-10 pb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {currentUser?.name}
                                </h1>
                                <p className="text-gray-500">
                                    Frontend Developer
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    Lahore, Pakistan
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button className=" bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition">
                                    Follow
                                </button>

                                <button className="border px-6 py-2 rounded-xl hover:bg-gray-100">
                                    Message
                                </button>
                            </div>

                        </div>
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-3  bg-gray-50 rounded-xl mt-8 p-5">
                            <div className="text-center">
                                <h2 className="font-bold text-xl">
                                    120
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Posts
                                </p>
                            </div>

                            <div className="text-center">
                                <h2 className="font-bold text-xl">
                                    15K
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Followers
                                </p>
                            </div>

                            <div className="text-center">
                                <h2 className="font-bold text-xl">
                                    300
                                </h2>
                                <p className="text-gray-500 text-sm">
                                    Following
                                </p>
                            </div>
                        </div>
                        {/* Content */}
                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                            <div className="md:col-span-2 border rounded-xl p-5">
                                <h2 className="font-semibold text-xl mb-3">
                                    About
                                </h2>

                                <p className="text-gray-600 leading-7">
                                    I am a frontend developer working with
                                    React, Tailwind CSS and modern UI designs.
                                </p>
                            </div>

                            <div className="border rounded-xl p-5 space-y-4">

                                <h2 className="font-semibold text-xl">
                                    Info
                                </h2>
                                <p>
                                    {currentUser?.email}
                                </p>

                                <p>
                                    📞 +92 300000000
                                </p>

                                <p>
                                    🌐 website.com
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    {/* // let [input, setInput] = useState({task: '' }) */ }

    {/* // let [array, setArray] = useState(() => { */ }
    //     let data = JSON.parse(localStorage.getItem(`todo_${state.user?.email}`))
    //     if (data) {
    //         return data
    //     } else {
    //         return []
    //     }

    // })

    // useEffect(() => {
    //     console.log("array updated", array);
    //     localStorage.setItem(`todo_${state.user.email}`, JSON.stringify(array))
    // }, [array])

    // let [edit, setEdit] = useState(null)

    // let getInput = (e) => {
    //     let inputName = e.target.name
    //     let inputValue = e.target.value
    //     setInput({ ...input, [inputName]: inputValue })
    // }

    // // Logout Button
    // const logout = () => {
    //     navigate('/login')
    //     dispatch({ type: "LOGOUT" })
    // }

    // const Submit = (e) => {
    //     e.preventDefault()

    //     if (input.task === '') {
    //         alert("Plz Enter Your Task")
    //         return false
    //     }

    //     if (edit !== null) { // agar edit state empty na ho (!==)

    //         let newArray = [...array]
    //         newArray[edit] = input
    //         setEdit(null)
    //         setArray(newArray) // submit hony par array me objects set ho rhy [ {task:1} , {task:2} ]
    //     } else {
    //         setArray([...array, input])
    //         setInput({ task: '' })
    //     }


    // }

    // useEffect(() => {

    // }, [array, input, edit])

    // const DelTask = (p) => {
    //     console.log(p);
    //     let newArray = [...array]
    //     newArray = newArray.filter((ele, idx) => idx !== p)
    //     //   { ele = elment & idx of newArray}
    //     setArray(newArray)
    // }

    // const EditTask = (editIndex) => {
    //     // console.log(editIndex);
    //     let Editarray = [...array]
    //     let element = Editarray.find((ele, idx) => idx == editIndex)
    //     // console.log(element);
    //     setEdit(editIndex)
    //     setInput(element)
    // }

    // return (
    //     <>
    //          <div className="h-[450px] sm:w-[400px] md:w-[600px] rounded-md bg-[#c0c0c05d]  shadow-2xl shadow-amber-50 shadow-x border-2 border-amber-50
    //              flex justify-center items-center flex-col absolute  top-1/7 sm:left-0 md:left-90">
    //             <h1 className="absolute top-1 text-3xl text-amber-50 font-semibold font-serif" >My Note Book</h1>

    //             <h2 className="text-2xl mt-1 text-red-500 font-serif">Hello {state.user?.name}</h2>

    //             <div className="h-[340px] w-full  flex flex-wrap items-center justify-between">
    //                 <form onSubmit={Submit} className="flex absolute top-21 left-12" >
    //                     <input type="text" name="task" className=" mx-8 mt-2 pl-3 h-[40px] w-[335px] text-amber-50 outline-2 rounded-lg" placeholder="Enter your task"
    //                         onChange={getInput} value={input.task} />

    //                     <button className="mt-2 h-[40px] w-[100px] text-amber-50 border-none text-lg font-serif rounded-lg  bg-[#08c108] hover:bg-[#008000c5] cursor-pointer">
    //                         {edit !== null ? 'Edit' : 'Add Task'}
    //                     </button>
    //                 </form>
    //                 {array.map((ele, idx) => {
    //                     return (
    //                         <div className=" w-max ml-8 mt-14 flex flex-wrap items-center justify-between  bg-transparent ">
    //                             <div className="flex items-center justify-between gap-2 border-2 border-amber-50 rounded-lg h-[100px] w-max">
    //                                 <h1 className="text-white">{ele.task}</h1>
    //                                 <div className="flex gap-2 ">
    //                                     <button>
    //                                         < CiEdit className="cursor-pointer" color="white" onClick={() => EditTask(idx)} />
    //                                     </button>

    //                                     <button>
    //                                         < MdDelete className="cursor-pointer" color="white" onClick={() => DelTask(idx)} />
    //                                     </button>
    //                                 </div>
    //                             </div>

    //                         </div>
    //                     )
    //                 })}
    //             </div>

    //             <button className="h-[30px] w-[90px] border-none text-xl font-serif rounded-lg absolute right-3 bottom-1 cursor-pointer text-amber-50  bg-[#08c108] hover:bg-[#008000c5]"
    //                 onClick={
    //                     // () => dispatch({ type: "LOGOUT" })
    //                     logout
    //                 } >
    //                 Log out
    //             </button>
    //         </div> 

    //     </>
    // )
}