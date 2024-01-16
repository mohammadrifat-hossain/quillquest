'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Layout = ({children}) => {
    const [loading, setLoading] = useState(false)
    const {userInfo} = useSelector(state => state.auth)
    const router = useRouter()

    useEffect(()=>{
        setLoading(true)
    },[])
    
    useEffect(()=>{
        const token = localStorage.getItem("blogToken")
        if(token){
            router.push('/')
        }
        setLoading(false)
    },[router,userInfo])

    if(loading){
        return(
            <div className='w-full h-screen flex items-center justify-center bg-white'>
                <div>
                    <Image height={600} width={600} alt='loading' src={'https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif'} className=''/>
                </div>
            </div>
        )
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default Layout