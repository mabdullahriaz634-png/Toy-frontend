import React from "react";
import { useState } from "react";
import { authAPI } from "../Api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { useEffect } from "react";

const user = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 123-4567",
  password: "",
  confirm_password: "",
  address: "123 Main Street, Apt 4B, New York, NY 10001",
  joined: "March 2025",
};

const ProfileTab = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  console.log("Profile Tab", currentUser);

  const [file, setfile] = useState(null);
  const [src, setSrc] = useState('');

  useEffect(() => {
    if (currentUser?.avatar) {
      setSrc(currentUser.avatar)
    }
  }, [currentUser])

  const uploadImage = async (e) => {
    
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await authAPI.patch('auth/profile/single', formData)
    console.log(res.data.imageUrl);
    // setSrc(res.data.imageUrl)
    setCurrentUser(res.data.avatar)
    // toast.success()
  }

  return (
    <>
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          {/* <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white shadow-lg"> */}
          {/* {user.name
          .split(" ")
          .map((n) => n[0])
          .join("")} */}
          {/* <input type="file" onChange={(e) => setfile(e.target.files[0])} />
            <button onClick={ uploadImage }>Upload</button>
            <img src={src} alt="" />
          </div>  */}
          <div className="flex flex-col items-center gap-4">

            {/* Profile Image */}
            <div className="relative h-28 w-28">

              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl ring-2 ring-purple-200">

                {src ? (
                  <img
                    src={src}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                )}

              </div>

              {/* Camera / Upload Button */}
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-purple-600 text-white shadow-md transition hover:bg-purple-700"
              >
                📷
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => uploadImage(e)}
              />

            </div>

            {/* Selected File */}
            {file && (
              <p className="max-w-[220px] truncate text-sm text-gray-500">
                {file.name}
              </p>
            )}

            {/* Upload Button */}
            {file && (
              <button
                onClick={uploadImage}
                className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-purple-700 active:scale-95"
              >
                Upload Image
              </button>
            )}

          </div>


          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">Member since {user.joined}</p>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-800">Personal Information</h3>

          {/* /////////// */}
          {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-500">Full Name</label>
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-700"
            value={user.name}
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Email Address</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-700"
            value={user.email}
            readOnly
          />
        </div>
        <div className="flex">
          <label className="block text-sm font-medium text-gray-500">Phone Number</label>
          <input
            type="tel"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-700"
            value={user.password}
            readOnly
          />
          <input
            type="tel"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-700"
            value={user.confirm_password}
            readOnly
          />
          <input
            type="tel"
            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-700"
            value={user.phone}
            readOnly
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-500">Address</label>
          <textarea
            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-700"
            rows="2"
            value={user.address}
            readOnly
          />
        </div>
      </div> */}
          {/* /////// */}

          <div className="flex flex-col gap-6">

            {/* Name & Email */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 outline-none"
                />
              </div>
            </div>

            {/* Passwords & Phone */}
            <div className="flex flex-col lg:flex-row gap-6">

              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  value={user.password}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={user.confirm_password}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 outline-none"
                />
              </div>

              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  readOnly
                  className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 outline-none"
                />
              </div>

            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Address
              </label>
              <textarea
                rows={3}
                value={user.address}
                readOnly
                className="w-full resize-none rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 outline-none"
              />
            </div>

          </div>
          {/* ////// */}
          <button
            onClick={() => alert("Edit profile – frontend only!")}
            className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto sm:px-8"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  )

};

export default ProfileTab;