import React, { useState } from 'react';
import { SquareChevronRight, X } from 'lucide-react';

const FilterSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        sort: ''
    });

    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Toys', 'Beauty'];

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleApplyFilters = () => {
        console.log('Applied filters:', filters);
        setIsOpen(false);
    };

    const handleClearFilters = () => {
        setFilters({
            category: '',
            minPrice: '',
            maxPrice: '',
            sort: ''
        });
    };

    return (
        <div className="relative min-h-screen bg-gray-50">
            {/* ===== MAIN CONTENT AREA ===== */}
            <div className="p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Products</h1>
                            <p className="text-gray-500 text-sm md:text-base mt-1">
                                Browse and filter our product collection
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            {Object.values(filters).some(v => v !== '') && (
                                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                    Filters active
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Sample product grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <div
                                key={item}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center text-gray-400">
                                    Product {item}
                                </div>
                                <h3 className="font-medium text-gray-800">Product Name {item}</h3>
                                <p className="text-sm text-gray-500">$ {Math.floor(Math.random() * 100) + 10}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== OPEN SIDEBAR BUTTON ===== */}
            <button
                onClick={() => setIsOpen(true)}
                className={`
                    fixed right-0 top-1/2 -translate-y-1/2 
                    bg-blue-600 hover:bg-blue-700 
                    text-white p-3 rounded-l-xl 
                    shadow-lg hover:shadow-xl 
                    transition-all duration-300 
                    z-40 
                    flex items-center justify-center
                    group
                    ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                `}
                aria-label="Open filters sidebar"
            >
                <SquareChevronRight size={26} className="group-hover:scale-110 transition-transform" />
                <span className="sr-only">Open Filters</span>
            </button>

            {/* ===== BACKDROP OVERLAY ===== */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* ===== SIDEBAR ===== */}
            <div
                className={`
                    fixed top-0 right-0 h-full 
                    w-full sm:w-[380px] md:w-[420px] 
                    bg-white shadow-2xl z-50 
                    transform transition-transform duration-400 ease-in-out 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                    flex flex-col
                `}
                role="dialog"
                aria-label="Filter sidebar"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 bg-white shrink-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Filters</h2>
                        {Object.values(filters).some(v => v !== '') && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                {Object.values(filters).filter(v => v !== '').length}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                        aria-label="Close sidebar"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5">
                    {/* Category */}
                    <div>
                        <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Category
                        </label>
                        <select
                            id="category-select"
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="
                                w-full px-4 py-2.5 
                                border border-gray-300 rounded-lg 
                                bg-white 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                outline-none transition-all
                                text-gray-700 text-sm
                                appearance-none
                                cursor-pointer
                            "
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Min Price */}
                    <div>
                        <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Min Price
                        </label>
                        <input
                            id="min-price"
                            type="number"
                            placeholder="0"
                            min="0"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            className="
                                w-full px-4 py-2.5 
                                border border-gray-300 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                outline-none transition-all
                                text-gray-700 text-sm
                                placeholder:text-gray-400
                            "
                        />
                    </div>

                    {/* Max Price */}
                    <div>
                        <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Max Price
                        </label>
                        <input
                            id="max-price"
                            type="number"
                            placeholder="1000"
                            min="0"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            className="
                                w-full px-4 py-2.5 
                                border border-gray-300 rounded-lg 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                outline-none transition-all
                                text-gray-700 text-sm
                                placeholder:text-gray-400
                            "
                        />
                    </div>

                    {/* Sort */}
                    <div>
                        <label htmlFor="sort-select" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Sort By
                        </label>
                        <select
                            id="sort-select"
                            value={filters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="
                                w-full px-4 py-2.5 
                                border border-gray-300 rounded-lg 
                                bg-white 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                outline-none transition-all
                                text-gray-700 text-sm
                                appearance-none
                                cursor-pointer
                            "
                        >
                            <option value="">Default Sort</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                            <option value="rating">Highest Rating</option>
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 md:p-5 border-t border-gray-200 bg-gray-50 shrink-0 space-y-2.5">
                    <button
                        onClick={handleApplyFilters}
                        className="
                            w-full py-2.5 
                            bg-blue-600 hover:bg-blue-700 
                            text-white font-medium text-sm
                            rounded-lg 
                            transition-colors 
                            shadow-sm hover:shadow
                            flex items-center justify-center gap-2
                        "
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={handleClearFilters}
                        className="
                            w-full py-2 
                            text-gray-600 hover:text-gray-800 
                            text-sm font-medium
                            hover:bg-gray-200 
                            rounded-lg 
                            transition-colors
                        "
                    >
                        Clear All Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;