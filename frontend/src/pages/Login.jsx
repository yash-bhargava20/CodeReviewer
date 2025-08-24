import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/Slice/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/", { state: { showToast: true } });
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Toaster position="top-right" />
      <div
        data-theme="light"
        className="mx-auto my-10 max-w-xl card bg-base-100 shadow-lg border border-base-300"
      >
        <div className="flex items-center justify-center p-8 lg:p-10">
          <div className="md:max-w-md w-full">
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-3xl font-bold text-base-content">Login</h2>
              <p className="text-sm text-base-content/70">
                Sign in to your account
              </p>

              <div className="relative">
                <Mail className="z-10 w-5 h-5 absolute left-3 top-11 text-base-content/60" />

                <label className="block font-semibold mb-2">
                  {" "}
                  <span className="label-text">Email</span>
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input  focus:outline-none focus:ring-1 focus:ring-neutral-300 w-full pl-10 rounded-3xl"
                />
              </div>

              <div className="relative">
                <label className="block font-semibold mb-2">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <Lock className=" z-10 w-5 h-5 absolute left-3 top-3 text-base-content/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input w-full pl-10 rounded-3xl focus:outline-none focus:ring-1 focus:ring-neutral-300 "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-base-content/60"
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeClosed className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <label className="flex gap-2 cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span>Remember Me</span>
                </label>
                <button type="button" className="link link-ghost">
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="btn btn-neutral hover:bg-neutral-800 w-full rounded-2xl"
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </button>
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="link link-ghost">
                  Register
                </Link>
              </p>

              <div className="flex items-center gap-2 text-sm text-base-content/70">
                <span className="h-px flex-1 bg-gray-300"></span>
                <span>Sign in with Email</span>
                <span className="h-px flex-1 bg-gray-300"></span>
              </div>
              <button className="btn btn-outline w-full rounded-2xl flex items-center gap-2">
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="google"
                />
                <span>Sign in with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
