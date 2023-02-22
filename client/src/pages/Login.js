import React from "react";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/bazarSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
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
  return (
    <div className="w-full flex items-center justify-center gap-10 py-20">
      <button
        onClick={handleLogin}
        className="bg-black text-white text-base py-2 px-6 tracking-wide hover:bg-gray-800 duration-300"
      >
        Google Login
      </button>
      <button
        onClick={handleSignOut}
        className="bg-black text-white text-base py-2 px-6 tracking-wide hover:bg-gray-800 duration-300"
      >
        Sign Out
      </button>
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
