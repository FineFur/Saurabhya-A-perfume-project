import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import CartContext from "../../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function handleAddToCart() {
    addToCart(product, quantity);
  }

  return (
    <div>
      {/* PRODUCT IMAGE */}
      <Link to={`/product/${product._id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </Link>

      {/* CATEGORY */}
      <p className="mt-6 text-xs uppercase tracking-[0.25em] text-stone-500">
        {product.category}
      </p>

      {/* NAME */}
      <h2 className="mt-3 font-serif text-3xl text-stone-900">
        {product.name}
      </h2>

      {/* DESCRIPTION */}
      <p className="mt-4 min-h-[48px] text-base leading-7 text-stone-700">
        {product.description}
      </p>

      {/* PRICE */}
      <p className="mt-6 text-base text-stone-900">
        ₹{product.price.toLocaleString("en-IN")}
      </p>

      {/* VIEW DETAILS */}
      <Link
        to={`/product/${product._id}`}
        className="mt-6 inline-block border-b border-stone-900 pb-1 text-sm uppercase tracking-wide text-stone-900"
      >
        View Details
      </Link>

      {/* QUANTITY */}
      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={decreaseQuantity}
          className="flex h-10 w-10 items-center justify-center border border-stone-300 text-stone-900 transition hover:bg-stone-100"
        >
          -
        </button>

        <span className="w-4 text-center text-sm">{quantity}</span>

        <button
          onClick={increaseQuantity}
          className="flex h-10 w-10 items-center justify-center border border-stone-300 text-stone-900 transition hover:bg-stone-100"
        >
          +
        </button>
      </div>

      {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        className="mt-0 w-full bg-stone-900 py-4 text-sm uppercase tracking-wide text-white transition hover:bg-stone-800"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;