import React, { useContext, useState } from 'react';
import { Panda, CirclePlus, CircleMinus } from 'lucide-react';
import { Link } from "react-router-dom";

import { CartContext } from "../Context/cartContext";
import { authAPI } from '../Api';
import { toast } from 'react-toastify';

const CartSidebar = () => {

  const { isCartOpen, setIsCartOpen, userCart, setUserCart, DeleteCart, updateQuantity, updatingCart,
          setUpdatingCart } = useContext(CartContext)
  // console.log("frontend", userCart);

  const [cartItems, setCartItems] = useState([
    // { id: 1, name: 'Premium Headphones', price: 99.99, quantity: 1, image: 'https://via.placeholder.com/100' },
    // { id: 2, name: 'Wireless Mouse', price: 29.99, quantity: 2, image: 'https://via.placeholder.com/100' }  
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    image: 'https://via.placeholder.com/100'
  });

  // const addToCart = () => {
  //   if (newItem.name && newItem.price > 0) {
  //     const newCartItem = {
  //       id: Date.now(),
  //       ...newItem,
  //       quantity: 1
  //     };
  //     setCartItems([...cartItems, newCartItem]);
  //     setNewItem({ name: '', price: 0, image: 'https://via.placeholder.com/100' });
  //     setIsCartOpen(true);
  //   }
  // };





  // const getTotal = () => {
  //   return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);


  //   // return userCart.cartItems.reduce((total,item)=> total + (item.price * item.quantity),0)
  //   // return userCart.reduce((total,item)=> total + (item.price * item.quantity),0)

  // };

  // console.log(userCart?.totalCartPrice, 'check cart price');

  return (
    <>

      <div className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white
           transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-2' : 'translate-x-full'}
           `}>

        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-blue-600">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:mx-10 md:mx-3 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {userCart && userCart.cartItems?.length === 0 ? (
              <div className='flex items-center justify-center flex-col mt-12'>
                <Panda size={80} color='blue' />
                <p className="text-blue-500 font-bold text-center py-8">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userCart && userCart.cartItems?.map((item) => (
                  <div key={item._id} className="flex items-center border-b pb-4">
                    <img src={item.product.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 ml-4">
                      <h3 className="font-medium">{item.product.title}</h3>
                      {/* <p className="text-gray-600">${item.price.toFixed(2)}</p> */}
                      <div className="flex flex-col mt-1">
                        {/* <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-gray-200 rounded-full w-6 h-6 text-red-600 font-bold text-center"
                        >
                          -
                        </button> */}
                        <div className='flex'>
                          <button onClick={() => updateQuantity(item._id, -1)}>
                            <CircleMinus
                              className={`w-6 h-6 rounded-full transition 
                                           ${item.qty === 1 ? "text-gray-400 cursor-not-allowed "
                                  : "text-red-600 cursor-pointer hover:text-red-700"
                                }
                                        `}
                            />
                          </button>


                          {/* <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          +
                        </button> */}
                          &nbsp;
                          <CirclePlus
                            onClick={() => updateQuantity(item._id, 1)}
                            className="   text-red-600 font-bold text-center"
                          />
                        </div>
                        <span className="mx-2">Quantity: {item.qty}</span>


                      </div>
                    </div>
                    <button
                      onClick={() => DeleteCart(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          <div className="border-t p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold  text-blue-600">Total:</span>
              <span className="font-semibold text-blue-500">$ {userCart?.totalCartPrice}</span>
              {/* <span className="font-semibold">${getTotal().toFixed(2)}</span> */}
            </div>

            {userCart?.cartItems.length !== 0 ? (
              <Link to={'/checkout'}>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setIsCartOpen(false)} >
                  Proceed to Checkout
                </button>
              </Link>) : ''
            }

          </div>
        </div>
      </div>

      {/* Overlay */}
      {/* {isCartOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )} */}
    </>
  );
};

export default CartSidebar;