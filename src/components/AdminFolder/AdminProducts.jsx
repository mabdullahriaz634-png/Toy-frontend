
import React, { useEffect, useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { CiEdit } from "react-icons/ci";
import { FaTrashRestore } from "react-icons/fa";
import { authAPI } from "../../Api";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

export default function AdminProducts() {
  const [editProduct, setEditProduct] = useState(null);
  const [editImages, setEditImages] = useState([]);
  console.log("Edit Product", editProduct);

  const [addProduct, setAddProduct] = useState(false);
  // const {addProduct, setAddProduct} = useOutletContext();

const {AdminProducts,setAdminProducts} = useOutletContext()
  const [files, setFiles] = useState([]);

  const [productData, setProductData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    discountedPrice: "",
    stock: "",
    image: "",
  });


  // ================= GET PRODUCTS =================

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= ADD PRODUCT =================

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach(file => {
      formData.append("images", file)
    })

    formData.append('title', productData.title)
    formData.append('category', productData.category)
    formData.append('description', productData.description)
    formData.append('price', Number(productData.price))
    formData.append('discountedPrice', Number(productData.discountedPrice))
    formData.append('stock', Number(productData.stock))

    try {
      const res = await authAPI.post("/products/admin/multiple", formData)
      toast.success(res.data.message || "Product added successfully");
      setAddProduct(false)

    } catch (error) {
      console.log("Add Product Error:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    }

  };

  // ================= DELETE PRODUCT =================

  const handleDelete = async (id) => {
    try {
      const res = await authAPI.delete(
        `/products/admin/${id}`
      );

      setAdminProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      toast.success(
        res.data.message || "Product deleted successfully"
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete product"
      );
    }
  };

  // ================= OPEN EDIT =================

  const handleEdit = (product) => {
    setEditProduct(product);
    setEditImages(product.images || []);

    setProductData({
      title: product.title || "",
      category: product.category || "",
      description: product.description || "",
      price: product.price || "",
      discountedPrice: product.discountedPrice || "",
      stock: product.stock || "",
      image: product.image || "",
    });
  };

  // ================= UPDATE PRODUCT =================

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await authAPI.put(
        `/products/admin/${editProduct._id}`,
        {
          title: productData.title,
          category: productData.category,
          description: productData.description,
          price: Number(productData.price),
          discountedPrice: Number(productData.discountedPrice),
          stock: Number(productData.stock),
          image: productData.image,
        }
      );

      console.log("Update Product:", res.data);

      setAdminProducts((prev) =>
        prev.map((product) =>
          product._id === editProduct._id
            ? res.data.product
            : product
        )
      );

      toast.success(
        res.data.message || "Product updated successfully"
      );

      setEditProduct(null);

      setProductData({
        title: "",
        category: "",
        description: "",
        price: "",
        discountedPrice: "",
        stock: "",
        image: "",
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update product"
      );
    }
  };

  // ================= GET PRODUCTS ON PAGE LOAD =================


  return (
    <>
      {/* ================= MAIN PAGE ================= */}

      <div>
        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-lg font-semibold text-violet-600">
              Management
            </p>

            <h1 className="text-3xl font-serif sm:text-4xl">
              Products
            </h1>

            <p className="mt-2 text-violet-600">
              Manage all products in your store.
            </p>
          </div>

          {/* ADD PRODUCT BUTTON */}

          <button
            type="button"
            onClick={() => {
              setProductData({
                title: "",
                category: "",
                description: "",
                price: "",
                discountedPrice: "",
                stock: "",
                image: "",
              });

              setAddProduct(true);
            }}
            className="flex w-fit items-center gap-2 rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold text-white hover:bg-gray-800"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {AdminProducts.map((product) => (
            <div
              key={product._id}
              className="rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* IMAGE */}

              <div className="flex h-60 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* PRODUCT INFO */}

              <div className="mt-5 flex items-start justify-between">
                <div className="min-w-0">
                  <h3 className="truncate font-serif">
                    {product.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    {product.category}
                  </p>
                </div>

                <button
                  type="button"
                  className="text-gray-400"
                >
                  <MoreVertical size={19} />
                </button>
              </div>

              {/* ACTION BUTTONS */}

              <div className="mt-3 flex items-center gap-2">
                {/* EDIT */}

                <button
                  type="button"
                  title="Edit Product"
                  onClick={() => handleEdit(product)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-violet-200 bg-violet-50 text-violet-600 hover:bg-violet-100"
                >
                  <CiEdit size={16} />
                </button>

                {/* DELETE */}

                <button
                  type="button"
                  title="Delete Product"
                  onClick={() =>
                    handleDelete(product._id)
                  }
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-100"
                >
                  <FaTrashRestore size={14} />
                </button>
              </div>

              {/* PRICE */}

              {/* <div className="mt-5 flex  justify-between flex-col">
                <p className="text-gray-500 line-through">Price
                  {product.price}
                </p>
                <p className="font-normal text-violet-600">
                  Discounted Price
                  Rs.{" "}
                  {product.discountedPrice > 0 ? product.discountedPrice : product.price}
                </p>

                <p className="text-xs font-semibold text-gray-400">
                  Stock: {product.stock}
                </p>
              </div> */}
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
              <p className={`mt-1 text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}>
                {product.stock > 0
                  ? `Stock: ${product.stock}`
                  : "Out of Stock"
                }
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================= */}
      {/* ================= ADD PRODUCT MODAL ============== */}
      {/* ================================================= */}

      {addProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">

            {/* HEADER */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  Add Product
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Add a new product to your store
                </p>
              </div>

              <button
                type="button"
                onClick={() => setAddProduct(false)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleAddProduct}
              className="space-y-4"
            >
              {/* TITLE */}

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Product Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  placeholder="Enter product title"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter product description"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* PRICE / DISCOUNT / STOCK */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-semibold">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    placeholder="2500"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold">
                    Discounted Price
                  </label>

                  <input
                    type="number"
                    name="discountedPrice"
                    value={productData.discountedPrice}
                    onChange={handleChange}
                    placeholder="2000"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    placeholder="20"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {/* IMAGE */}

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Image URL
                </label>

                {/* name="image" */}
                {/* value={productData.image} */}
                {/* placeholder="https://example.com/product.jpg" */}
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles([...e.target.files])}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setAddProduct(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* ================= EDIT PRODUCT MODAL ============= */}
      {/* ================================================= */}

      {editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">

            {/* HEADER */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  Edit Product
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Update your product information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditProduct(null)}
                className="text-2xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleUpdate}
              className="space-y-4"
            >
              {/* TITLE */}

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Product Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* CATEGORY */}

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  // rows="4"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* PRICE */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm font-semibold">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold">
                    Discounted Price
                  </label>

                  <input
                    type="number"
                    name="discountedPrice"
                    value={productData.discountedPrice}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={productData.stock}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {/* IMAGE */}

              <div>
                <label className="mb-1 block text-sm font-semibold">
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  value={productData.image}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-violet-500"
                />
              </div>

              {/* Main Image */}

              <div>
                <p className="mb-2 font-semibold">Main Image</p>

                {editProduct?.image && (
                  <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-gray-200">

                    <img
                      src={
                        editProduct.image.match(/\((.*?)\)/)?.[1] ||
                        editProduct.image
                      }
                      alt={editProduct?.title}
                      className="h-full w-full object-cover"
                    />

                    {/* Cross */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditProduct((prev) => ({
                          ...prev,
                          image: "",
                        }));
                      }}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow-md hover:bg-red-700"
                    >
                      ×
                    </button>

                  </div>
                )}
              </div>


              <div className="flex flex-wrap gap-3">
                {editImages?.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-24 w-24 overflow-hidden rounded-xl border border-gray-200"
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    {/* Cross Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setEditImages((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white shadow-md hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gray-950 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}