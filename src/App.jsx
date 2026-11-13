
import { useState } from "react";
import { products } from "./challenges/products";
import "./App.css";

function App() {

  // Step 1: Create state variables
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  // Step 2: Get categories automatically
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category))
  ];

  // Step 3: Search and filter products
  let filteredProducts = products.filter((p) => {

    const searchMatch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || p.category === category;

    return searchMatch && categoryMatch;
  });

  // Step 4: Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {

    if (sort === "low") {
      return a.price - b.price;
    }

    if (sort === "high") {
      return b.price - a.price;
    }

    if (sort === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  // Step 5: Calculate average price
  const averagePrice = filteredProducts.length > 0
    ? filteredProducts.reduce((total, p) => total + p.price, 0)
      / filteredProducts.length
    : 0;

  // Step 6: Clear filters
  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSort("");
  }

  // Step 7: Display website
  return (
    <div className="container">

      <h1>My Product Store</h1>

      <p>Search, filter and sort your favourite products</p>

      {/* Search box */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Sort dropdown */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        <option value="rating">Rating: High to Low</option>
      </select>

      <button onClick={clearFilters}>
        Clear Filters
      </button>

      {/* Product count */}
      <h3>
        Showing {filteredProducts.length} of {products.length} products
      </h3>

      {/* Average price */}
      <h3>
        Average Price: ₹{averagePrice.toFixed(2)}
      </h3>

      {/* Product cards */}
      <div className="product-list">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <div className="card" key={product.id}>

              <h2>{product.name}</h2>

              <p>Category: {product.category}</p>

              <p>
                Price: ₹{product.price.toLocaleString("en-IN")}
              </p>

              <p>Rating: ⭐ {product.rating}</p>

            </div>

          ))

        ) : (

          <h2>No products found!</h2>

        )}

      </div>

    </div>
  );
}

export default App;
