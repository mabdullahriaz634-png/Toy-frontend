import { Children, createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authAPI } from "../Api";
import { useParams } from "react-router-dom";


export const OrderContext = createContext()

export default function OrderProvider({ children }) {

    const [userOrder, setuserOrder] = useState(null)
    const [userOrders, setuserOrders] = useState([])

    const getOrder = async (id) => {
        try {
            const res = await authAPI.get(`/order/detail/${id}`,)
            // console.log("Get Order: ", res);

            setuserOrder(res.data.userOrder)

        } catch (error) {
            toast.error(error)
            console.log(error);
        }
    }

    async function orders() {
        try {
            const res = await authAPI.get('/order')
            // console.log('all orders: ', res.data);

            setuserOrders(res.data.userOrder)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        orders()
    }, [])
    return (
        <OrderContext.Provider value={{
            userOrder, setuserOrder,
            userOrders, setuserOrders,
            getOrder,orders
        }}>
            {children}
        </OrderContext.Provider>
    )
}