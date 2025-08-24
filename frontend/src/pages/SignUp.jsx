import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/Slice/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate("/", { state: { showToast: true } });
      toast.success("Registered Successfully!");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
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
        className="mx-auto my-10 overflow-hidden shadow-lg border rounded-lg max-w-xl border-base-300"
      >
        <div className="flex items-center justify-center bg-base-100 p-6 lg:px-10 lg:py-10 md:px-8 md:py-8 sm:px-6 sm:py-10">
          <div className="md:max-w-md w-full">
            <form onSubmit={handleSignIn} className="space-y-4">
              <h2 className="text-3xl font-bold text-base-content">
                Create your account
              </h2>
              <p className="text-sm mt-2 text-base-content/70">
                Sign up using the form or Google account
              </p>

              <div className="relative">
                <div>
                  <User className=" z-10 w-5 h-5 absolute left-3 top-10 text-base-content/60" />
                  <label className="block font-semibold text-base-content mb-2">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    className="input  w-full pl-10 rounded-3xl focus:outline-none focus:ring-1 focus:ring-neutral-300 "
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="z-10 w-5 h-5 absolute left-3 top-11 text-base-content/60" />

                <label className="block font-semibold mb-2">Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input w-full pl-10 rounded-3xl focus:outline-none focus:ring-1 focus:ring-neutral-300 "
                />
              </div>

              <div className="relative">
                <label className="block font-semibold text-base-content mb-2">
                  Password
                </label>
                <Lock className="z-10 w-5 h-5 absolute left-3 top-10  text-base-content/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input focus:outline-none focus:ring-1 focus:ring-neutral-300  w-full pl-10 rounded-3xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-base-content/60"
                >
                  {showPassword ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeClosed className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex gap-2 items-center cursor-pointer">
                  <input type="checkbox" className="checkbox checkbox-sm" />
                  <span>Remember Me</span>
                </label>
                <button type="button" className="link link-neutral">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isSigningUp}
                className="btn btn-neutral hover:bg-neutral-800 w-full rounded-2xl"
              >
                {isSigningUp ? "Signing up..." : "Signup"}
              </button>

              <div className="flex items-center gap-2 text-base-content/60 text-sm">
                <span className="h-px flex-1 bg-base-300"></span>
                <span>Or sign up with</span>
                <span className="h-px flex-1 bg-base-300"></span>
              </div>

              <button className="btn btn-outline w-full rounded-2xl flex items-center gap-2">
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="google"
                />
                <span>Sign up with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
