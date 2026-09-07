import { Link } from "react-router-dom";
import { CartContext } from "../Context/cartContext";
import { useContext } from "react";

function ProductCard({ product }) {
  // console.log("Product",product._id);

  const { AddtoCart, userCart } = useContext(CartContext)

  const added_Item = userCart?.cartItems.find((ele) => product._id == ele.product._id)
  // console.log("asd",added_Item);


  return (
    // <div className="card">
    //   <Link to={`/detail/${product._id}`}>
    //     <img src={product.image} alt={product.title} />
    //   </Link>
    //   <h3>{product.title}</h3>
    //   <p>{product.category}</p>
    //   <p>Rs. {product.price.toLocaleString()}</p>
    //   <p>⭐ {product.rating}</p>
    //   <button className="h-[50px] w-[90%] mx-5 cursor-pointer text-center font-bold bg-[purple] text-white"
    //     onClick={() => AddtoCart(product._id)}
    //   >
    //     {added_Item ? <span className="text-blue-500">Added</span> : 'Add to Cart'}
    //   </button>

    // </div>

    /////////////////////////

    <div className="group w-full max-w-sm overflow-hidden cursor-pointer rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <Link to={`/detail/${product._id}`}>
        <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          />

          {/* Rating Badge */}
          <div className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-sm font-semibold shadow-md">
            ⭐ {product.rating}
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">

        {/* Category */}
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-purple-600">
          {product.category}
        </p>

        {/* Title */}
        <Link to={`/detail/${product._id}`}>
          <h3 className="line-clamp-2 min-h-[48px] text-lg font-bold text-gray-800 transition-colors duration-200 group-hover:text-purple-600">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          {/* <p className="text-xl font-extrabold text-gray-900">
            Rs. {product.price.toLocaleString()}
          </p> */}
          {product.discountedPrice > 0 ? (
            <div className="flex items-center gap-2">
              <p className="text-gray-400 line-through">
                Rs. {product.price}
              </p>

              <p className="font-bold text-green-600">
                Rs. {product.discountedPrice}
              </p>
            </div>
          ) : (
            <p className="font-bold">
              Rs. {product.price}
            </p>
          )}

          {/* <span className="text-sm text-gray-400">
            In Stock
          </span> */}
          <p className={`mt-1 text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}>
            {product.stock > 0
              ? `Stock: ${product.stock}`
              : "Out of Stock"
            }
          </p>
        </div>

        {/* Add To Cart */}
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

      </div>
    </div>

  );
}

export default ProductCard;

