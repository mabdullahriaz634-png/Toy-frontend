// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API } from "../Api";
// import ProductReviews from "./ProductReview";
// import Loader from "./Detail.Loader";
// import { toast } from "react-toastify";

// const ProductDetail = () => {
//     const params = useParams()
//     const [product, setProduct] = useState(null)
//     console.log("Product", product);
//     const [productimages, setproductImages] = useState([])
//     console.log("Product images",productimages);
//     const [mainImages, setMainimages] = useState("")

//     useEffect(() => {
//         async function getProdDetail() {
//             try {
//                 let res = await API.get(`/products/detail/${params.id}`)
//                 console.log("findprduct backend", res);
//                 setProduct(res.data.findproduct)
//                 setproductImages(res.data.findproduct.images)
//             }
//             catch (error) {
//                 toast.error(error.message)
//                 console.error(error.message);
//             }
//         }
//         if (params.id) {
//             getProdDetail()
//         }
//         // api.get("/products/detail/")
//         //     .then(( data ) => setDetailProduct(data))
//         //     .catch((error) => console.error("Failed to load detail", error.message));
//     }, [params.id])


//     if (!product) {
//         return (
//             <div className="flex justify-center items-center min-h-screen">
//                 <Loader />
//             </div>
//         );
//     }

//     console.log(product.reviews);


//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">

//             <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

//                 {/* Product Image */}
//                 <div className="bg-gray-50 flex items-center justify-center p-8">

//                     <img
//                         src={product.image}
//                         alt={product.title}
//                         className="w-full max-w-md object-contain rounded-2xl hover:scale-105 duration-300"
//                     />

//                 </div>


//                 {/* Product Details */}
//                 <div className="p-8 md:p-12 flex flex-col justify-center">

//                     <span className="inline-block w-fit bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
//                         {product.category}
//                     </span>

//                     <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-5">
//                         {product.title}
//                     </h1>

//                     <p className="text-gray-600 mt-5 leading-7">
//                         {product.description}
//                     </p>
//                     {/* Rating */}
//                     <div className="flex items-center gap-2 mt-6">
//                         <div className="flex text-yellow-400 text-xl">
//                             ★★★★★
//                         </div>
//                         <span className="text-gray-700 font-semibold">
//                             {product.rating}/5
//                         </span>
//                     </div>
//                     {/* Price */}
//                     <div className="mt-6">
//                         <h2 className="text-4xl font-bold text-green-600">
//                             ${product.price}
//                         </h2>
//                     </div>
//                     {/* Buttons */}
//                     <div className="flex flex-col sm:flex-row gap-4 mt-8">
//                         <button
//                             className=" bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold  hover:bg-blue-700 transition">
//                             Add To Cart
//                         </button>


//                         <button
//                             className="border border-gray-300
//               px-8
//               py-3
//               rounded-xl
//               font-semibold
//               hover:bg-gray-100
//               transition
//               "
//                         >
//                             Buy Now
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <ProductReviews reviewsProp={product.reviews ? product.reviews : []} id={params.id} />
//         </div>
//     );
// };


// export default ProductDetail;


import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { API } from "../Api";
import ProductReviews from "./ProductReview";
import Loader from "./Detail.Loader";
import { toast } from "react-toastify";
import { CartContext } from "../Context/cartContext";

const ProductDetail = () => {
    const params = useParams();

    const { AddtoCart, userCart } = useContext(CartContext)
    
    
    const [product, setProduct] = useState(null);
    const [productimages, setproductImages] = useState([]);
    const [mainImage, setMainImage] = useState("");
    
    const added_Item = userCart?.cartItems?.find((ele) => product?._id == ele.product?._id)
    // console.log("Product", product);
    // console.log("Product images", productimages);
    // console.log("Main Image", mainImage);

    useEffect(() => {
        async function getProdDetail() {
            try {
                let res = await API.get(`/products/detail/${params.id}`);
                // console.log("findprduct backend", res);
                const productData = res.data.findproduct;
                setProduct(productData);
                setproductImages(productData.images || []);
                // Main image by default
                setMainImage(productData.image || "");
            } catch (error) {
                toast.error(error.message);
                console.error(error.message);
            }
        }

        if (params.id) {
            getProdDetail();
        }
    }, [params.id]);

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    // console.log(product.reviews);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">

            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                {/* Product Images Section */}
                <div className="bg-gray-50 p-8">

                    {/* Main Image */}
                    <div className="flex items-center justify-center">
                        <img
                            src={mainImage}
                            alt={product.title}
                            className="w-full max-w-md h-[400px] object-contain rounded-2xl hover:scale-105 duration-300"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex gap-3 mt-6 justify-center flex-wrap">

                        {/* Main Product Image Thumbnail */}
                        {product.image && (
                            <button
                                type="button"
                                onClick={() => setMainImage(product.image)}
                                className={`w-20 h-20 rounded-xl border-2 p-1 bg-white transition ${mainImage === product.image
                                    ? "border-blue-600"
                                    : "border-gray-200 hover:border-blue-400"
                                    }`}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </button>
                        )}

                        {/* Other Images */}
                        {productimages.map((img, index) => (
                            <button
                                type="button"
                                key={index}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 rounded-xl border-2 p-1 bg-white transition ${mainImage === img
                                    ? "border-blue-600"
                                    : "border-gray-200 hover:border-blue-400"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`${product.title} ${index + 1}`}
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </button>
                        ))}

                    </div>
                </div>

                {/* Product Details */}
                <div className="p-8 md:p-12 flex flex-col justify-center">

                    <span className="inline-block w-fit bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-semibold">
                        {product.category}
                    </span>

                    <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mt-5">
                        {product.title}
                    </h1>

                    <p className="text-gray-600 mt-5 leading-7">
                        {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mt-6">
                        <div className="flex text-yellow-400 text-xl">
                            ★★★★★
                        </div>

                        <span className="text-gray-700 font-semibold">
                            {product.rating}/5
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mt-6">
                        <h2 className="text-4xl font-bold text-green-600">
                            Rs {product.price}
                        </h2>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">

                        {/* <button
                            onClick={() => AddtoCart(product._id)}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Add To Cart
                        </button> */}

                        <button
                            className={`cursor-pointer mt-5 w-full rounded-xl py-3 font-bold transition-all duration-300 ${added_Item
                                ? "cursor-default bg-green-600 text-white"
                                : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg active:scale-95"
                                }`}
                            onClick={() => AddtoCart(product._id)}
                        >
                            {added_Item ? (
                                <span className="flex items-center justify-center gap-2">
                                    ✓ Added to Cart
                                </span>
                            ) : (
                                "Add to Cart"
                            )}
                        </button>

                        {/* <button
                            className="border border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                        >
                            Buy Now
                        </button> */}

                    </div>
                </div>
            </div>

            <ProductReviews
                reviewsProp={product.reviews ? product.reviews : []}
                id={params.id}
            />
        </div>
    );
};

export default ProductDetail;