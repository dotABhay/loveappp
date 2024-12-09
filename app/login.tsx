import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Import the auth object from firebaseConfig.js

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Handle sign-in
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      // You can redirect the user here if needed, using something like `useHistory` or `next/router`
    } catch (error: any) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className=" bg-cover bg-login bg-center w-full h-screen flex flex-col justify-center items-center relative">
      <div className="text-center mb-4">
          <h1 className="text-5xl font-bold text-pinkk-300 absolute top-10">Login</h1>
           <div
            className="bg-message bg-cover bg-contain bg-no-repeat text-pinkk-300 p-4 mb-5 mt-[-9rem] rounded-md h-[113px] flex items-center"
            >
                <p className="w-fit px-5 bg-pinkk-100 rounded-xl translate-y-[-180%] translate-x-[-24%] rotate-23 overflow-visible m-0">
                    System
                </p>
                <img src="/racoon.png" alt="Racoon" className="w-12 h-12 transform translate-x-[-200%] translate-y-[5%]" />
                <p className="w-full whitespace-normal break-words text-xl text-left translate-x-[-30%]">
                    Hello!! Please Login In to access the website.
                </p>

            </div>
        </div>
      <div className="relative z-10 flex flex-col justify-center items-center shadow-md p-6 bg-pinkk-25 bg-opacity-40 rounded-xl w-[328px] h-[340px]">
        
        {error && <p className="text-pinkk-300 text-sm">{error}</p>}

        <form onSubmit={handleLogin} className="w-full flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-lg border-t-[1px] text-pinkk-300 placeholder:text-pinkk-300 placeholder:text-sm border-b-[1px] border-l-2 border-r-2 border-pinkk-400 bg-transparent w-[250px]"
            />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-lg border-t-[1px] text-pinkk-300 placeholder:text-pinkk-300 placeholder:text-sm border-b-[1px] border-l-2 border-r-2 border-pinkk-400 bg-transparent w-[250px]"
             />
          <button
            type="submit"
            className="bg-pinkk-400 text-pinkk-300  self-center text-center text-2xl rounded-3xl mt-4 w-[140px] h-[40px] "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
