import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import LogoutButton from "../../components/auth/LogoutButton";
import AuthContext from "../../context/AuthContext";
import { getMyOrders } from "../../features/orders/api/orderApi";
import { generateReceipt } from "../../utils/generateReceipt";

function Account() {
  const { user, updateUser } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  // Profile editing
  const [editingProfile, setEditingProfile] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  // Load orders
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

  // Load user information into the form
  useEffect(() => {
    if (!user) {
      return;
    }

    setProfile({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",
    });
  }, [user]);

  function formatOrderDate(date) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Handle profile input
  function handleProfileChange(event) {
    const { name, value } = event.target;

    let newValue = value;

    // Phone: numbers only
    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Pincode: numbers only
    if (name === "pincode") {
      newValue = value.replace(/\D/g, "").slice(0, 6);
    }

    setProfile((current) => ({
      ...current,
      [name]: newValue,
    }));

    setProfileErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setProfileMessage("");
  }

  // Validate profile
  function validateProfile() {
    const errors = {};

    const name = profile.name.trim();
    const phone = profile.phone.trim();
    const address = profile.address.trim();
    const city = profile.city.trim();
    const state = profile.state.trim();
    const pincode = profile.pincode.trim();

    if (!name) {
      errors.name = "Name is required.";
    } else if (name.length < 2) {
      errors.name = "Name must contain at least 2 characters.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      errors.name = "Please enter a valid name.";
    }

    if (!phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      errors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!address) {
      errors.address = "Address is required.";
    } else if (address.length < 10) {
      errors.address = "Address must contain at least 10 characters.";
    }

    if (!city) {
      errors.city = "City is required.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(city)) {
      errors.city = "Please enter a valid city.";
    }

    if (!state) {
      errors.state = "State is required.";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(state)) {
      errors.state = "Please enter a valid state.";
    }

    if (!pincode) {
      errors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(pincode)) {
      errors.pincode = "Pincode must contain exactly 6 digits.";
    }

    return errors;
  }

  // Save profile
  async function handleSaveProfile(event) {
    event.preventDefault();

    setProfileMessage("");

    const errors = validateProfile();

    setProfileErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setSavingProfile(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update profile.");
      }

      // Update AuthContext
      updateUser(data.user);

      setEditingProfile(false);
      setProfileErrors({});
      setProfileMessage("Your delivery details have been updated.");
    } catch (error) {
      setProfileMessage(error.message || "Unable to update your profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditingProfile(false);
    setProfileErrors({});

    setProfile({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      pincode: user.pincode || "",
    });
  }

  return (
    <main className="min-h-[calc(100vh-112px)] bg-stone-100 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* HEADING */}

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

        {/* ACCOUNT INFORMATION */}

        <div className="mt-12 bg-white p-8 shadow-sm md:p-10">
          {/* HEADER */}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-2xl text-stone-900">
                Account Information
              </h2>

              <p className="mt-2 text-sm text-stone-500">
                Manage your personal and delivery details.
              </p>
            </div>

            {!editingProfile && (
              <button
                type="button"
                onClick={() => {
                  setEditingProfile(true);
                  setProfileMessage("");
                }}
                className="border border-stone-300 px-5 py-3 text-sm uppercase tracking-[0.12em] text-stone-700 transition hover:bg-stone-100"
              >
                Edit Details
              </button>
            )}
          </div>

          {/* VIEW MODE */}

          {!editingProfile && (
            <>
              {/* Personal Information */}

              <div className="mt-8 border-t border-stone-200">
                <div className="border-b border-stone-200 py-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Name
                  </p>

                  <p className="mt-2 text-base text-stone-900">{user.name}</p>
                </div>

                <div className="border-b border-stone-200 py-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Email
                  </p>

                  <p className="mt-2 text-base text-stone-900">{user.email}</p>
                </div>
              </div>

              {/* Delivery Information */}

              <div className="mt-8">
                <h3 className="font-serif text-xl text-stone-900">
                  Delivery Information
                </h3>

                {!user.phone &&
                !user.address &&
                !user.city &&
                !user.state &&
                !user.pincode ? (
                  <div className="mt-5 border border-dashed border-stone-300 bg-stone-50 p-6">
                    <p className="text-sm leading-6 text-stone-600">
                      You haven't added your delivery details yet.
                    </p>

                    <button
                      type="button"
                      onClick={() => setEditingProfile(true)}
                      className="mt-4 border-b border-stone-900 pb-1 text-sm uppercase tracking-wide text-stone-900"
                    >
                      Add Delivery Details
                    </button>
                  </div>
                ) : (
                  <div className="mt-5 border-t border-stone-200">
                    <div className="border-b border-stone-200 py-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Phone
                      </p>

                      <p className="mt-2 text-base text-stone-900">
                        {user.phone}
                      </p>
                    </div>

                    <div className="border-b border-stone-200 py-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Address
                      </p>

                      <p className="mt-2 text-base leading-7 text-stone-900">
                        {user.address}
                      </p>
                    </div>

                    <div className="grid border-b border-stone-200 sm:grid-cols-3">
                      <div className="border-b border-stone-200 py-5 sm:border-b-0 sm:border-r sm:border-stone-200 sm:pr-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                          City
                        </p>

                        <p className="mt-2 text-base text-stone-900">
                          {user.city}
                        </p>
                      </div>

                      <div className="border-b border-stone-200 py-5 sm:border-b-0 sm:border-r sm:border-stone-200 sm:px-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                          State
                        </p>

                        <p className="mt-2 text-base text-stone-900">
                          {user.state}
                        </p>
                      </div>

                      <div className="py-5 sm:pl-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                          Pincode
                        </p>

                        <p className="mt-2 text-base text-stone-900">
                          {user.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* EDIT MODE */}

          {editingProfile && (
            <form
              onSubmit={handleSaveProfile}
              className="mt-8 border-t border-stone-200 pt-8"
            >
              {/* NAME */}

              <div>
                <label className="text-sm text-stone-700">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className={`mt-2 w-full border px-4 py-3 outline-none ${
                    profileErrors.name
                      ? "border-red-400"
                      : "border-stone-300 focus:border-stone-900"
                  }`}
                />

                {profileErrors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {profileErrors.name}
                  </p>
                )}
              </div>

              {/* EMAIL */}

              <div className="mt-5">
                <label className="text-sm text-stone-700">Email</label>

                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="mt-2 w-full cursor-not-allowed border border-stone-200 bg-stone-100 px-4 py-3 text-stone-500 outline-none"
                />

                <p className="mt-2 text-xs text-stone-500">
                  Email cannot be changed here.
                </p>
              </div>

              {/* PHONE */}

              <div className="mt-5">
                <label className="text-sm text-stone-700">Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  className={`mt-2 w-full border px-4 py-3 outline-none ${
                    profileErrors.phone
                      ? "border-red-400"
                      : "border-stone-300 focus:border-stone-900"
                  }`}
                />

                {profileErrors.phone && (
                  <p className="mt-2 text-sm text-red-600">
                    {profileErrors.phone}
                  </p>
                )}
              </div>

              {/* ADDRESS */}

              <div className="mt-5">
                <label className="text-sm text-stone-700">Address</label>

                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleProfileChange}
                  placeholder="House / Flat, Street, Area"
                  rows="4"
                  className={`mt-2 w-full resize-none border px-4 py-3 outline-none ${
                    profileErrors.address
                      ? "border-red-400"
                      : "border-stone-300 focus:border-stone-900"
                  }`}
                />

                {profileErrors.address && (
                  <p className="mt-2 text-sm text-red-600">
                    {profileErrors.address}
                  </p>
                )}
              </div>

              {/* CITY + STATE */}

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-stone-700">City</label>

                  <input
                    type="text"
                    name="city"
                    value={profile.city}
                    onChange={handleProfileChange}
                    className={`mt-2 w-full border px-4 py-3 outline-none ${
                      profileErrors.city
                        ? "border-red-400"
                        : "border-stone-300 focus:border-stone-900"
                    }`}
                  />

                  {profileErrors.city && (
                    <p className="mt-2 text-sm text-red-600">
                      {profileErrors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm text-stone-700">State</label>

                  <input
                    type="text"
                    name="state"
                    value={profile.state}
                    onChange={handleProfileChange}
                    className={`mt-2 w-full border border-stone-300 px-4 py-3 outline-none focus:border-stone-900 ${
                      profileErrors.state ? "border-red-400" : ""
                    }`}
                  />

                  {profileErrors.state && (
                    <p className="mt-2 text-sm text-red-600">
                      {profileErrors.state}
                    </p>
                  )}
                </div>
              </div>

              {/* PINCODE */}

              <div className="mt-5">
                <label className="text-sm text-stone-700">Pincode</label>

                <input
                  type="text"
                  name="pincode"
                  value={profile.pincode}
                  onChange={handleProfileChange}
                  placeholder="6-digit pincode"
                  inputMode="numeric"
                  className={`mt-2 w-full border px-4 py-3 outline-none ${
                    profileErrors.pincode
                      ? "border-red-400"
                      : "border-stone-300 focus:border-stone-900"
                  }`}
                />

                {profileErrors.pincode && (
                  <p className="mt-2 text-sm text-red-600">
                    {profileErrors.pincode}
                  </p>
                )}
              </div>

              {/* ACTIONS */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="flex-1 bg-stone-900 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={savingProfile}
                  className="flex-1 border border-stone-300 py-4 text-sm uppercase tracking-[0.15em] text-stone-700 transition hover:bg-stone-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* SUCCESS / ERROR MESSAGE */}

          {profileMessage && (
            <div className="mt-6 border border-stone-200 bg-stone-50 px-5 py-4 text-sm text-stone-700">
              {profileMessage}
            </div>
          )}

          {/* ACTIONS */}

          {!editingProfile && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="flex-1 bg-stone-900 py-4 text-center text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700"
              >
                Continue Shopping
              </Link>

              <LogoutButton className="flex-1 border border-stone-300 py-4 text-sm uppercase tracking-[0.15em] text-stone-700 transition hover:bg-stone-100" />
            </div>
          )}
        </div>

        {/* ORDERS */}

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

          {/* No Orders */}

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

                  {/* Order Footer */}

                  <div className="flex flex-col gap-5 border-t border-stone-200 pt-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Status
                      </p>

                      <p className="mt-1 text-sm text-stone-900">
                        {order.status}
                      </p>

                      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-stone-500">
                        Payment
                      </p>

                      <p className="mt-1 text-sm text-stone-900">
                        {order.paymentMethod || "Not available"}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Total
                      </p>

                      <p className="mt-1 font-serif text-2xl text-stone-900">
                        ₹{order.totalAmount.toLocaleString("en-IN")}
                      </p>

                      <button
                        type="button"
                        onClick={() => generateReceipt(order)}
                        className="mt-4 border-b border-stone-900 pb-1 text-xs uppercase tracking-[0.12em] text-stone-900 transition hover:text-stone-600"
                      >
                        Download Receipt
                      </button>
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
