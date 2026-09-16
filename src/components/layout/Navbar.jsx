import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import CartContext from "../../context/CartContext";
import LogoutButton from "../auth/LogoutButton";

function Navbar() {
  const { user } = useContext(AuthContext);
  const { cartItemCount } = useContext(CartContext);

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const accountMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setShowAccountMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="border-b border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-6 py-4">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link
            to="/shop"
            className="text-base text-stone-700 transition hover:text-stone-900"
          >
            Shop
          </Link>

          <Link
            to="/about"
            className="text-base text-stone-700 transition hover:text-stone-900"
          >
            Our Story
          </Link>
        </div>

        {/* CENTER */}
        <Link to="/" className="text-center">
          <div className="font-serif text-4xl tracking-[0.12em] text-stone-900">
            SAURABHYA
          </div>

          <div className="mt-1 text-xs tracking-[0.2em] text-stone-500">
            Where Memories Become Fragrance
          </div>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center justify-end gap-5">
          {/* SEARCH */}
          <button
            type="button"
            className="text-base text-stone-700 transition hover:text-stone-900"
          >
            Search
          </button>

          {/* ACCOUNT */}
          {user ? (
            <div ref={accountMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-2 text-base text-stone-700 transition hover:text-stone-900"
              >
                Hi, {user.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`h-4 w-4 transition-transform ${
                    showAccountMenu ? "rotate-180" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {/* DROPDOWN */}
              {showAccountMenu && (
                <div className="absolute right-0 top-full z-40 mt-3 w-48 border border-stone-200 bg-stone-50 py-2 shadow-lg">
                  <Link
                    to="/account"
                    onClick={() => setShowAccountMenu(false)}
                    className="block px-5 py-3 text-sm text-stone-700 transition hover:bg-stone-100 hover:text-stone-900"
                  >
                    My Account
                  </Link>

                  <div className="border-t border-stone-200">
                    <LogoutButton className="block w-full px-5 py-3 text-left text-sm text-stone-700 transition hover:bg-stone-100 hover:text-stone-900" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="text-base text-stone-700 transition hover:text-stone-900"
            >
              Account
            </Link>
          )}

          {/* CART */}
          <Link
            to="/cart"
            aria-label={`Cart with ${cartItemCount} items`}
            className="relative flex items-center text-stone-700 transition hover:text-stone-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75l3-8.25H5.106M7.5 14.25 5.106 5.272M7.5 14.25l-1.5 2.25m1.5-2.25h9.75m0 0 1.5 2.25M6 18.75a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm9.75 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Z"
              />
            </svg>

            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 text-[10px] font-medium text-white">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
