import React, { useState } from "react";
import googleImg from "../image/google.png"
import {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { MyRoutes } from "../backend/const";
// import { FaGoogle } from "lucide-react";
import ModalWithInput from "../components/inputModal";
import { getAuth } from "firebase/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("Error");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [IsInputModalOpen, setIsInputModalOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Login User
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        localStorage.setItem("token", userCredential.user.accessToken);
        // console.log("Logged in:", userCredential.user.accessToken);
      } else {
        // Signup User
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        localStorage.setItem("token", userCredential.user.accessToken);
        // console.log("Signed up:", userCredential.user);
      }
      navigate(MyRoutes.home);
    } catch (error) {
      console.error("Error logging in:", error.code);
      console.log("Error:", error.message);
      if (error.message) {
        // Handle API error response
        const errorMessage = error.message || "An unknown error occurred";
        openModal(errorMessage);
      } else {
        openModal("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("token", result.user.accessToken);
      // console.log("User Info:", result.user);
      navigate(MyRoutes.home);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // Handle API error response
        const errorMessage =
          error.response.data?.error?.message || "An unknown error occurred";
        openModal(errorMessage);
      } else {
        openModal("An unexpected error occurred. Please try again.");
      }
    }
  };

  function openModal(message) {
    setModalMessage(message);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  const handleSend = async (inputValue) => {
    try {
      console.log("User Input:", inputValue);
      await sendPasswordResetEmail(getAuth(), inputValue);
      setIsInputModalOpen(false);
      setModalTitle("");
      openModal("Password reset email sent! Check your inbox.");
      setModalTitle("Error");
    } catch (e) {
      console.error("Password Reset Error:", e);
      openModal(e.message);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-gray-900  text-white"
        style={{
          backgroundImage: `url('https://imgs.search.brave.com/vzTlNW86Nh73nheE9aSHAwHCxN3_dWrsnmmIXSFsaZY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvbW92aWUtOXB2/bWR0dno0Y2IweGwz/Ny5qcGc')`,
        }}
      >
        <div className="flex flex-col items-center justify-center h-screen w-full bg-[#0000007e]">
        <h1 className="text-7xl text-amber-200 text-center ">MEGA MOVIES</h1>
        <p className="mb-15 text-amber-100">Get all Details about Movies</p>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-semibold text-center text-yellow-400">
            Let's {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full mt-1 p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between text-sm">
              <button
                type="button"
                className="text-yellow-400 hover:underline"
                onClick={() => {
                  setIsInputModalOpen(true);
                }}
              >
                Forgot password?
              </button>
              <button
                type="button"
                className="text-yellow-400 hover:underline"
                onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <div className="flex items-center justify-center mt-6">
            <div className="border-t border-gray-600 w-1/3"></div>
            <span className="mx-2 text-sm text-gray-400">OR</span>
            <div className="border-t border-gray-600 w-1/3"></div>
          </div>
          <button
            className="mt-4 w-full flex items-center justify-center bg-white text-gray-900 py-2 rounded hover:bg-gray-300 font-semibold"
            onClick={handleGoogleSignIn}
          >
            <img src={googleImg} className="h-6 w-6 mr-2" alt="" />
            Sign up with google
          </button>
        </div>
        </div>
      </div>
      {/* Reusable Modal with Input */}
      <ModalWithInput
        isOpen={IsInputModalOpen}
        onClose={() => setIsInputModalOpen(false)}
        onSend={handleSend}
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000088]">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-semibold">{modalTitle}</h2>
            <p className="mt-2">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginPage;
