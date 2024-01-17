'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation'

const BlogTest = () => {
    const [datas, setDatas] = useState([])
    const router = useRouter()

    const getData = async () =>{
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await res.json()
        setDatas(result)
    }

    useEffect(()=>{
        getData()
    },[])

    //-----functions
    const handleRoute = (e)=>{
        router.push('/blog')
    }
    return (
        <div>
            <div className='py-6 flex gap-3'>
                <span className=' w-[6px] rounded-sm bg-white relative'></span>
                <h1 className='text-4xl font-bold'>Popular</h1>
            </div>
            <div className="sm:columns-1 md:columns-3 columns-4">
                {
                    [1,2,3,4,5,6,7,8,9,10,11,12].map((item,i)=>(
                        <motion.div onClick={handleRoute} initial={{opacity:0,y:100}} animate={{opacity:1, y:0}} transition={{duration:0.5 , delay: 0.1*i}} key={i} className="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20 hoverparent">
                            <Image height={600} width={600} alt='img' className="w-full rounded-md hoverchild" src={`https://source.unsplash.com/random/${5*i}`} placeholder='blur' blurDataURL='https://img.freepik.com/free-vector/blurred-background-with-light-colors_1034-245.jpg?w=826&t=st=1705214616~exp=1705215216~hmac=d72b65803b141f0df637b0a5abba061f3025a747c43a51afa9bd41c3394c60ca'/>
                            <div className="test__body absolute inset-0 md:p-1 p-8 text-white flex flex-col">
                                <div className="relative">
                                    <h1 className="test__title text-3xl font-bold mb-3 sm:text-base">{datas[i]?.company?.catchPhrase ? datas[i]?.company?.catchPhrase : "Perferendis vero dolorem necessitatibus"}</h1>
                                    <p className="test__author font-sm font-light">{datas[i]?.name ? datas[i]?.name : "amet consectetur"}</p>
                                </div>
                                <div className="mt-auto">
                                    <span className="test__tag bg-white bg-opacity-60 py-1 px-4 rounded-md text-black">#{datas[i]?.address?.city?datas[i]?.address?.city:"Lukas"}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                }
            </div>
        </div>
    )
}

export default BlogTest