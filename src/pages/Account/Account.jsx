import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/auth/LogoutButton";

import AuthContext from "../../context/AuthContext";
import { getMyOrders } from "../../features/orders/api/orderApi";

function Account() {
  const { user } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getMyOrders();

        setOrders(data);
      } catch (error) {
        setOrdersError("Unable to load your orders.");
      } finally {
        setLoadingOrders(false);
      }
    }

    loadOrders();
  }, []);

  function formatOrderDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <main className="min-h-[calc(100vh-112px)] bg-stone-100 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
            Your SAURABHYA Journey
          </p>

          <h1 className="mt-3 font-serif text-5xl text-stone-900">
            My Account
          </h1>

          <p className="mt-4 text-base leading-7 text-stone-700">
            Welcome back, {user.name}.
          </p>
        </div>

        {/* Personal Information */}
        <div className="mt-12 bg-white p-8 shadow-sm md:p-10">
          <h2 className="font-serif text-2xl text-stone-900">
            Personal Information
          </h2>

          <div className="mt-8 border-t border-stone-200">
            {/* Name */}
            <div className="border-b border-stone-200 py-5">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Name
              </p>

              <p className="mt-2 text-base text-stone-900">{user.name}</p>
            </div>

            {/* Email */}
            <div className="border-b border-stone-200 py-5">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Email
              </p>

              <p className="mt-2 text-base text-stone-900">{user.email}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="flex-1 bg-stone-900 py-4 text-center text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
            >
              Continue Shopping
            </Link>

            <LogoutButton className="flex-1 border border-stone-300 py-4 text-sm uppercase tracking-[0.15em] text-stone-700 transition hover:bg-stone-100" />
          </div>
        </div>

        {/* Orders */}
        <section className="mt-12">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
              Your Purchases
            </p>

            <h2 className="mt-2 font-serif text-4xl text-stone-900">
              My Orders
            </h2>
          </div>

          {/* Loading */}
          {loadingOrders && (
            <div className="mt-8 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-stone-600">Loading your orders...</p>
            </div>
          )}

          {/* Error */}
          {!loadingOrders && ordersError && (
            <div className="mt-8 border border-red-200 bg-red-50 p-6 text-sm text-red-800">
              {ordersError}
            </div>
          )}

          {/* No orders */}
          {!loadingOrders && !ordersError && orders.length === 0 && (
            <div className="mt-8 bg-white p-8 text-center shadow-sm">
              <h3 className="font-serif text-2xl text-stone-900">
                No Orders Yet
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-600">
                Your fragrance journey is waiting to begin.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-block bg-stone-900 px-7 py-3 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
              >
                Explore Fragrances
              </Link>
            </div>
          )}

          {/* Orders */}
          {!loadingOrders && !ordersError && orders.length > 0 && (
            <div className="mt-8 space-y-6">
              {orders.map((order) => (
                <article
                  key={order._id}
                  className="bg-white p-7 shadow-sm md:p-8"
                >
                  {/* Order Header */}
                  <div className="flex flex-col gap-3 border-b border-stone-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Order
                      </p>

                      <p className="mt-1 text-sm text-stone-800">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Placed On
                      </p>

                      <p className="mt-1 text-sm text-stone-800">
                        {formatOrderDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="py-5">
                    {order.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between border-b border-stone-100 py-3 last:border-b-0"
                      >
                        <div>
                          <p className="text-base text-stone-900">
                            {item.name}
                          </p>

                          <p className="mt-1 text-sm text-stone-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-sm text-stone-800">
                          ₹
                          {(item.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col gap-4 border-t border-stone-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Status
                      </p>

                      <p className="mt-1 text-sm text-stone-900">
                        {order.status}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Total
                      </p>

                      <p className="mt-1 font-serif text-2xl text-stone-900">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Account;
