import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      login(data.token, data.user);

      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-112px)] bg-stone-100 px-6 py-16">
      <div className="mx-auto max-w-md">

        {/* Heading */}
        <div className="text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-stone-600">
            Welcome Back
          </p>

          <h1 className="mt-3 font-serif text-5xl text-stone-900">
            Sign In
          </h1>

          <p className="mt-4 text-base leading-7 text-stone-700">
            Sign in to continue your SAURABHYA journey.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-white p-7 shadow-sm md:p-9"
        >

          {/* Error */}
          {error && (
            <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm uppercase tracking-[0.15em] text-stone-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              required
              className="mt-2 w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label
              htmlFor="password"
              className="text-sm uppercase tracking-[0.15em] text-stone-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
              className="mt-2 w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full bg-stone-900 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-500"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-stone-700">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-stone-900 underline underline-offset-4"
            >
              Create one
            </Link>
          </p>

        </form>

      </div>
    </main>
  );
}

export default Login;