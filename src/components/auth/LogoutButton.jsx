import { useContext, useState } from "react";

import AuthContext from "../../context/AuthContext";

function LogoutButton({ className = "" }) {
  const { logout } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleLogout() {
    logout();

    setShowModal(false);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  return (
    <>
      {/* Logout Button */}
      <button
        onClick={() => setShowModal(true)}
        className={className}
      >
        Log Out
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 px-6">

          <div className="w-full max-w-md bg-stone-50 p-8 shadow-2xl">

            <div className="text-center">

              <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                SAURABHYA
              </p>

              <h2 className="mt-3 font-serif text-3xl text-stone-900">
                Leave your journey?
              </h2>

              <p className="mt-4 text-sm leading-6 text-stone-600">
                Are you sure you want to log out of your account?
              </p>

            </div>

            <div className="mt-8 flex gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-stone-300 py-3 text-sm text-stone-700 transition hover:bg-stone-100"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 bg-stone-900 py-3 text-sm text-white transition hover:bg-stone-700"
              >
                Log Out
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 w-[320px] border border-stone-200 bg-stone-50 px-6 py-5 shadow-xl">

          <div className="flex items-start gap-4">

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-sm text-stone-700">
              ✓
            </div>

            <div>
              <p className="text-sm text-stone-900">
                Logged Out
              </p>

              <p className="mt-1 text-sm text-stone-600">
                You have been logged out successfully.
              </p>
            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default LogoutButton;