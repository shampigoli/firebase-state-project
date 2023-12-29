import React, { useState } from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/GoogleAuthenicate/OAuth";
import {createUserWithEmailAndPassword, getAuth ,updateProfile} from 'firebase/auth' 
import {db} from '../firebase'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
const Register = () => {
  const navigate= useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });
  const { email, password,name } = formData;
  function onchange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
 async function onSubmit(e){
    e.preventDefault();
    try {
      const auth =getAuth()
      const userCredential =await createUserWithEmailAndPassword(auth,email,password)
      updateProfile(auth.currentUser,{
        displayName:name
      })
      const user = userCredential.user;
      const formDataCopy= {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp=serverTimestamp();
      await setDoc(doc(db, "users",user.uid), formDataCopy)
      toast.success("Registered Successfully!")
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in registration")
    }
  }
  return (
    <section>
      <h1 className="text-3xl font-bold md:text-4xl text-center mt-5">
        Sign Up
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
              type="text"
              placeholder="Full Name"
              className="mb-6 w-full border-black p-3 border-[1.5px] rounded focus:border-gray-400  text-gray-400 outline-none transition ease-in-out"
              id="name"
              value={name}
              required
              onChange={onchange}
            />
            <input
              type="email"
              placeholder="Email address"
              className="mb-6 w-full border-black p-3 border-[1.5px] rounded focus:border-gray-400  text-gray-400 outline-none transition ease-in-out"
              id="email"
              value={email}
              required
              onChange={onchange}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="mb-6 w-full border-black p-3 border-[1.5px] rounded focus:border-gray-400  text-gray-400 outline-none transition ease-in-out"
                id="password"
                value={password}
                required
                onChange={onchange}
              />
              {showPassword ? <RiEyeOffFill onClick={()=> setShowPassword((prevState)=>!prevState)} className="absolute right-4 top-4 text-xl cursor-pointer" /> : <RiEyeFill onClick={()=> setShowPassword((prevState)=>!prevState)} className="absolute right-4 top-4 text-xl cursor-pointer"/>}
            </div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-md tracking-normal">Have an account? <Link to='/sign-in' className="text-red-600 transition duration-200 ease-in-out">Login</Link></h2>
              </div>
              <div>
                <Link to='/forgot-password' className="text-blue-600 transition duration-200 ease-in-out">Forgot Password?</Link>
              </div>
            </div>
          <button type="submit" className="mb-6 w-full bg-blue-600 text-white text-md p-3 rounded border-none outline-none hover:bg-blue-700 shadow-md hover:shadow-lg uppercase transition ease-in-out duration-150 active:bg-blue-800">Register</button>
          <div className=" before:border-t flex before:flex-1 before:border-gray-400 items-center after:border-t after:border-gray-400 after:flex-1 mb-5">
            <p className="text-center font-semibold mx-4 ">OR</p>
          </div>
          <OAuth/>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Register
