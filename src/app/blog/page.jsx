'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Image from 'next/image'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { get_blogs } from '@/redux/store/Reducers/AuthReducer'
import Link from 'next/link'

const BlogPage = () => {
    const [datas, setDatas] = useState([])
    const dispatch = useDispatch()
    const {allBlogs} = useSelector(state => state.auth)

    const getData = async () =>{
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await res.json()
        setDatas(result)
    }

    useEffect(()=>{
        getData()
    },[])

    useEffect(()=>{
        dispatch(get_blogs())
    },[dispatch])
    return (
        <div className='bg-white text-black'>
            <Header />
            <div className='px-6 sm:px-3'>
                <div className='py-6 flex gap-3'>
                    <span className=' w-[6px] rounded-sm bg-white relative'></span>
                    <h1 className='text-4xl font-bold'>Blogs</h1>
                </div>
                <div className="sm:columns-1 md:columns-3 columns-4">
                    {
                        allBlogs?.length > 0 ? allBlogs?.map((item,i)=>(
                            <Link href={`/content/${item._id}`} key={i} className="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20 my-6 text-wrap flex-wrap">
                                <Image height={600} width={600} alt='img' className="w-full rounded-md" src={item.imageUrl} placeholder='blur' blurDataURL='https://img.freepik.com/free-vector/blurred-background-with-light-colors_1034-245.jpg?w=826&t=st=1705214616~exp=1705215216~hmac=d72b65803b141f0df637b0a5abba061f3025a747c43a51afa9bd41c3394c60ca'/>
                                <div className="test__body absolute inset-0 md:p-1 md-lg:p-2 p-8 xl:p-4 text-white flex flex-col">
                                    <div className="relative">
                                        <a className="test__link absolute inset-0" target="_blank" href="/"></a>
                                        <h1 className="test__title text-3xl font-bold mb-3 sm:text-base md-lg:text-base">{item.title.slice(0,40)}...</h1>
                                        <p className="test__author font-sm font-light"></p>
                                    </div>
                                    <div className="mt-auto">
                                        <span className="test__tag bg-white bg-opacity-60 py-1 px-4 rounded-md text-black">#{item.userName}</span>
                                    </div>
                                </div>
                            </Link>
                        )):<div>
                            <h1 className='text-3xl'>No Content Available</h1>
                        </div>
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default BlogPage