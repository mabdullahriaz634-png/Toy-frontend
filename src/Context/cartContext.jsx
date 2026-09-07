import { useState } from "react"
import { Children, createContext, useContext } from "react"
import { API, authAPI } from "../Api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext()

export default function CartProvider({ children }) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [userCart, setUserCart] = useState(null)
    const [updatingCart, setUpdatingCart] = useState(false)

    // console.log("context userCart", userCart);


    const AddtoCart = async (productid) => {
        // console.log("Product id", productid);
        try {
            const res = await authAPI.post(`/cart/${productid}`)
            // console.log("Addto Cart Res", res);
            toast.success(res.data.msg)
            setUserCart(res.data.userCart)
        } catch (error) {
            toast.error(error.response.data.msg)
            console.log(error);
        }
    }

    const DeleteCart = async (productid) => {
        // console.log("DeleteCart id", productid);
        try {
            const res = await authAPI.delete(`/cart/${productid}`)
            // console.log(res);

            setUserCart(res.data.userCart)
        } catch (error) {
            console.log(error);
        }

    }

    const updateQuantity = async (id, change) => {
        if (updatingCart) return
        // console.log("cart click item:", id);
        // console.log("Change:", change);
        try {
            setUpdatingCart(true)
            const res = await authAPI.patch(`/cart/${id}`, { change })
            // console.log(res);
            setUserCart(res.data.userCart)

        } catch (error) {
            toast.error(error)
            console.log(error);
        }
        finally {
            setUpdatingCart(false)
        }
    };


    async function UserCart(req, res) {
        try {
            const res = await authAPI.get('/cart')
            // console.log(res);
            setUserCart(res.data.userCart)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        UserCart()
    }, [])


    return (
        <CartContext.Provider value={{
            isCartOpen, setIsCartOpen,
            AddtoCart, DeleteCart, UserCart, userCart, setUserCart,
            updateQuantity,updatingCart,setUpdatingCart
        }}>
            {children}
        </CartContext.Provider>
    )
}