import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();

  const order = location.state?.order;

  // If someone directly visits /order-confirmation
  // without placing an order, show a simple message.
  if (!order) {
    return (
      <main className="min-h-[calc(100vh-112px)] bg-stone-100 px-6 py-16">
        <div className="mx-auto max-w-xl text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
            SAURABHYA
          </p>

          <h1 className="mt-3 font-serif text-4xl text-stone-900">
            No Order Found
          </h1>

          <p className="mt-4 text-base leading-7 text-stone-700">
            We couldn't find an order to display.
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-block bg-stone-900 px-8 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
          >
            Explore Fragrances
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-112px)] bg-stone-100 px-6 py-16">
      <div className="mx-auto max-w-2xl">

        {/* Confirmation */}
        <div className="bg-white px-7 py-12 text-center shadow-sm md:px-12">

          {/* Check mark */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-stone-300 text-2xl text-stone-800">
            ✓
          </div>

          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-stone-600">
            SAURABHYA
          </p>

          <h1 className="mt-3 font-serif text-5xl text-stone-900">
            Order Confirmed
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-stone-700">
            Thank you for your order. Your chosen fragrance
            is now on its way to becoming a memory.
          </p>

          {/* Order Number */}
          <div className="mx-auto mt-10 max-w-md border-y border-stone-200 py-6">

            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Order Number
            </p>

            <p className="mt-2 text-base text-stone-900">
              #{order._id.slice(-8).toUpperCase()}
            </p>

          </div>

          {/* Order Total */}
          <div className="mt-6">

            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Order Total
            </p>

            <p className="mt-2 font-serif text-3xl text-stone-900">
              ₹{order.totalAmount.toLocaleString("en-IN")}
            </p>

          </div>

          {/* Status */}
          <div className="mt-6">

            <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
              Status
            </p>

            <p className="mt-2 text-sm text-stone-900">
              {order.status}
            </p>

          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">

            <Link
              to="/account"
              className="flex-1 bg-stone-900 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
            >
              View My Orders
            </Link>

            <Link
              to="/shop"
              className="flex-1 border border-stone-300 py-4 text-sm uppercase tracking-[0.15em] text-stone-700 transition hover:bg-stone-100"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}

export default OrderConfirmation;