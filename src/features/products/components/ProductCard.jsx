import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import CartContext from "../../../context/CartContext";

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  return (
    <article className="group flex h-full flex-col">
      {/* Image */}
      <Link to={`/product/${product._id}`} className="block">
        <div className="aspect-[4/3] overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Information */}
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-600">
          {product.category}
        </p>

        <h3 className="mt-2 font-serif text-2xl text-stone-900">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="mt-2 min-h-[3rem] text-sm leading-6 text-stone-700">
          {product.description}
        </p>

        <p className="mt-4 text-base text-stone-900">
          ₹{product.price.toLocaleString("en-IN")}
        </p>

        {/* View Details */}
        <Link
          to={`/product/${product.id}`}
          className="mt-4 inline-block text-sm uppercase tracking-wider underline underline-offset-4"
        >
          View Details
        </Link>

        {/* Quantity */}
        <div className="mt-4 flex items-center gap-4">
          {/* Decrease */}
          <button
            onClick={() =>
              setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1))
            }
            className="h-8 w-8 border border-stone-300"
          >
            -
          </button>

          {/* Quantity */}
          <span className="min-w-5 text-center">{quantity}</span>

          {/* Increase */}
          <button
            onClick={() =>
              setQuantity((currentQuantity) => currentQuantity + 1)
            }
            className="h-8 w-8 border border-stone-300"
          >
            +
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product, quantity)}
          className="mt-auto w-full bg-stone-900 py-3 text-sm uppercase tracking-wider text-white transition hover:bg-stone-700"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
