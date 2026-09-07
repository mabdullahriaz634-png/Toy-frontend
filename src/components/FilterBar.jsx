import { SquareChevronRight } from 'lucide-react';
import { useContext } from 'react';
import { HomeContext } from '../Context/HomeContext';

function FilterBar() {
// { filters, setFilters, categories = [] }
  const {filters, setFilters, categories} = useContext(HomeContext)
  
  return (
    <>
      {/* <SquareChevronRight /> */}

      <div className="filters">
        
        <input
          type="text"
          placeholder="Search products"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value, page: 1 })}
        />

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value, page: 1 })}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value, page: 1 })}
        />

        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value, page: 1 })}
        >
          <option value="">Default Sort</option>
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>
    </>
  );
}

export default FilterBar;
