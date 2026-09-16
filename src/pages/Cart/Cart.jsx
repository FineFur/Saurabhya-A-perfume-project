import { useContext } from "react";
import { Link } from "react-router-dom";

import CartContext from "../../context/CartContext";
import CartItem from "../../features/cart/components/CartItem";

function Cart() {
  const { cartItems } = useContext(CartContext);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <main className="px-6 py-12 md:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
            Your Selection
          </p>

          <h1 className="mt-2 font-serif text-5xl text-stone-900 md:text-6xl">
            Shopping Cart
          </h1>

          {cartItems.length > 0 && (
            <p className="mt-3 text-base text-stone-700">{cartCount} items</p>
          )}
        </div>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="mt-12 border-y border-stone-200 py-16 text-center">
            <h2 className="font-serif text-3xl text-stone-900">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-base leading-7 text-stone-700">
              Discover a fragrance that becomes part of your story.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-block bg-stone-900 px-8 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
            >
              Explore Fragrances
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Cart Items */}
            <section>
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </section>

            {/* Order Summary */}
            <aside className="h-fit border border-stone-200 p-7">
              <h2 className="font-serif text-2xl text-stone-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4 text-base">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>

                  <span className="text-stone-900">
                    ₹{cartSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping</span>

                  <span className="text-stone-900">Complimentary</span>
                </div>
              </div>

              <div className="mt-6 border-t border-stone-200 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.15em] text-stone-700">
                    Total
                  </span>

                  <span className="font-serif text-2xl text-stone-900">
                    ₹{cartSubtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Link
                to="/shop"
                className="mt-5 block text-center text-sm uppercase tracking-[0.15em] underline underline-offset-4"
              >
                Continue Shopping
              </Link>

              <Link
                to="/checkout"
                className="block w-full bg-stone-900 py-4 text-center text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;
