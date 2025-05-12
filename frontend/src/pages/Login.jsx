import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../main";
import { useDispatch } from "react-redux";
import { setSelectedUser, setUserData } from "../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      dispatch(setSelectedUser(null));
      navigate("/");
      setEmail("");
      setPassword("");
      setErr("");
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message || "Something went wrong");
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
            {/* Chat Icon Placeholder */}
            <span className="text-4xl">💬</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-600">
            Login to <span className="text-[#20c7ff]">Chatly</span>
          </h2>
        </div>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <span
              className="text-[#20c7ff] font-semibold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
