import React from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/bazarSlice";
import { useNavigate } from "react-router-dom";
import { githubLogo, googleLogo } from "../assets";

const Login = () => {
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  // ============== Google Login Start here =====================
  const handleLogin = () => {
    signInWithPopup(
      auth,
      provider.setCustomParameters({ prompt: "select_account" })
    )
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        dispatch(
          addUser({
            _id: user.uid,
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          })
        );
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
      });
  };
  // ============== Google Login End here =======================
  // ============== Logout Start here ===========================
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Log Out Successfully!");
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // ============== Logout End here =============================

  // ============== Github Login Start here =====================
  const githubLogin = (e) => {
    e.preventDefault();
  };
  // ============== Github Login End here =======================
  return (
    <div className="w-full flex flex-col items-center justify-center gap-10 py-20">
      <div className="w-full flex items-center justify-center gap-10">
        <div
          onClick={handleLogin}
          className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
        >
          <img className="w-8" src={googleLogo} alt="googleLogo" />
          <span className="text-sm text-gray-900"> Sign in with Google</span>
        </div>
        {userInfo && (
          <button
            onClick={handleSignOut}
            className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300"
          >
            Sign Out
          </button>
        )}
      </div>
      <div className="w-full flex items-center justify-center gap-10">
        <div
          onClick={githubLogin}
          className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300"
        >
          <img className="w-8" src={githubLogo} alt="githubLogo" />
          <span className="text-sm text-gray-900"> Sign in with Github</span>
        </div>
        {userInfo && (
          <button className="bg-black text-white text-base py-3 px-8 tracking-wide rounded-md hover:bg-gray-800 duration-300">
            Sign Out
          </button>
        )}
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
