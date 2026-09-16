import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { getProducts } from "../api/productApi";

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <p className="py-12 text-center text-sm text-stone-700">
        Loading fragrances...
      </p>
    );
  }

  if (error) {
    return (
      <p className="py-12 text-center text-sm text-stone-700">
        {error}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;