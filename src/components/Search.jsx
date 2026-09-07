
import { Search, X } from "lucide-react";
import { useContext, useState } from "react";
import { HomeContext } from "../Context/HomeContext";

export default function NavbarSearch({ products = [] }) {
    // { products = [] }
    const { filters, setFilters, totalPages } = useContext(HomeContext)
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState("");

    const searchResults = products.filter((product) =>
        product.title?.toLowerCase().includes(search.toLowerCase())
    );

    const closeSearch = () => {
        setSearch("");
        setSearchOpen(false);
    };

    return (
        <div className="relative shrink-0">

            {/* ================= SEARCH BOX ================= */}
            <div
                className={`
                    flex items-center overflow-hidden rounded-full
                    border bg-white
                    transition-all duration-300 ease-in-out

                    /* Mobile */
                    ${searchOpen
                        ? "fixed left-3 right-3 top-3 z-[100] h-11 w-auto"
                        : "relative h-10 w-10"
                    }

                    /* Small screens */
                    sm:static
                    sm:z-auto
                    sm:h-10

                    ${searchOpen
                        ? "sm:w-56 md:w-64 lg:w-80"
                        : "sm:w-10"
                    }

                    ${searchOpen
                        ? "border-violet-300 shadow-md"
                        : "border-transparent"
                    }
                `}
            >

                {/* Search Icon */}
                <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="
                        flex h-10 w-10
                        shrink-0
                        items-center justify-center
                        text-gray-600
                        transition-colors
                        hover:text-violet-600
                        active:scale-95
                    "
                >
                    <Search size={21} />
                </button>

                {/* Input */}
                <input
                    type="text"
                    // value={search}
                    value={filters.keyword}

                    // onChange={(e) => setSearch(e.target.value)}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            keyword: e.target.value,
                            page: 1
                        })
                    }
                    onFocus={() => setSearchOpen(true)}
                    placeholder="Search products..."
                    className={`
                        min-w-0 flex-1
                        bg-transparent
                        px-1.5
                        text-sm
                        text-gray-700
                        outline-none
                        placeholder:text-gray-400

                        ${searchOpen
                            ? "opacity-100"
                            : "pointer-events-none w-0 opacity-0"
                        }
                    `}
                />

                {/* Close */}
                {searchOpen && (
                    <button
                        type="button"
                        onClick={closeSearch}
                        className="
                            mr-1.5
                            flex h-8 w-8
                            shrink-0
                            items-center justify-center
                            rounded-full
                            text-gray-400
                            transition
                            hover:bg-gray-100
                            hover:text-gray-700
                            active:scale-95
                        "
                    >
                        <X size={17} />
                    </button>
                )}
            </div>

            {/* ================= MOBILE BACKDROP ================= */}
            {searchOpen && (
                <div
                    onClick={closeSearch}
                    className="
                        fixed inset-0
                        z-[90]
                        bg-black/10
                        sm:hidden
                    "
                />
            )}

            {/* ================= SEARCH RESULTS ================= */}
            {searchOpen && search.trim() && (
                <div
                    className="
                        absolute
                        left-0
                        top-12
                        z-[100]

                        w-full
                        max-w-full
                        overflow-hidden
                        rounded-2xl
                        border border-gray-100
                        bg-white
                        shadow-xl

                        max-h-[70vh]

                        /* Mobile */
                        max-sm:fixed
                        max-sm:left-3
                        max-sm:right-3
                        max-sm:top-[62px]
                        max-sm:w-auto
                        max-sm:max-w-none
                        max-sm:rounded-2xl

                        /* Small mobile height */
                        max-[380px]:max-h-[65vh]
                    "
                >

                    {searchResults.length > 0 ? (

                        <div className="max-h-[65vh] overflow-y-auto overscroll-contain py-2">

                            {searchResults.map((product) => (
                                <div
                                    key={product._id}
                                    className="
                                        flex
                                        min-w-0
                                        cursor-pointer
                                        items-center
                                        gap-3
                                        px-3
                                        py-3
                                        transition
                                        hover:bg-violet-50
                                        active:bg-violet-100

                                        sm:px-4
                                    "
                                >

                                    {/* Image */}
                                    <div
                                        className="
                                            h-11
                                            w-11
                                            shrink-0
                                            overflow-hidden
                                            rounded-xl
                                            bg-gray-100

                                            sm:h-12
                                            sm:w-12
                                        "
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="
                                                h-full
                                                w-full
                                                object-contain
                                            "
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="min-w-0 flex-1">

                                        <p
                                            className="
                                                truncate
                                                text-sm
                                                font-semibold
                                                text-gray-800
                                            "
                                        >
                                            {product.title}
                                        </p>

                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                font-semibold
                                                text-violet-600
                                            "
                                        >
                                            Rs.{" "}
                                            {product.discountedPrice > 0
                                                ? product.discountedPrice
                                                : product.price}
                                        </p>

                                    </div>

                                </div>
                            ))}

                        </div>

                    ) : (

                        <div className="px-4 py-7 text-center">

                            <Search
                                size={27}
                                className="mx-auto mb-2 text-gray-300"
                            />

                            <p className="text-sm font-medium text-gray-500">
                                No products found
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                                Try another product name
                            </p>

                        </div>

                    )}

                </div>
            )}

        </div>
    );
}

