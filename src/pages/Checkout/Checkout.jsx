import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import CartContext from "../../context/CartContext";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  const [payment, setPayment] = useState({
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // --------------------------------
  // HANDLE SHIPPING INPUT
  // --------------------------------

  function handleShippingChange(event) {
    const { name, value } = event.target;

    let newValue = value;

    // Phone: numbers only, maximum 10 digits
    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Pincode: numbers only, maximum 6 digits
    if (name === "pincode") {
      newValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setShipping((current) => ({
      ...current,
      [name]: newValue,
    }));

    // Remove error when user starts correcting the field
    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  // --------------------------------
  // HANDLE PAYMENT INPUT
  // --------------------------------

  function handlePaymentChange(event) {
    const { name, value } = event.target;

    let newValue = value;

    // Card number: numbers only, maximum 16 digits
    if (name === "cardNumber") {
      newValue = value.replace(/\D/g, "").slice(0, 16);
    }

    // CVV: numbers only, maximum 3 digits
    if (name === "cvv") {
      newValue = value.replace(/\D/g, "").slice(0, 3);
    }

    // Expiry: automatically add /
    if (name === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);

      if (digits.length >= 3) {
        newValue = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      } else {
        newValue = digits;
      }
    }

    setPayment((current) => ({
      ...current,
      [name]: newValue,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  // --------------------------------
  // VALIDATE SHIPPING
  // --------------------------------

  function validateShipping() {
    const newErrors = {};

    const name = shipping.name.trim();
    const phone = shipping.phone.trim();
    const address = shipping.address.trim();
    const city = shipping.city.trim();
    const state = shipping.state.trim();
    const pincode = shipping.pincode.trim();

    if (!name) {
      newErrors.name = "Full name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      newErrors.name = "Please enter a valid name.";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!address) {
      newErrors.address = "Address is required.";
    } else if (address.length < 10) {
      newErrors.address = "Address must contain at least 10 characters.";
    }

    if (!city) {
      newErrors.city = "City is required.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(city)) {
      newErrors.city = "Please enter a valid city.";
    }

    if (!state) {
      newErrors.state = "State is required.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(state)) {
      newErrors.state = "Please enter a valid state.";
    }

    if (!pincode) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = "Pincode must contain exactly 6 digits.";
    }

    return newErrors;
  }

  // --------------------------------
  // VALIDATE PAYMENT
  // --------------------------------

  function validatePayment() {
    const newErrors = {};

    if (paymentMethod === "UPI") {
      const upiId = payment.upiId.trim();

      if (!upiId) {
        newErrors.upiId = "UPI ID is required.";
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/.test(upiId)) {
        newErrors.upiId = "Enter a valid UPI ID, e.g. name@upi.";
      }
    }

    if (paymentMethod === "Card") {
      const cardNumber = payment.cardNumber.replace(/\s/g, "");
      const expiry = payment.expiry;
      const cvv = payment.cvv;

      if (!cardNumber) {
        newErrors.cardNumber = "Card number is required.";
      } else if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.cardNumber = "Card number must contain exactly 16 digits.";
      }

      if (!expiry) {
        newErrors.expiry = "Expiry date is required.";
      } else if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        newErrors.expiry = "Enter expiry in MM/YY format.";
      } else {
        const [monthString, yearString] = expiry.split("/");

        const month = Number(monthString);
        const year = Number(`20${yearString}`);

        if (month < 1 || month > 12) {
          newErrors.expiry = "Enter a valid expiry month.";
        } else {
          const now = new Date();

          const currentMonth = now.getMonth() + 1;
          const currentYear = now.getFullYear();

          if (
            year < currentYear ||
            (year === currentYear && month < currentMonth)
          ) {
            newErrors.expiry = "Card expiry date has passed.";
          }
        }
      }

      if (!cvv) {
        newErrors.cvv = "CVV is required.";
      } else if (!/^\d{3}$/.test(cvv)) {
        newErrors.cvv = "CVV must contain exactly 3 digits.";
      }
    }

    return newErrors;
  }

  // --------------------------------
  // SUBMIT ORDER
  // --------------------------------

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitError("");

    // Cart validation
    if (cartItems.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    const shippingErrors = validateShipping();
    const paymentErrors = validatePayment();

    const allErrors = {
      ...shippingErrors,
      ...paymentErrors,
    };

    setErrors(allErrors);

    // Stop if validation failed
    if (Object.keys(allErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
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
          shippingAddress: shipping,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to place order.");
      }

      // Simulate payment processing
      if (paymentMethod !== "COD") {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      clearCart();

      navigate("/order-confirmation", {
        state: {
          order: data.order,
        },
      });
    } catch (error) {
      setSubmitError(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  // --------------------------------
  // EMPTY CART
  // --------------------------------

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="font-serif text-4xl text-stone-900">
          Your cart is empty
        </h1>

        <p className="mt-4 text-stone-600">
          Add a fragrance before proceeding to checkout.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-8 border-b border-stone-900 pb-1 text-sm uppercase tracking-wide text-stone-900"
        >
          Return to Collection
        </button>
      </main>
    );
  }

  // --------------------------------
  // TOTAL
  // --------------------------------

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">

        {/* =========================
            CHECKOUT FORM
        ========================== */}

        <form onSubmit={handleSubmit}>
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            SAURABHYA
          </p>

          <h1 className="mt-3 font-serif text-5xl text-stone-900">
            Checkout
          </h1>

          {/* SHIPPING */}

          <section className="mt-12">
            <h2 className="font-serif text-2xl text-stone-900">
              Shipping Information
            </h2>

            {/* NAME */}

            <div className="mt-6">
              <label className="text-sm text-stone-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={shipping.name}
                onChange={handleShippingChange}
                placeholder="Your full name"
                className={`mt-2 w-full border px-4 py-3 outline-none ${
                  errors.name
                    ? "border-red-400"
                    : "border-stone-300 focus:border-stone-900"
                }`}
              />

              {errors.name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* PHONE */}

            <div className="mt-5">
              <label className="text-sm text-stone-700">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={shipping.phone}
                onChange={handleShippingChange}
                placeholder="10-digit mobile number"
                inputMode="numeric"
                className={`mt-2 w-full border px-4 py-3 outline-none ${
                  errors.phone
                    ? "border-red-400"
                    : "border-stone-300 focus:border-stone-900"
                }`}
              />

              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* ADDRESS */}

            <div className="mt-5">
              <label className="text-sm text-stone-700">
                Address
              </label>

              <textarea
                name="address"
                value={shipping.address}
                onChange={handleShippingChange}
                placeholder="House / Flat, Street, Area"
                rows="4"
                className={`mt-2 w-full resize-none border px-4 py-3 outline-none ${
                  errors.address
                    ? "border-red-400"
                    : "border-stone-300 focus:border-stone-900"
                }`}
              />

              {errors.address && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.address}
                </p>
              )}
            </div>

            {/* CITY + STATE */}

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm text-stone-700">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={shipping.city}
                  onChange={handleShippingChange}
                  placeholder="City"
                  className={`mt-2 w-full border px-4 py-3 outline-none ${
                    errors.city
                      ? "border-red-400"
                      : "border-stone-300 focus:border-stone-900"
                  }`}
                />

                {errors.city && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-stone-700">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={shipping.state}
                  onChange={handleShippingChange}
                  placeholder="State"
                  className={`mt-2 w-full border px-4 py-3 outline-none ${
                    errors.state
                      ? "border-red-400"
                      : "border-stone-300 focus:border-stone-900"
                  }`}
                />

                {errors.state && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            {/* PINCODE */}

            <div className="mt-5">
              <label className="text-sm text-stone-700">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={shipping.pincode}
                onChange={handleShippingChange}
                placeholder="6-digit pincode"
                inputMode="numeric"
                className={`mt-2 w-full border px-4 py-3 outline-none ${
                  errors.pincode
                    ? "border-red-400"
                    : "border-stone-300 focus:border-stone-900"
                }`}
              />

              {errors.pincode && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.pincode}
                </p>
              )}
            </div>
          </section>

          {/* PAYMENT */}

          <section className="mt-14">
            <h2 className="font-serif text-2xl text-stone-900">
              Payment Method
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["UPI", "Card", "COD"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(method);
                    setErrors({});
                  }}
                  className={`border px-4 py-4 text-sm transition ${
                    paymentMethod === method
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-300 text-stone-700 hover:border-stone-500"
                  }`}
                >
                  {method === "COD"
                    ? "Cash on Delivery"
                    : method}
                </button>
              ))}
            </div>

            {/* UPI */}

            {paymentMethod === "UPI" && (
              <div className="mt-6">
                <label className="text-sm text-stone-700">
                  UPI ID
                </label>

                <input
                  type="text"
                  name="upiId"
                  value={payment.upiId}
                  onChange={handlePaymentChange}
                  placeholder="example@upi"
                  className={`mt-2 w-full border px-4 py-3 outline-none ${
                    errors.upiId
                      ? "border-red-400"
                      : "border-stone-300 focus:border-stone-900"
                  }`}
                />

                {errors.upiId && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.upiId}
                  </p>
                )}

                <p className="mt-2 text-xs text-stone-500">
                  Demo payment — no real transaction will occur.
                </p>
              </div>
            )}

            {/* CARD */}

            {paymentMethod === "Card" && (
              <div className="mt-6 space-y-5">
                <div>
                  <label className="text-sm text-stone-700">
                    Card Number
                  </label>

                  <input
                    type="text"
                    name="cardNumber"
                    value={payment.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="16-digit card number"
                    inputMode="numeric"
                    className={`mt-2 w-full border px-4 py-3 outline-none ${
                      errors.cardNumber
                        ? "border-red-400"
                        : "border-stone-300 focus:border-stone-900"
                    }`}
                  />

                  {errors.cardNumber && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm text-stone-700">
                      Expiry
                    </label>

                    <input
                      type="text"
                      name="expiry"
                      value={payment.expiry}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      inputMode="numeric"
                      className={`mt-2 w-full border px-4 py-3 outline-none ${
                        errors.expiry
                          ? "border-red-400"
                          : "border-stone-300 focus:border-stone-900"
                      }`}
                    />

                    {errors.expiry && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.expiry}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm text-stone-700">
                      CVV
                    </label>

                    <input
                      type="password"
                      name="cvv"
                      value={payment.cvv}
                      onChange={handlePaymentChange}
                      placeholder="CVV"
                      inputMode="numeric"
                      maxLength="3"
                      className={`mt-2 w-full border px-4 py-3 outline-none ${
                        errors.cvv
                          ? "border-red-400"
                          : "border-stone-300 focus:border-stone-900"
                      }`}
                    />

                    {errors.cvv && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-stone-500">
                  Demo payment — card details are not stored or processed.
                </p>
              </div>
            )}

            {/* COD */}

            {paymentMethod === "COD" && (
              <p className="mt-6 text-sm leading-6 text-stone-600">
                Pay in cash when your fragrance is delivered.
              </p>
            )}
          </section>

          {/* SUBMIT ERROR */}

          {submitError && (
            <div className="mt-8 border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
              {submitError}
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={submitting}
            className="mt-10 w-full bg-stone-900 py-4 text-sm uppercase tracking-wide text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Processing Payment..."
              : paymentMethod === "COD"
                ? "Place Order"
                : `Pay ₹${totalAmount.toLocaleString("en-IN")}`}
          </button>
        </form>

        {/* =========================
            ORDER SUMMARY
        ========================== */}

        <aside className="h-fit border border-stone-200 bg-stone-50 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
            Your Selection
          </p>

          <h2 className="mt-3 font-serif text-3xl text-stone-900">
            Order Summary
          </h2>

          <div className="mt-8 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 border-b border-stone-200 pb-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-20 object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-serif text-xl text-stone-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-stone-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-2 text-sm text-stone-700">
                    ₹
                    {(item.price * item.quantity).toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-stone-300 pt-6">
            <span className="text-sm uppercase tracking-wide text-stone-600">
              Total
            </span>

            <span className="font-serif text-2xl text-stone-900">
              ₹{totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;