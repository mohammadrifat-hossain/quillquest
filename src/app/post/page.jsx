'use client'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import { HiOutlineUpload } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { messageReset, post_content } from '@/redux/store/Reducers/AuthReducer';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FaPen } from "react-icons/fa6";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const PostPage = () => {
    const [value, setValue] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [imageShow, setImageShow] = useState('')
    const dispatch = useDispatch()
    const { userInfo, successMessage, errorMessage, loader } = useSelector(state => state.auth)
    const router = useRouter()

    //-----use effects
    useEffect(()=>{
        if(successMessage){
            toast.success(successMessage)
            dispatch(messageReset)
            setValue('')
            setImage('')
            setImageShow('')
            setTimeout(() => {
                router.push('/')
            }, 1000);
        }
        if(errorMessage){
            toast.success(errorMessage)
            dispatch(messageReset)
        }
    },[successMessage,errorMessage,dispatch, router])

    //----functions

    const handlePost = async (e) =>{
        e.preventDefault()
        if(value && image){
            const form = new FormData()
            form.append('image',image)
            form.append('userName', userInfo?.name)
            form.append('userId', userInfo?.id)
            form.append('value',value)
            form.append('title',title)
            dispatch(post_content(form))
        }else{
            toast.error("add image and text")
        }
    }

    const handleImage = (e) =>{
        const file = e.target.files[0]
        if(file){
            setImage(file)

            const imgurl = URL.createObjectURL(file)
            setImageShow(imgurl)
            setImage(file)
        }
    }

    return (
        <div className='bg-white min-h-screen'>
            <Header />
            <div className='max-w-[1600px] mx-auto text-black md:p-0 w-[90%]'>
                <div className='m-3 flex items-center justify-center '>
                    {
                        image ? <div className='relative md:w-[300px]'>
                            <Image height={500} width={500} alt='img' src={imageShow} />
                            <input type="file"  onChange={handleImage} className='h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer'/>
                        </div>: <div className='w-[200px] h-[200px] border-black border-dashed border rounded-lg relative flex items-center justify-center'>
                            <HiOutlineUpload className='text-4xl'/>
                            <input type="file"  onChange={handleImage} className='h-full w-full absolute opacity-0'/>
                        </div>
                    }
                </div>
                <div className='my-2 flex flex-col'>
                    <label htmlFor="title" className='flex items-center justify-start gap-1'>
                        <FaPen/>Title
                    </label>
                    <input type="text" id='title' value={title} onChange={(e)=> setTitle(e.target.value)} className='border-[#d1d1d1] border outline-none px-4 py-2 rounded' placeholder='Titile of the content'/>
                </div>
                <ReactQuill
                theme='snow'
                value={value}
                onChange={setValue}
                />
                <div className='w-full my-3 flex items-center justify-center'>
                <button onClick={handlePost} type="submit" className="max-w-[200px] bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full duration-300 flex items-center justify-center">
                            {
                                loader ? <div className="rounded-full h-[24px] w-[24px] border-[5px] border-l-transparent animate-spin"></div>:<div>Post Content</div>
                            }
                        </button>
                </div>
            </div>
        </div>
    );
};

export default PostPage;
