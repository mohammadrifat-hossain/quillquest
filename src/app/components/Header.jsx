'use client'
import React, { useEffect, useState } from 'react'
import { MdMailOutline } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaLock, FaUser, FaPenNib, FaPen, FaSearch  } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { HiOutlineNewspaper } from "react-icons/hi";
import { ImQuill } from "react-icons/im";
import { IoTelescope } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector} from 'react-redux'
import { decodeToken } from '@/redux/store/Reducers/AuthReducer';

const Header = () => {
    const pathname = usePathname()
    const dispatch = useDispatch()

    const [navOpen,setNavOpen] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const { userInfo } = useSelector(state => state.auth)
    const router = useRouter()
    const [scrollValue,setScrollValue] = useState(0)


    //----use effects
    useEffect(()=>{
        const local = localStorage.getItem('blogToken')
        if(local){
            dispatch(decodeToken(local))
        }
    },[dispatch])

    useEffect(()=>{
        window.addEventListener('scroll',(e)=>{
            const scrollValue = window.scrollY
            setScrollValue(scrollValue);
        })
    },[])

    const links = [
        {
            title:"Home",
            icon: <GoHomeFill />,
            url: "/"
        },
        {
            title:"Blog",
            icon: <HiOutlineNewspaper />,
            url: "/blog"
        },
        {
            title:"Authors",
            icon: <FaPenNib  />,
            url: "/authors"
        },
        {
            title:"About",
            icon: <IoTelescope />,
            url: "/about"
        },
    ]
    
    //----
    const handleKey = async (e) =>{
        if(e.key === 'Enter'){
            router.push(`/searchcontent/${searchInput}`)
        }
    }
    return (
        <>
        <div className='relative w-full shadow-md bg-white z-[9999]'>
            <div className='w-full py-2 bg-[#dfdfdf] md-lg:hidden'>
                <div className='w-[85%] mx-auto flex items-center justify-between'>
                    <div className='flex items-center justify-center text-center gap-5 text-slate-500'>
                        <div className='flex items-center justify-center gap-1'>
                            <span><MdMailOutline/> </span>
                            <span className='-mt-[2px]'>mohammadrifat.hossain.rk@gmail.com</span>
                        </div>
                        <div className='h-[20px] w-[1px] bg-slate-400'></div>
                        <div>
                            <span>Whispered Wonders, Written Beautifully.</span>
                        </div>
                    </div>
                    <div className='text-slate-500'>
                        <div className='flex items-center justify-center gap-4'>
                            <div className='flex items-center justify-center gap-4 text-lg'>
                                <Link href={'https://www.facebook.com/mohammadrifat0007'}><FaFacebook/></Link>
                                <Link href={'https://www.instagram.com/mohammadrifat0007/'}><FaInstagram /></Link>
                                <Link href={'https://www.linkedin.com/in/md-rifat-hossain-736a49288/'}><FaLinkedin /></Link>
                                <Link href={'https://twitter.com/Rifat_hos'}><FaTwitter /></Link>
                            </div>
                            <div className='h-[20px] w-[1px] bg-slate-400'></div>
                            <div>
                                {
                                    !userInfo.name  ? <Link href={'/login'} className='flex items-center justify-center gap-2 hover:bg-[#ccc] px-2 rounded duration-300'>
                                        <span><FaLock/></span>
                                        <span>Login</span>
                                    </Link> : <Link href={'/profile'} className='flex items-center justify-center gap-2 hover:bg-[#ccc] px-2 rounded duration-300'>
                                        <span><FaUser/></span>
                                        <span>{userInfo?.name}</span>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[85%] lg:w-[95%] mx-auto px-4 md:px-2 py-2'>
                <div className=''>
                    <div className='flex items-center justify-between'>
                        <Link href={'/'} className=' relative block'>
                            <Image height={0} src='https://res.cloudinary.com/dgbf3zt5b/image/upload/v1704371864/Free-Logo-Maker-Get-Custom-Logo-Designs-in-Minutes-Looka_1_flcbix.png' alt="logo" width={220} className='rounded'/>
                        </Link>
                        <div className='md-lg:hidden flex items-center justify-evenly px-5 py-2 relative '>
                            <input type="text" placeholder='Search...' value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} onKeyUp={handleKey} className='px-4 py-2 rounded-full border outline-none border-[#0000003d] pr-10 w-[200px] text-[#222]'/>
                            <span className='mx-2 text-2xl absolute right-6'><FaSearch/></span>
                        </div>
                        <div className='flex items-center  justify-center gap-10 md-lg:hidden'>
                            <div className='flex items-center justify-center gap-6 uppercase font-[900] text-slate-500'>
                                {
                                    links.map((item,i) =>(
                                        <Link key={i} href={item.url} className=''>
                                            <span className={` ${item.url  === pathname ? 'text-indigo-500':'hover:text-slate-600'} duration-300`}>{item.title}</span>
                                        </Link>
                                    ))
                                }
                            </div>
                            <Link href={'/post'} className='flex  items-center justify-center gap-1 uppercase font-[900] bg-indigo-500 text-white px-2 py-1 rounded'>
                                <span><FaPen/></span>
                                <span>Post</span>
                            </Link>
                        </div>
                        <div className='hidden md-lg:flex'>
                            <div>
                                <FaBarsStaggered className={`text-2xl text-black cursor-pointer ${!navOpen ? 'block':'hidden'}`} onClick={()=>setNavOpen(true)}/>
                                <FaTimes className={`text-2xl text-black cursor-pointer ${navOpen ? 'block':'hidden'}`} onClick={()=>setNavOpen(true)}/>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
            <div onClick={()=> setNavOpen(false)} className={`fixed h-full w-full bg-[#00000041] top-0 left-0 ${navOpen ? 'flex':'hidden'}`}>
                
            </div>
            <div className={`fixed bg-white w-[300px] h-full duration-200 transition-all top-0 z-[99999] ${navOpen ? 'left-[0px]':'-left-[300px]'}`}>
                <div className='py-2 px-4'>
                    <div>
                        <Link href={'/'} className=' relative block'>
                            <Image height={600} src='https://res.cloudinary.com/dgbf3zt5b/image/upload/v1704371864/Free-Logo-Maker-Get-Custom-Logo-Designs-in-Minutes-Looka_1_flcbix.png' alt="logo" width={220} className='rounded'/>
                        </Link>
                    </div>
                    <div className='flex items-center justify-evenly px-5 py-2'>
                        <input type="text" placeholder='Search...' value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} onKeyUp={handleKey} className='px-4 py-2 rounded-full border outline-none border-[#0000003d] text-black sm:w-[200px]'/>
                        <span className='mx-2 text-2xl text-black'><FaSearch/></span>
                    </div>
                    <div className='text-slate-500'>
                        {
                            !userInfo.name ? <Link href={'/login'} className='flex items-center justify-center gap-2 hover:bg-[#ccc] px-2 rounded duration-300 text-xl'>
                                <span><FaLock/></span>
                                <span>Login</span>
                            </Link> : <Link href={'/profile'} className='flex items-center justify-center gap-2 hover:bg-[#ccc] px-2 rounded duration-300 text-xl'>
                                <span><FaUser/></span>
                                <span>{userInfo?.name}</span>
                            </Link>
                        }
                    </div>
                    <div className='my-3'>
                        <Link href={'/post'} className='flex  items-center justify-center gap-1 uppercase font-[900] bg-indigo-500 text-white px-2 py-1 rounded'>
                            <span><FaPen/></span>
                            <span>Post</span>
                        </Link>
                    </div>
                    <div className='mt-12 flex items-center flex-col justify-center gap-6 uppercase font-[900] text-slate-500'>
                        {
                            links.map((item,i) =>(
                                <Link key={i} href={item.url} className=''>
                                    <span className={` ${item.url  === pathname ? 'text-indigo-500':'hover:text-slate-600'} duration-300`}>{item.title}</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className='absolute left-0 bottom-0 p-2  text-slate-500'>
                    <div className='flex items-center justify-center gap-1'>
                        <span><MdMailOutline/> </span>
                        <span className='-mt-[2px] text-sm'>mohammadrifat.hossain.rk@gmail.com</span>
                    </div>
                    <div className='flex items-center justify-center gap-4 text-lg'>
                        <span><FaFacebook/></span>
                        <span><FaInstagram /></span>
                        <span><FaLinkedin /></span>
                        <span><FaTwitter /></span>
                    </div>
                </div>
            </div>
        </div>
        {/* fixed */}
        <div className={`fixed w-full shadow-md bg-[#ffffff36] z-[9998] text-white ${scrollValue > 350 ? 'top-0': '-top-56'} duration-200 glass`}>
            
            <div className='w-[85%] lg:w-[95%] mx-auto px-4 md:px-2 py-2'>
                <div className=''>
                    <div className='flex items-center justify-between'>
                        <Link href={'/'} className=' relative block'>
                            <Image height={0} src='https://res.cloudinary.com/dgbf3zt5b/image/upload/v1704371864/Free-Logo-Maker-Get-Custom-Logo-Designs-in-Minutes-Looka_1_flcbix.png' alt="logo" width={220} className='rounded'/>
                        </Link>
                        <div className='md-lg:hidden flex items-center justify-evenly px-5 py-2 relative '>
                            <input type="text" placeholder='Search...' value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} onKeyUp={handleKey} className='px-4 py-2 rounded-full border outline-none border-[#0000003d] pr-10 w-[200px] text-[#222]'/>
                            <span className='mx-2 text-2xl absolute right-6'><FaSearch/></span>
                        </div>
                        <div className='flex items-center  justify-center gap-10 md-lg:hidden'>
                            <div className='flex items-center justify-center gap-6 uppercase font-[900] text-slate-500'>
                                {
                                    links.map((item,i) =>(
                                        <Link key={i} href={item.url} className=''>
                                            <span className={` ${item.url  === pathname ? 'text-white font-bold':'hover:text-slate-400'} text-black duration-300`}>{item.title}</span>
                                        </Link>
                                    ))
                                }
                            </div>
                            <Link href={'/post'} className='flex  items-center justify-center gap-1 uppercase font-[900] bg-indigo-500 text-white px-2 py-1 rounded'>
                                <span><FaPen/></span>
                                <span>Post</span>
                            </Link>
                        </div>
                        <div className='hidden md-lg:flex'>
                            <div>
                                <FaBarsStaggered className={`text-2xl text-black cursor-pointer ${!navOpen ? 'block':'hidden'}`} onClick={()=>setNavOpen(true)}/>
                                <FaTimes className={`text-2xl text-black cursor-pointer ${navOpen ? 'block':'hidden'}`} onClick={()=>setNavOpen(true)}/>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Header