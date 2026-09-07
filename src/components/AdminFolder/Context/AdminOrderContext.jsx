import { Children, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { authAPI } from ".../Api";
import { authAPI } from "../../../Api";
import { useParams } from "react-router-dom";
import { useRef } from "react";


export const AdminOrderContext = createContext()

export default function AdminOrderProvider({ children }) {
   
    return (
        <AdminOrderContext.Provider value={{
           
        }}>
            {children}
        </AdminOrderContext.Provider>
    )
}