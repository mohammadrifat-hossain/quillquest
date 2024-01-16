'use client'
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import {toast} from 'react-hot-toast'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login_user, messageReset } from "@/redux/store/Reducers/AuthReducer";
import { useRouter } from "next/navigation";

const Login = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const {loader, successMessage, errorMessage} = useSelector(state => state.auth)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    //----use effects
    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageReset())
            setEmail("")
            setPassword("")
            router.push('/')
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageReset())
        }
    },[dispatch,successMessage,errorMessage,router])

    //----functions
    const handleLogin = (e) => {
        e.preventDefault()
        if(email && password){
            dispatch(login_user({
                email,
                password
            }))
        }else{
            toast.error('Please enter email or password')
        }
    }
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-[88vh] bg-white">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
                        LogIn
                    </span>
                    </h2>
                    <form>
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
                    <div className="flex items-center justify-center">
                        <button onClick={handleLogin} type="submit" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full duration-300 flex items-center justify-center">
                            {
                                loader ? <div className="rounded-full h-[24px] w-[24px] border-[5px] border-l-transparent animate-spin"></div>:<div>Login</div>
                            }
                        </button>
                    </div>
                    </form>
                    <p class="text-center text-gray-600 mt-6">Dont have an account? <Link href={'/register'} class="text-blue-500 hover:underline">Sign up</Link></p>
                    <div class="mt-4">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
