
import { Children, createContext, useContext, useEffect, useState } from "react";
import { useBeforeUnload, useNavigate,useSearchParams } from "react-router-dom";
import axios from "axios";
import { API } from "../Api";

export const HomeContext = createContext()


export default function HomeProvider({ children }) {


   const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Read filters from URL, falling back to defaults
  const filters = {
    keyword: searchParams.get("keyword") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "",
    page: Number(searchParams.get("page")) || 1,
  };

  // Write filters back to URL, dropping empty values
  const setFilters = (newFilters) => {
    const params = {};
    console.log(Object.entries(newFilters));

    Object.entries(newFilters).forEach(([key, val]) => {
      if (val !== "" && val !== null && val !== undefined) {
        params[key] = String(val);
      }
    });
    setSearchParams(params);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/categories")
      .then(({ data }) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err.message));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const { data } = await API.get("/products", {
          params: filters,
        });
        // console.log("data",data);

        setProducts(data.products);
        setTotalPages(data.totalPages);
        // if (!data){
        // } else{

        // }
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
      finally {
        setLoading(false)
      }
    };

    fetchProducts();
  }, [searchParams]); // re-fetch whenever URL changes


    return (
        <HomeContext.Provider value={{
            products, setProducts,loading, setLoading,totalPages, setTotalPages,
            categories, setCategories,searchParams, setSearchParams,
          filters,setFilters,searchParams,loading,totalPages,
        }}>
            {children}
        </HomeContext.Provider>
    )
}