'use client'
import Header from '@/app/components/Header'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import {Helmet} from 'react-helmet'
import {useDispatch, useSelector} from 'react-redux'
import { add_comment, add_like, get_content, messageReset } from '@/redux/store/Reducers/AuthReducer';
import moment from 'moment';
import LinearProgress from '@mui/material/LinearProgress';
import {motion} from 'framer-motion'
import { FaRegHeart } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';




const Content = ({params:{contentid}}) => {
    const dispatch = useDispatch()
    const {currentContent, userInfo, successMessage,errorMessage} = useSelector(state => state.auth)
    const [comment, setComment] = useState('')
    const router = useRouter()


    //-----use effects
    
    useEffect(()=>{
        dispatch(get_content({contentid}))
    },[contentid,dispatch])

    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageReset())
            setComment('')
            dispatch(get_content({contentid}))
        }
        if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageReset())
        }
    },[dispatch,successMessage,errorMessage,router,contentid])
    

    //----functions

    const handleAddComment = async (e) =>{
        e.preventDefault()
        if(userInfo.id){
            dispatch(add_comment({
                contentid,
                comment,
                username: userInfo?.name,
                userInfo
            }))
        }else{
            router.push('/login')
        }
        
    }
    
    const handleLike = async (e) =>{
        e.preventDefault()
        if(userInfo.id){
            dispatch(add_like({
                userId: userInfo?.id,
                contentid
            }))
        }else{
            router.push('/login')
        }
    }
    return (
        <div className='pb-6 bg-white'>
            <Header />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{currentContent?.title}</title>
                <meta name="description" content={currentContent?.content} />
            </Helmet>
            <div className='max-w-[1600px] mx-auto bg-white'>
                
                {
                    !currentContent?.userName ? <div className='p-5 mt-10'>
                        <LinearProgress />
                    </div>:<div className='w-full'>
                        <motion.div initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5}} className='w-full h-[120px] relative p-2 z-10'>
                            <Image height={600} width={600} alt='banner' src={currentContent?.imageUrl} className='w-full absolute bottom-0 left-0 brightness-50'/>
                            <div className='relative flex items-center justify-start h-full pl-5 '>
                                <h1><FaChevronLeft className='text-2xl cursor-pointer'/></h1>
                            </div>
                        </motion.div>
                        <motion.div className='text-black'>
                            <motion.div initial={{y:-100,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:0.5, delay:0.5}} className='bg-[#b3b3b371] p-4 rounded-lg my-1 -z-[1]'>
                                <div>
                                    <p>Author: <span>{currentContent?.userName}</span></p>
                                    <p>Posted: <span>{moment(currentContent?.createdAt).fromNow()}</span></p>
                                </div>
                            </motion.div>
                            <div className='m-2'>
                                <Image height={600} width={600} alt='contentimage' src={currentContent?.imageUrl} className=''/>
                            </div>
                            <div className='p-2 flex items-center justify-start gap-2'>
                                <p>Title:</p>
                                <h1 className='text-xl font-bold'>{currentContent?.title}</h1>
                            </div>
                        </motion.div>
                        <div className='text-black p-1 bg-[#cacaca6e] m-2' dangerouslySetInnerHTML={{ __html: currentContent?.content }}/>
                        <div className='w-full p-3 text-black'>
                            <div>
                                <div className='px-3 py-2 border border-[#c7c7c762] rounded-md'>
                                    <div className='flex items-center justify-start gap-2 text-4xl'>
                                        <span>{currentContent?.likes?.length > 0 ? currentContent?.likes?.length : 0}</span>
                                        <span><FaRegHeart onClick={handleLike} className={` cursor-pointer ${currentContent?.likes.some(item => item.userid.includes(userInfo.id)) ? 'text-red-600':'text-black'}`}/></span>
                                    </div>
                                </div>
                                <div className='px-3 py-2 border border-[#c7c7c762] rounded-md mt-4'>
                                    <input type="text" value={comment} onChange={e=> setComment(e.target.value)} placeholder='Add Comment' className='px-5 py-2 rounded-full border border-[#c7c7c762] outline-none'/>
                                    <button onClick={handleAddComment} className='px-5 py-2 rounded-full bg-indigo-400 text-white font-bold ml-2 my-3'>
                                        Add Comment
                                    </button>
                                </div>
                                <div className='px-3 py-2 border border-[#c7c7c762] rounded-md mt-4 max-h-[400px] overflow-scroll'>
                                    {
                                        currentContent?.comments?.length > 0 ? currentContent?.comments?.slice().reverse().map((item,i)=>(
                                            <div className='flex items-center justify-start gap-3 bg-[#8f8f8f70] p-3 rounded-lg my-2' key={i}>
                                                <div>
                                                    <Link href={`/user/${item.userInfo.id}`} className='text-xl font-bold'>{item.username}</Link>
                                                    <p className='text-[#6464646c]'>{moment(item.addedat).fromNow()}</p>
                                                </div>
                                                <div className='bg-white p-2 rounded-lg'>
                                                    <p>{item.comment}</p>
                                                </div>
                                            </div>
                                        )):<div className='w-full'>
                                            <h1>No Comment</h1>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Content