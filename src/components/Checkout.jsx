import React, { useState, useContext } from 'react';
import { CartContext } from '../Context/cartContext';
import { authAPI } from '../Api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CirclePlus, CircleMinus } from 'lucide-react';
import ShippingSection from './Shippingmethod';
import PlaceOrder_Loader from './PlaceOrderLoader';

function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Educational Building Blocks",
  //     price: 29.99,
  //     quantity: 2,
  //     image: "https://picsum.photos/seed/toy1/100/100"
  //   },
  //   {
  //     id: 2,
  //     name: "Colorful Puzzle Set",
  //     price: 19.99,
  //     quantity: 1,
  //     image: "https://picsum.photos/seed/toy2/100/100"
  //   },
  //   {
  //     id: 3,
  //     name: "Remote Control Car",
  //     price: 49.99,
  //     quantity: 1,
  //     image: "https://picsum.photos/seed/toy3/100/100"
  //   }
  // ]);
  const { UserCart, userCart, setUserCart, DeleteCart,
    updateQuantity, updatingCart, setUpdatingCart } = useContext(CartContext)

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    Instructions: "",
    shippingMethod: "standard",
    country: "Pakistan"
  });
  // console.log("ship Method", shippingInfo);
  const [bulkQuantity, setbulkQuantity] = useState(0)

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  // const [cardInfo, setCardInfo] = useState({
  //   cardNumber: "",
  //   expiry: "",
  //   cvv: "",
  //   cardName: ""
  // });

  const [currentStep, setCurrentStep] = useState(1);
  const [stepCompleted, setStepCompleted] = useState({
    1: 'false',
    2: false,
    3: false
  });

  const subtotal = userCart?.cartItems?.reduce((total, item) => total + (item.product.price * item.qty), 0);
  // console.log(subtotal, "subtotal");


  const shippingFee = shippingInfo.shippingMethod == 'standard' ? 199 : shippingInfo.shippingMethod == 'express' ? 299 : shippingInfo.shippingMethod == 'sameDay' ? 499 : 0;
  const tax = subtotal * 0.02;
  // console.log("tax", tax);
  const total = subtotal + shippingFee + tax;
  // console.log("total", total);


  // const handleQuantityChange = (id, newQuantity) => {
  //   if (newQuantity < 1) return;
  //   setCartItems(cartItems.map(item =>
  //     item.id === id ? { ...item, quantity: newQuantity } : item
  //   ));
  // };

  // const updateQuantity = async (id, change) => {
  //   console.log("Cart item id", id);
  //   console.log("Cart item change", change);
  //   try {
  //     const res = await authAPI.patch(`/cart/${id}`, { change })
  //     console.log(res);
  //     setUserCart(res.data.userCart)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleInputChange = (e, type) => {
    if (type === 'shipping') {
      setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    } else if (type === 'card') {
      setCardInfo({ ...cardInfo, [e.target.name]: e.target.value });
    }
  };

  const handleNextStep = () => {
    // Validate current step before proceeding
    const { fullName, email, phone, address, city, postalCode } = shippingInfo;

    if (currentStep === 1) {
      setStepCompleted({ ...stepCompleted, 1: true });
    } else if (currentStep === 2) {
      if (!fullName || !email ||
        !phone || !address ||
        !city) {
        toast.error("Plz fill all detail")
        return;
      }
      setStepCompleted({ ...stepCompleted, 2: true });

    }
    setCurrentStep(currentStep + 1);

  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    //Place Order Loading

    e.preventDefault();
    setStepCompleted({ ...stepCompleted, 3: true });

    setLoading(true)
    try {
      const res = await authAPI.post('/order/', { shippingInfo, paymentMethod })
      UserCart()
      toast.success("Order placed successfully!");
      setTimeout(() => {
        if (res.data.isStripe) {
          window.location.href = res.data.url
        }
        setLoading(false)
      }, 4000)
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
      setLoading(false)
    } 
    // finally {
    // }
    setShippingInfo({ fullName: "", email: "", phone: "", address: "", city: "", Instructions: "", shippingmethod: "Standard", country: "Pakistan" })

  };

  const userBulkQuantity = (e) => {
    console.log("userBulkQuantity", userBulkQuantity);

    setbulkQuantity()
  }
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            {userCart?.cartItems.length !== 0 ? (
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Review Your Cart</h2>
                <div className="space-y-4 md:space-y-6">
                  {userCart?.cartItems?.map((item) => (
                    <div key={item.product._id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 md:p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      {/* {console.log("map product id =", item.product._id)} */}
                      <img src={item.product.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{item.product.title}</h3>
                        <p className="text-gray-600">Rs{item.product.price.toFixed(2)}</p>

                        {/* <input type="number" min="1" step="1" name='qty'
                          value={item.qty}
                          placeholder='Enter in bulk quantity'
                          className='border-2 border-gray-500 pl-3 '
                          onChange={() => { userBulkQuantity(e.target.value) }}
                        /> */}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateQuantity(item._id, -1)}>
                          <CircleMinus
                            className={`w-6 h-6 rounded-full transition 
                                        ${item.qty === 1 ? "text-gray-400 cursor-not-allowed "
                                : "text-red-600 cursor-pointer hover:text-red-700"
                              }
                                      `}
                          />
                        </button>
                        <span className="w-8 text-center font-medium  text-blue-500">{item.qty}</span>
                        <button onClick={() => updateQuantity(item._id, 1)}>
                          <CirclePlus
                            className="   text-red-600 font-bold text-center"
                          />
                        </button>
                        {/* <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button> */}
                      </div>
                      <button
                        onClick={() => DeleteCart(item._id)}
                        className="text-blue-500  transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-6 md:mt-8">
                  <button type='button'
                    onClick={handleNextStep}
                    className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-lg"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </div>) :
              (
                <Link to={'/'}>
                  <button type='button'
                    className="w-full bg-blue-600
                        text-white py-3 md:py-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium text-lg"
                  > Go to Home
                  </button>
                </Link>
              )
            }
          </>
        );

      case 2:
        return (
          <>
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Shipping Information</h2>
              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={shippingInfo.fullName}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={(e) => handleInputChange(e, 'shipping')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6" >
                  {/* className="grid grid-cols-1 md:grid-cols-2 gap-6" new style */}
                  {/* className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6" old style*/}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Country</label>
                    <select
                      name="country"
                      value={shippingInfo.country}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </div>

                  {/* <div> */}
                  {/* <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Shipping Method</label> */}
                  {/* <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      placeholder='Optional'
                      className="w-full px-3 py-2 placeholder border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    /> */}
                  {/* <select name="shippingmethod"
                      value={shippingInfo.shippingmethod}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
                    >
                      <option value="Standard">Standard (3-5 Days)</option>
                      <option value="Express">Express (1-2 Days)</option>
                      <option value="NextDay">Next Day (only in Lahore)</option>
                    </select> */}
                  {/* <ShippingSection shippingInfo={shippingInfo}  setShippingInfo={setShippingInfo} /> */}
                  {/* </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Instructions</label>
                    <textarea name="Instructions" value={shippingInfo.Instructions}
                      onChange={(e) => handleInputChange(e, 'shipping')}
                      placeholder='Optional'
                      className="w-full px-3 py-2 placeholder border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                    </textarea>
                    {/* <input
                      type="text"
                      name="postalCode"

                    /> */}
                  </div>
                  <div>
                    <ShippingSection shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} />
                  </div>

                </div>
              </form>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 font-medium w-full sm:w-auto"
                >
                  Back to Cart
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-blue-600  text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium w-full sm:w-auto"
                >
                  Continue to Payment
                </button>
              </div>
            </div>

          </>
        );

      case 3:
        return (
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Payment Method</h2>
            <div className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={() => setPaymentMethod("stripe")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="creditCard" className="flex items-center space-x-2 cursor-pointer">
                    <span>Stripe</span>
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                  </label>
                </div>

                {/* <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="radio" id="paypal" name="paymentMethod" value="paypal"
                    checked={paymentMethod === "paypal"} onChange={() => setPaymentMethod("paypal")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer">
                    <span>PayPal</span>
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 11.965h1.962v6.644H7.076zm9.838 0c-1.652 0-2.698 1.092-2.698 2.733 0 1.642.987 2.733 2.638 2.733 1.652 0 2.698-1.092 2.698-2.733 0-1.642-.987-2.733-2.638-2.733zM10.06 11.965h1.962v6.644H10.06zm5.854-3.092c.629 0 1.138-.509 1.138-1.138s-.509-1.138-1.138-1.138-1.138.509-1.138 1.138.509 1.138 1.138 1.138z" />
                    </svg>
                  </label>
                </div> */}

                <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    id="cashOnDelivery"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={paymentMethod === "cashOnDelivery"}
                    onChange={() => setPaymentMethod("cash_on_delivery")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="cashOnDelivery" className="cursor-pointer">Cash on Delivery</label>
                </div>
              </div>

              {/* {paymentMethod === "creditCard" && (
                <div className="mt-6 space-y-4 md:space-y-6 p-4 md:p-6 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardInfo.cardNumber}
                      onChange={(e) => handleInputChange(e, 'card')}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardInfo.expiry}
                        onChange={(e) => handleInputChange(e, 'card')}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={cardInfo.cvv}
                        onChange={(e) => handleInputChange(e, 'card')}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={cardInfo.cardName}
                      onChange={(e) => handleInputChange(e, 'card')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>
              )} */}

              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 font-medium w-full sm:w-auto"
                >
                  Back to Shipping
                </button>
                <button disabled={loading}
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 font-medium w-full sm:w-auto"
                >
                  {loading ? (<PlaceOrder_Loader />) : ("Place Order")}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <p className="text-yellow-500 font-semibold text-lg md:text-xl">Complete your order and bring joy to your little ones</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 md:mb-8 lg:mb-12">
          <div className="flex justify-between mb-2 md:mb-4">
            <span className={`text-sm md:text-base font-medium ${currentStep === 1 ? 'text-blue-600' : 'text-gray-500'}`}>Cart</span>
            <span className={`text-sm md:text-base font-medium ${currentStep === 2 ? 'text-blue-600' : 'text-gray-500'}`}>Shipping</span>
            <span className={`text-sm md:text-base font-medium ${currentStep === 3 ? 'text-blue-600' : 'text-gray-500'}`}>Payment</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
          {/* Left Column - Step Content */}
          <div className="lg:col-span-2">
            {renderStepContent()}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 sticky top-4 md:top-8 lg:top-12">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4 md:mb-6">Order Summary</h2>
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {userCart?.cartItems?.map((item) => (
                  <div key={item.product._id} className="flex justify-between text-sm md:text-base flex-col">
                    <span className="text-gray-600 truncate">{item.product.title} x {item.qty}</span>
                    <span className="font-medium">Rs {(item.product.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 md:pt-6 space-y-2 md:space-y-3">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rs {userCart?.totalCartPrice.toFixed(2)}</span>
                  {/* <span>${subtotal.toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span>Rs {shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-600">Tax (2%)</span>
                  <span>Rs {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg md:text-xl pt-2 md:pt-3 border-t">
                  <span>Total</span>
                  <span>Rs{total.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-500 text-center mt-4 md:mt-6">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;