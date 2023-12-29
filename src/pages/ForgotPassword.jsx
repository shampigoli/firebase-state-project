import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/GoogleAuthenicate/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email,setEmail] =useState("")
  function onChange(e){
    setEmail(e.target.value)
  }
  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth =getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success("Email was updated")
    } catch (error) {
      toast.error("Could not update user")
    }
  }
  return (
    <section>
      <h1 className="text-3xl font-bold md:text-4xl text-center mt-5">
      Forgot Password
            </h1>
      <div className=" mt-6 justify-center flex gap-0 flex-wrap max-w-6xl mx-auto">
        <div className="mb-12 md:mb-6 md:w-[67%] lg:w-[50%]">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fHww"
            alt=""
            className="lg:w-[80%] w-[90%] mx-auto rounded-3xl"
          />
        </div>
        <div className="mb-12 md:mb-6 md:w-[67%] lg:w-[38%] w-[90%] mx-auto">
          <form onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email address"
              className="mb-6 w-full border-black p-3 border-[1.5px] rounded focus:border-gray-400  text-gray-400 outline-none transition ease-in-out"
              id="email"
              value={email}
              required
              onChange={onChange}
            />
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-md tracking-normal">Don't have an account? <Link to='/sign-up' className="text-red-600 transition duration-200 ease-in-out">Register</Link></h2>
              </div>
              <div>
                <Link to='/sign-in' className="text-blue-600 transition duration-200 ease-in-out">Sign in instead</Link>
              </div>
            </div>
          <button type="submit" className="mb-6 w-full bg-blue-600 text-white text-md p-3 rounded border-none outline-none hover:bg-blue-700 shadow-md hover:shadow-lg uppercase transition ease-in-out duration-150 active:bg-blue-800">Send Resend Password</button>
          <div className=" before:border-t flex before:flex-1 before:border-gray-400 items-center after:border-t after:border-gray-400 after:flex-1 mb-5">
            <p className="text-center font-semibold mx-4 ">OR</p>
          </div>
          <OAuth/>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
