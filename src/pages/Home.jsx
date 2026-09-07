import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Detail.Loader";
import { HomeContext } from "../Context/HomeContext";
import { useContext } from "react";
// import { AuthContext } from "../Context/authContext";

function Home() {
  
  const {filters, setFilters, categories,products,loading,totalPages} = useContext(HomeContext)
 

  return (
    <div className="container">
      <h1>Product Explorer</h1>

      <FilterBar filters={filters} setFilters={setFilters} categories={categories} />

      <div className="grid">
        {
          loading ? <Loader/> :
        
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}

export default Home;
