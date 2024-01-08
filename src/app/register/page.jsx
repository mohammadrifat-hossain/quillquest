'use client'
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaLock, FaIdCard  } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { messageReset, register_user } from "@/redux/store/Reducers/AuthReducer";
import { useRouter } from "next/navigation";

const Register = () => {
    const router = useRouter()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    

    const dispatch = useDispatch()
    const { successMessage, errorMessage, loader } = useSelector(state => state.auth)

    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageReset())
            setName("")
            setEmail("")
            setConfirmPassword("")
            setPassword("")
            router.push('/')
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageReset())
        }
    },[dispatch,successMessage,errorMessage,router])

    //----functions--------------------------------

    const handleRegister = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            toast.error("password and confirm password do not match")
        }else{
            if(email && password){
                dispatch(register_user({
                    name,
                    email,
                    password
                }))
            }else{
                toast.error("please enter email and password")
            }
        }
    }
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-[88vh] bg-white">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
                        Register
                    </span>
                    </h2>
                    <form>
                    <div className="mb-6">
                        <label htmlFor="name" className="text-gray-700 text-sm font-bold mb-2 flex items-center justify-start gap-1">
                            <FaIdCard />Full Name
                        </label>
                        <div>
                            <input id="name" type="text" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your Full name" value={name} onChange={e=> setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="text-gray-700 text-sm font-bold mb-2 flex items-center justify-start gap-1">
                            <IoMail/>Email
                        </label>
                        <div>
                            <input id="email" type="email" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your email" value={email} onChange={e=> setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="text-gray-700 text-sm font-bold mb-2 flex items-center justify-start gap-1">
                            <FaLock/>Password
                        </label>
                        <div>
                            <input id="password" type="password" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter your password" value={password} onChange={e=> setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmpassword" className="text-gray-700 text-sm font-bold mb-2 flex items-center justify-start gap-1">
                            <FaLock/>Confirm Password
                        </label>
                        <div>
                            <input id="confirmpassword" type="password" className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Re-enter your password" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={handleRegister} type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full duration-300 flex items-center justify-center">
                            {
                                loader ? <div className="rounded-full h-[24px] w-[24px] border-[5px] border-l-transparent animate-spin"></div>:<div>Register</div>
                            }
                        </button>
                    </div>
                    </form>
                    <p className="text-center text-gray-600 mt-6">Already have an account? <Link href={'/login'} className="text-blue-500 hover:underline">Sign in</Link></p>
                    <div className="mt-4">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
