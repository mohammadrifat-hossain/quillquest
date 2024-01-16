'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import { FaCheckCircle } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { follow, get_authors, get_profile_info, messageReset } from '@/redux/store/Reducers/AuthReducer';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {motion} from 'framer-motion'

const AuthorPage = () => {
    const {authors, userInfo, errorMessage, successMessage, loader, profileInfo} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [currentLoading, setCurrentLoading] = useState('')
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    //----effects
    useEffect(()=>{
        setIsLoading(true)
    },[])
    useEffect(()=>{
        dispatch(get_authors())
        setIsLoading(false)
    },[dispatch])

    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageReset())
            setCurrentLoading('')
            dispatch(get_profile_info({userId: userInfo?.id}))
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageReset())
            setCurrentLoading('')
        }
    },[dispatch,successMessage,errorMessage,userInfo])

    useEffect(()=>{
        setIsLoading(true)
        dispatch(get_profile_info({userId: userInfo?.id}))
        setIsLoading(false)
    },[dispatch,userInfo])

    //----funtions
    const handleFollow = (id) =>{
        setCurrentLoading(id)
        dispatch(follow({
            authorId: id,
            myId:userInfo?.id
        }))
    }
    if(isLoading){
        return(
            <div className='w-full h-screen flex items-center justify-center bg-white'>
                <div>
                    <Image height={600} width={600} alt='loading' src={'https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif'} className=''/>
                </div>
            </div>
        )
    }else{
        return (
            <div className=' bg-gradient-to-t from-[#02aab0] to-[#00cdac] min-h-screen'>
                <Header />
                <div className='max-w-[1600px] mx-auto py-5 px-2'>
                    <div>
                        <div className='grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 grid-cols-5 gap-2'>
                            {
                                authors?.length > 0 ? authors?.map((item,i)=>(
                                    <motion.div initial={{opacity:0,y:100}} animate={{opacity:1, y:0}} transition={{duration:0.5 , delay: 0.1*i}} className='w-auto relative rounded-lg  overflow-hidden' key={i}>
                                        <div className='w-full h-[200px] overflow-hidden relative'>
                                            <Image height={600} width={600} alt='user' src={'https://img.freepik.com/free-photo/gold-circle-with-dark-background_1340-36470.jpg?t=st=1705226969~exp=1705230569~hmac=a137088586e583aa0616c3399ffd5f0466180cc53c6b4c727b348fcba287f81c&w=1380'} className='absolute w-full blur'/>
                                            <div className='h-[150px] w-[150px] rounded-full overflow-hidden absolute bottom-0 border-[4px] shadow-lg'>
                                                <Image height={600} width={600} alt='user' src={item.image}/>
                                            </div>
                                        </div>
                                        <div className='p-3 bg-[#eee] text-black'>
                                            <h1 className='text-3xl font-bold flex items-center justify-start gap-2'>{item.name}<FaCheckCircle className='text-cyan-500'/></h1>
                                            <p className='text-slate-400'>@{item.username}</p>
                                        </div>
                                        <div className='w-full flex items-center justify-evenly p-3 bg-[#eee] text-black border-t border-b border-t-[#bbbbbb31] border-b-[#bbbbbb31]'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <span className='text-xl font-bold'>{item.followers.length}</span>
                                                <span className='text-slate-500'>Followers</span>
                                            </div>
                                            <div className='h-[30px] w-[1px] bg-slate-400 relative block'></div>
                                            <div className='flex flex-col items-center justify-center'>
                                                <span className='text-xl font-bold'>{item.posts.length}</span>
                                                <span className='text-slate-500'>Posts</span>
                                            </div>
                                        </div>
                                        <div className='p-3 bg-[#eee] text-black flex items-center justify-evenly'>
                                            <div className={`${item._id === userInfo?.id && 'hidden'} ${profileInfo?.following?.some(user =>user._id.includes(item._id)) && 'hidden'}`}>
                                                <button onClick={()=> handleFollow(item._id)} className='flex items-center justify-center gap-1 bg-cyan-600 text-white px-4 py-1 hover:bg-cyan-800 duration-200 rounded'>
                                                {
                                                    loader && currentLoading === item._id  ? <div className="rounded-full h-[24px] w-[24px] border-[5px] border-l-transparent animate-spin"></div>:<div className='flex items-center justify-center gap-1'><IoMdPersonAdd/>Follow</div>
                                                }
                                                </button>
                                            </div>
                                            <div>
                                                <Link href={`/user/${item._id}`} className='flex items-center justify-center gap-1 px-4 py-1 rounded border border-[#8d8d8d56] hover:bg-slate-300 duration-200'><FaUser/>Profile</Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )):<div>
                                    <h1 className='text-4xl font-bold'>No authors found</h1>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthorPage