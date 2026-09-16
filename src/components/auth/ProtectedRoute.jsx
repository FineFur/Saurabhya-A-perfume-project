import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <main className="flex min-h-[calc(100vh-112px)] items-center justify-center bg-stone-100">
        <p className="text-sm text-stone-600">
          Loading your account...
        </p>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;