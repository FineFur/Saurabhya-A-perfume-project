import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";

function Checkout() {
  const { user } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // PAYMENT
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    // Basic payment validation
    if (paymentMethod === "UPI") {
      if (!upiId.includes("@")) {
        setError("Please enter a valid UPI ID.");
        return;
      }
    }

    if (paymentMethod === "CARD") {
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        setError("Please enter a valid 16-digit card number.");
        return;
      }

      if (expiry.length !== 5) {
        setError("Please enter a valid expiry date.");
        return;
      }

      if (cvv.length !== 3) {
        setError("Please enter a valid 3-digit CVV.");
        return;
      }
    }

    setLoading(true);

    try {
      /*
       * DEMO PAYMENT
       *
       * This simulates a successful payment.
       * No real money is transferred.
       */
      if (paymentMethod !== "COD") {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),

          shippingAddress: {
            name,
            phone,
            address,
            city,
            state,
            pincode,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      clearCart();

      navigate("/order-confirmation", {
        state: {
          order: data.order,
        },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <main className="min-h-[calc(100vh-112px)] bg-stone-100 px-6 py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
            SAURABHYA
          </p>

          <h1 className="mt-3 font-serif text-5xl text-stone-900">
            Your Cart is Empty
          </h1>

          <p className="mt-5 text-base leading-7 text-stone-700">
            Add a fragrance to your cart before proceeding to checkout.
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
    <main className="min-h-[calc(100vh-112px)] bg-stone-100 px-6 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
            SAURABHYA
          </p>

          <h1 className="mt-3 font-serif text-5xl text-stone-900">
            Checkout
          </h1>

          <p className="mt-4 text-base leading-7 text-stone-700">
            Complete your details and bring your chosen fragrance home.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* CHECKOUT FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-7 shadow-sm md:p-9"
          >
            {error && (
              <div className="mb-7 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            )}

            {/* SHIPPING */}
            <h2 className="font-serif text-2xl text-stone-900">
              Shipping Information
            </h2>

            {/* Name */}
            <div className="mt-8">
              <label
                htmlFor="name"
                className="text-sm uppercase tracking-[0.15em] text-stone-700"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                className="mt-2 w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
              />
            </div>

            {/* Phone */}
            <div className="mt-6">
              <label
                htmlFor="phone"
                className="text-sm uppercase tracking-[0.15em] text-stone-700"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="9876543210"
                required
                className="mt-2 w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
              />
            </div>

            {/* Address */}
            <div className="mt-6">
              <label
                htmlFor="address"
                className="text-sm uppercase tracking-[0.15em] text-stone-700"
              >
                Address
              </label>

              <textarea
                id="address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="House number, street, area"
                required
                rows="3"
                className="mt-2 w-full resize-none border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
              />
            </div>

            {/* City + State */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="city"
                  className="text-sm uppercase tracking-[0.15em] text-stone-700"
                >
                  City
                </label>

                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  required
                  className="mt-2 w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="text-sm uppercase tracking-[0.15em] text-stone-700"
                >
                  State
                </label>

                <input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                  required
                  className="mt-2 w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
                />
              </div>
            </div>

            {/* Pincode */}
            <div className="mt-6">
              <label
                htmlFor="pincode"
                className="text-sm uppercase tracking-[0.15em] text-stone-700"
              >
                Pincode
              </label>

              <input
                id="pincode"
                type="text"
                value={pincode}
                onChange={(event) => setPincode(event.target.value)}
                placeholder="411001"
                required
                className="mt-2 w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
              />
            </div>

            {/* PAYMENT */}
            <div className="mt-10 border-t border-stone-200 pt-8">

              <h2 className="font-serif text-2xl text-stone-900">
                Payment Method
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Choose how you would like to complete your order.
              </p>

              {/* UPI */}
              <label className="mt-6 flex cursor-pointer items-center gap-3 border border-stone-200 p-4 transition hover:border-stone-400">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={paymentMethod === "UPI"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />

                <span className="text-sm text-stone-800">
                  UPI
                </span>
              </label>

              {paymentMethod === "UPI" && (
                <div className="mt-4">
                  <label
                    htmlFor="upiId"
                    className="text-sm uppercase tracking-[0.15em] text-stone-700"
                  >
                    UPI ID
                  </label>

                  <input
                    id="upiId"
                    type="text"
                    value={upiId}
                    onChange={(event) => setUpiId(event.target.value)}
                    placeholder="example@upi"
                    className="mt-2 w-full border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
                  />

                  <p className="mt-2 text-xs text-stone-500">
                    Demo payment — no real transaction will occur.
                  </p>
                </div>
              )}

              {/* CARD */}
              <label className="mt-4 flex cursor-pointer items-center gap-3 border border-stone-200 p-4 transition hover:border-stone-400">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CARD"
                  checked={paymentMethod === "CARD"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />

                <span className="text-sm text-stone-800">
                  Credit / Debit Card
                </span>
              </label>

              {paymentMethod === "CARD" && (
                <div className="mt-4 space-y-4">

                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="text-sm uppercase tracking-[0.15em] text-stone-700"
                    >
                      Card Number
                    </label>

                    <input
                      id="cardNumber"
                      type="text"
                      inputMode="numeric"
                      maxLength="16"
                      value={cardNumber}
                      onChange={(event) =>
                        setCardNumber(
                          event.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="1234567812345678"
                      className="mt-2 w-full border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">

                    <div>
                      <label
                        htmlFor="expiry"
                        className="text-sm uppercase tracking-[0.15em] text-stone-700"
                      >
                        Expiry
                      </label>

                      <input
                        id="expiry"
                        type="text"
                        maxLength="5"
                        value={expiry}
                        onChange={(event) =>
                          setExpiry(event.target.value)
                        }
                        placeholder="MM/YY"
                        className="mt-2 w-full border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cvv"
                        className="text-sm uppercase tracking-[0.15em] text-stone-700"
                      >
                        CVV
                      </label>

                      <input
                        id="cvv"
                        type="password"
                        inputMode="numeric"
                        maxLength="3"
                        value={cvv}
                        onChange={(event) =>
                          setCvv(
                            event.target.value.replace(/\D/g, "")
                          )
                        }
                        placeholder="123"
                        className="mt-2 w-full border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
                      />
                    </div>

                  </div>

                  <p className="text-xs text-stone-500">
                    Demo payment — card details are not stored.
                  </p>

                </div>
              )}

              {/* COD */}
              <label className="mt-4 flex cursor-pointer items-center gap-3 border border-stone-200 p-4 transition hover:border-stone-400">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(event) =>
                    setPaymentMethod(event.target.value)
                  }
                />

                <span className="text-sm text-stone-800">
                  Cash on Delivery
                </span>
              </label>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-stone-900 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-500"
            >
              {loading
                ? paymentMethod === "COD"
                  ? "Placing Order..."
                  : "Processing Payment..."
                : paymentMethod === "COD"
                  ? "Place Order"
                  : `Pay ₹${totalAmount.toLocaleString("en-IN")}`}
            </button>

          </form>

          {/* ORDER SUMMARY */}
          <div className="h-fit bg-white p-7 shadow-sm md:p-8">

            <h2 className="font-serif text-2xl text-stone-900">
              Your Order
            </h2>

            <div className="mt-7">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 border-b border-stone-200 py-5 first:pt-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover"
                  />

                  <div className="flex-1">

                    <p className="text-base text-stone-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-stone-500">
                      Qty: {item.quantity}
                    </p>

                    <p className="mt-2 text-sm text-stone-700">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>

                  </div>
                </div>
              ))}

            </div>

            <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-6">

              <span className="text-sm uppercase tracking-[0.15em] text-stone-600">
                Total
              </span>

              <span className="font-serif text-2xl text-stone-900">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>

            </div>

          </div>

        </div>
      </div>
    </main>
  );
}

export default Checkout;