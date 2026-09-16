import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    // Check that passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/login");
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
            Begin Your Journey
          </p>

          <h1 className="mt-3 font-serif text-5xl text-stone-900">
            Create Account
          </h1>

          <p className="mt-4 text-base leading-7 text-stone-700">
            Create your SAURABHYA account and discover fragrances
            made to become memories.
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

          {/* Name */}
          <div>
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
              placeholder="Your full name"
              required
              className="mt-2 w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
            />
          </div>

          {/* Email */}
          <div className="mt-6">
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
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              required
              className="mt-2 w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-stone-900"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-6">
            <label
              htmlFor="confirmPassword"
              className="text-sm uppercase tracking-[0.15em] text-stone-700"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="Enter your password again"
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-stone-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-stone-900 underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}

export default Register;