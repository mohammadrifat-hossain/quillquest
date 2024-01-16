'use client'
import Header from '@/app/components/Header'
import { get_current_user } from '@/redux/store/Reducers/AuthReducer'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaCheck, FaCheckCircle } from 'react-icons/fa'
import { IoMdPersonAdd } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'

const SingleUser = ({params:{userid}}) => {
    const [datas, setDatas] = useState([])
    const dispatch = useDispatch()
    const {currentUser, profileInfo, userInfo} = useSelector(state => state.auth)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const getData = async () =>{
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await res.json()
        setDatas(result)
    }

    //----use effects
    useEffect(()=>{
        if(userid === userInfo.id ){
            router.push('/profile')
        }
    },[userid,userInfo,router])

    useEffect(()=>{
        setIsLoading(true)
        getData()
        setIsLoading(false)
    },[])
    
    useEffect(()=>{
        setIsLoading(true)
        dispatch(get_current_user({
            userId: userid
        }))
        setIsLoading(false)
    },[dispatch,userid])
    //----functions

    const handleFollow = (id) =>{
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
    }
    return (
        <div className='bg-white text-black min-h-screen'>
            <Header />
            <div className='max-w-[1600px] mx-auto py-4'>
                <div>
                    <div className='sm:w-auto relative rounded-lg w-[600px] overflow-hidden shadow'>
                        <div className='w-full h-[200px] overflow-hidden relative'>
                            <Image height={600} width={600} alt='user' src={'https://img.freepik.com/free-photo/gold-circle-with-dark-background_1340-36470.jpg?t=st=1705226969~exp=1705230569~hmac=a137088586e583aa0616c3399ffd5f0466180cc53c6b4c727b348fcba287f81c&w=1380'} className='absolute w-full blur'/>
                            <div className='h-[150px] w-[150px] rounded-full overflow-hidden absolute bottom-0 border-[4px] shadow-lg'>
                                <Image height={600} width={600} alt='user' src={currentUser?.image}/>
                            </div>
                        </div>
                        <div className='p-3 bg-[#fff] text-black'>
                            <h1 className='text-3xl font-bold flex items-center justify-start gap-2'>{currentUser?.name}<FaCheckCircle className='text-cyan-500'/></h1>
                            <p className='text-slate-400'>@{currentUser?.username}</p>
                        </div>
                        <div className='w-full flex items-center justify-evenly p-3 bg-[#fff] text-black border-t border-b border-t-[#bbbbbb31] border-b-[#bbbbbb31]'>
                            <div className='flex flex-col items-center justify-center'>
                                <span className='text-xl font-bold'>{currentUser?.followers?.length > 0 ? currentUser?.followers.length : 0}</span>
                                <span className='text-slate-500'>Followers</span>
                            </div>
                            <div className='h-[30px] w-[1px] bg-slate-400 relative block'></div>
                            <div className='flex flex-col items-center justify-center'>
                                <span className='text-xl font-bold'>{currentUser?.posts?.length > 0 ? currentUser?.posts.length : 0}</span>
                                <span className='text-slate-500'>Posts</span>
                            </div>
                        </div>
                        <div className='p-3 bg-[#fff] text-black flex items-center justify-evenly'>
                            <div className={`${profileInfo?.following?.some(user =>user._id.includes(currentUser?._id)) && 'hidden'}`}>
                                <button onClick={()=>handleFollow(currentUser?._id)} className='flex items-center justify-center gap-1 bg-cyan-600 text-white px-4 py-1 hover:bg-cyan-800 duration-200 rounded'><IoMdPersonAdd/> Follow</button>
                            </div>
                            <div className={`${profileInfo?.following?.some(user =>user._id.includes(currentUser?._id)) ? 'block': 'hidden'} `}>
                                <div className='flex items-center justify-center gap-1 bg-cyan-600 text-white px-4 py-1  rounded'><FaCheck/> Following</div>
                            </div>
                        </div>
                    </div>
                    {/* card end */}
                    <div className='py-6 flex gap-3'>
                        <span className=' w-[6px] rounded-sm bg-black relative'></span>
                        <h1 className='text-4xl font-bold'>POSTS</h1>
                    </div>
                    <motion.div
                        initial={{y:-20,opacity:0}}
                        animate={{y:0,opacity:1}}
                        transition={{duration:0.5,delay:1}}
                        className="sm:columns-1 md:columns-3 columns-4 w-full">
                        {
                            currentUser?.posts?.length > 0 ? currentUser?.posts?.map((item,i)=>(
                                <Link href={`/content/${item._id}`} key={i} className="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20">
                                    <Image height={600} width={600} alt='img' className="w-full rounded-md" src={item.imageUrl} placeholder='blur' blurDataURL='https://img.freepik.com/free-vector/blurred-background-with-light-colors_1034-245.jpg?w=826&t=st=1705214616~exp=1705215216~hmac=d72b65803b141f0df637b0a5abba061f3025a747c43a51afa9bd41c3394c60ca'/>
                                    <div className="test__body absolute inset-0 md:p-1 p-8 text-white flex flex-col">
                                        <div className="relative">
                                            <h1 className="test__title text-3xl font-bold mb-3 sm:text-base">{item.title.slice(0,40)}</h1>
                                            <p className="test__author font-sm font-light">{currentUser?.name}</p>
                                        </div>
                                        <div className="mt-auto">
                                            <span className="test__tag bg-white bg-opacity-60 py-1 px-4 rounded-md text-black">@{currentUser.username}</span>
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

export default SingleUser