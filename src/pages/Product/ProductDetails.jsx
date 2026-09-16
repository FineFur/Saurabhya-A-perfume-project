import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CartContext from "../../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        setError("We couldn't find the fragrance you're looking for.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-stone-700">
            Loading fragrance...
          </p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-serif text-4xl text-stone-900">
            Product Not Found
          </h1>

          <p className="mt-3 text-base text-stone-700">
            {error}
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-block text-sm uppercase tracking-[0.15em] underline underline-offset-4"
          >
            Return to Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-10 md:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Back to Collection */}
        <Link
          to="/shop"
          className="text-sm uppercase tracking-[0.15em] text-stone-600 transition hover:text-stone-900"
        >
          ← Back to Collection
        </Link>

        {/* Product */}
        <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14 lg:gap-16">

          {/* Product Image */}
          <div className="bg-stone-100">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
              {product.category}
            </p>

            <h1 className="mt-3 font-serif text-5xl text-stone-900 md:text-6xl">
              {product.name}
            </h1>

            <p className="mt-4 text-lg text-stone-900">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            <div className="mt-6 border-t border-stone-200 pt-6">
              <p className="max-w-lg text-base leading-7 text-stone-700">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-stone-600">
                Quantity
              </p>

              <div className="flex items-center">
                <button
                  onClick={() =>
                    setQuantity((currentQuantity) =>
                      Math.max(1, currentQuantity - 1)
                    )
                  }
                  className="h-11 w-11 border border-stone-300 text-base text-stone-700 transition hover:bg-stone-100"
                >
                  -
                </button>

                <span className="flex h-11 w-14 items-center justify-center border-y border-stone-300 text-base">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((currentQuantity) =>
                      currentQuantity + 1
                    )
                  }
                  className="h-11 w-11 border border-stone-300 text-base text-stone-700 transition hover:bg-stone-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product, quantity)}
              className="mt-6 w-full bg-stone-900 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
            >
              Add to Cart
            </button>

            {/* Product Information */}
            <div className="mt-8 border-t border-stone-200 pt-6">
              <div className="grid grid-cols-2 gap-6 text-sm">

                <div>
                  <p className="uppercase tracking-[0.15em] text-stone-600">
                    Fragrance Family
                  </p>

                  <p className="mt-2 text-stone-900">
                    {product.category}
                  </p>
                </div>

                <div>
                  <p className="uppercase tracking-[0.15em] text-stone-600">
                    Collection
                  </p>

                  <p className="mt-2 text-stone-900">
                    SAURABHYA
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;