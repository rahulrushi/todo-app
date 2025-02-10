import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validate = () => {
    const newErrors = {};

    if (!userData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(userData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(userData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await dispatch(register(userData));
    if (!result.error) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              className="border rounded w-full px-3 py-2"
              placeholder="Full name"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              className="border rounded w-full px-3 py-2"
              placeholder="Email address"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              className="border rounded w-full px-3 py-2"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              className="border rounded w-full px-3 py-2"
              placeholder="Confirm password"
              value={userData.confirmPassword}
              onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
