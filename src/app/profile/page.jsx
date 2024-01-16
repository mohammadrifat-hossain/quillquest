'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdGrid } from "react-icons/io";
import {motion} from 'framer-motion'
import { CiLogout } from "react-icons/ci";
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { decodeToken, get_my_posts, get_profile_info, messageReset, upload_image } from '@/redux/store/Reducers/AuthReducer'
import Link from 'next/link'
import { MdOutlineFileUpload } from "react-icons/md";

const ProfilePage = () => {
    const {userInfo,myPosts, successMessage, errorMessage, loader, profileInfo} = useSelector(state => state.auth)
    const router = useRouter()
    const dispatch = useDispatch()
    const [imageOpen,setImageOpen] = useState(false)
    const [image,setImage] = useState('')

    //----use effects
    useEffect(()=>{
        dispatch(get_my_posts({myId:userInfo?.id}))
    },[userInfo,dispatch])

    useEffect(()=>{
        dispatch(get_profile_info({userId: userInfo?.id}))
    },[dispatch,userInfo])
    //----functions
    const handleLogout = (e) =>{
        localStorage.removeItem('blogToken')
        toast.success("Logout success")
        setTimeout(() => {
            router.push('/login')
        }, 1000);
    }
    useEffect(()=>{
        const local = localStorage.getItem('blogToken')
        if(local){
            dispatch(decodeToken(local))
        }
    },[dispatch])

    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageReset())
            setImageOpen(false)
            setImage('')
            location.reload()
        }
        if(errorMessage){
            toast.success(errorMessage)
            dispatch(messageReset())
        }
    },[successMessage,errorMessage,dispatch, router])

    const handleImage = (e) =>{
        const file = e.target.files[0]
        if(file){
            setImage(file)
            // const imgurl = URL.createObjectURL(file)
            const form = new FormData()
            form.append('image',file)
            form.append('userId',userInfo?.id)
            
            dispatch(upload_image(form))
        }
    }

    return (
        <div>
            <Header />
            <div className='bg-gradient-to-tr from-blue-900 via-teal-500 to-lime-500 min-h-screen'>
                <div className={`absolute w-full h-full bg-[#1111118a] z-[99] ${!imageOpen && 'hidden'}`}>
                    <div className='sm:h-[50%] h-[30%] bg-white flex items-center justify-center'>
                        <div className='relative border border-dashed rounded-md border-[#79797957] text-black h-[100px] w-[100px] flex flex-col items-center justify-center gap-3'>
                            {
                                loader ? "Uploading": <>
                                    <span className='text-center font-bold'>Upload Image</span>
                                    <span className='text-2xl'><MdOutlineFileUpload/></span>
                                    <input onChange={handleImage} type="file" className='absolute w-full h-full opacity-0'/>
                                </>
                            }
                        </div>
                    </div>
                    <div className='absolute w-full h-full'  onClick={()=> setImageOpen(false)}></div>
                </div>
                <div className='relative max-w-[1300px] mx-auto'>
                    <button onClick={handleLogout} className='absolute right-0 flex items-center justify-center gap-2 bg-[#ffffff33] px-3 py-1 rounded hover:bg-[#ffffff63] duration-200'><CiLogout/>LogOut</button>
                    <motion.div
                        initial={{y:20,opacity:0}}
                        animate={{y:0,opacity:1}}
                        transition={{duration:0.5}}
                        className="dark:!bg-navy-800 shadow-shadow-500 shadow-3xl rounded-primary relative mx-auto flex h-full w-full max-w-[550px] flex-col items-center bg-[#ffffff23] bg-cover bg-clip-border p-[16px] pt-8 dark:text-white dark:shadow-none text-black">
                        <div className=" relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover gradientbg" >
                            <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 cursor-pointer">
                                <Image onClick={()=> setImageOpen(true)} height={1000} width={1000} className="h-full w-full rounded-full" src={userInfo?.image} alt="profile" />
                            </div>
                        </div>
                        <div className="mt-16 flex flex-col items-center">
                            <h4 className="text-bluePrimary text-xl font-bold">{userInfo?.name}</h4>
                            <p className='text-slate-300'>@{userInfo?.username}</p>
                        </div>
                        <div className="mt-6 mb-3 flex gap-4 items-center justify-center md:!gap-14">
                            <div className="flex flex-col items-center justify-center">
                                <h3 className="text-bluePrimary text-2xl font-bold">{profileInfo?.posts?.length > 0 ? profileInfo?.posts?.length : 0}</h3>
                            <p className="text-lightSecondary text-sm font-normal">Posts</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h3 className="text-bluePrimary text-2xl font-bold">{profileInfo?.followers?.length > 0 ? profileInfo?.followers?.length : 0}</h3>
                            <p className="text-lightSecondary text-sm font-normal">Followers</p>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h3 className="text-bluePrimary text-2xl font-bold">{profileInfo?.following?.length > 0 ? profileInfo?.following?.length : 0}</h3>
                            <p className="text-lightSecondary text-sm font-normal">Following</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{y:-20,opacity:0}}
                        animate={{y:0,opacity:1}}
                        transition={{duration:0.5,delay:0.4}}
                        className='flex items-center justify-center p-3'>
                        <h1 className='text-4xl flex items-center justify-center'><IoMdGrid/>Posts</h1>
                    </motion.div>
                    <motion.div
                        initial={{y:-20,opacity:0}}
                        animate={{y:0,opacity:1}}
                        transition={{duration:0.5,delay:1}}
                        className="sm:columns-1 md:columns-3 columns-4 w-full">
                        {
                            myPosts?.length > 0 ? myPosts?.map((item,i)=>(
                                <Link href={`/content/${item._id}`} key={i} className="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20">
                                    <Image height={600} width={600} alt='img' className="w-full rounded-md" src={item.imageUrl} placeholder='blur' blurDataURL='https://img.freepik.com/free-vector/blurred-background-with-light-colors_1034-245.jpg?w=826&t=st=1705214616~exp=1705215216~hmac=d72b65803b141f0df637b0a5abba061f3025a747c43a51afa9bd41c3394c60ca'/>
                                    <div className="test__body absolute inset-0 md:p-1 p-8 text-white flex flex-col">
                                        <div className="relative">
                                            <h1 className="test__title text-3xl font-bold mb-3 sm:text-base">{item.title.slice(0,40)}</h1>
                                            <p className="test__author font-sm font-light">{userInfo?.userName}</p>
                                        </div>
                                        <div className="mt-auto">
                                            <span className="test__tag bg-white bg-opacity-60 py-1 px-4 rounded-md text-black">{item.userName}</span>
                                        </div>
                                    </div>
                                </Link>
                            )):<div className='w-full items-center justify-center my-3 '>
                                <h1 className='text-3xl'>You have no posts</h1>
                            </div>
                        }
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage