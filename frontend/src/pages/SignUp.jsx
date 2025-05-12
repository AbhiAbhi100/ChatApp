import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../main";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { userName, email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/profile");
    } catch (error) {
      setErr(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f6f9ff] to-[#fdfcff] p-4">
      <div className="w-full max-w-md bg-white rounded-[20px] shadow-xl p-6">
        {/* Top Icon */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-[100px] h-[100px] bg-[#e6f9ff] rounded-full flex items-center justify-center mb-4">
            {/* Chat Bubble Icon (placeholder emoji or image) */}
            <span className="text-4xl">💬</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-600">Sign Up</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-4 top-3 text-blue-500 cursor-pointer text-sm"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "Hide" : "Show"}
            </span>
          </div>

          {err && <p className="text-red-500 text-sm">*{err}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#20c7ff] hover:bg-[#18b3e5] text-white font-semibold py-3 rounded-full transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="text-[#20c7ff] font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
