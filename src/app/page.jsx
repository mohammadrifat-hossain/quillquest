'use client'
import Image from 'next/image'
import Header from './components/Header'
import {motion} from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Tilt from 'react-parallax-tilt'
import BlogContent from './components/BlogContent'
import Footer from './components/Footer'
import { FaChevronRight } from "react-icons/fa6";
import Button from './components/Button'

export default function Home() {

  const textRef = useRef(null)

  //----use effects
  useEffect(() => {
    const animationText1 = (element) => {
      const newText = [];
      const theText = textRef.current; // Use the ref to get the element

      for (let i = 0; i < theText.innerText.length; i++) {
        newText.push(
          `<div>${theText.innerText[i] === ' ' ? '&nbsp;' : theText.innerText[i]}</div>`
        );
      }

      theText.innerHTML = newText.join('');

      gsap.fromTo(
        `${element} div`,
        {
          opacity: 0,
          y: 90,
        },
        {
          duration: 0.5,
          opacity: 1,
          y: 0,
          stagger: 0.02,
          ease: 'elastic(0.5, 0.5)',
          scrollTrigger: {
            trigger: element,
            start: 'top 10%',
            toggleActions: 'restart none none reverse',
          },
        }
      );
    };

    animationText1('#text-anim');
  }, []);

  return (
    <div className='relative bg-gradient-to-r from-[#6d6affb0] to-[#9539ff]  overflow-hidden'>
      <Header/>
      <motion.div
        initial={{x:-20,opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{duration:0.5}}
        className='absolute left-0 top-10 h-[50%] md:w-full w-[50%] z-[1]'>
        <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
              <stop id="stop1" stopColor="rgba(157, 0, 255, 0.8)" offset="0%"></stop>
              <stop id="stop2" stopColor="rgba(0, 0, 0, 0.38)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient)"
            d="M21.2,-25.1C27.7,-19.8,33.2,-13.3,36,-5.2C38.8,2.9,38.8,12.6,34.2,19C29.7,25.4,20.5,28.4,12.2,29.8C3.9,31.2,-3.7,31,-11.1,28.9C-18.5,26.9,-25.9,23,-28.9,17C-32,11,-30.8,2.9,-29.3,-5.2C-27.9,-13.2,-26.2,-21.2,-21.3,-26.7C-16.4,-32.2,-8.2,-35.1,-0.4,-34.7C7.4,-34.2,14.7,-30.3,21.2,-25.1Z"
            width="100%"
            height="100%"
            transform="translate(50 50)"
            strokeWidth="0"
            className="transition-all duration-300 ease-in-out shadow-lg"
          ></path>
        </svg>
      </motion.div>
      <div className='relative max-w-[1600px] mx-auto z-10'>
        <div className='w-full flex gap-1 justify-center'>
          <motion.div 
            initial={{y:-20,opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{duration:0.5}}
            className='my-5 bg-[#ffffff46] glass shadow rounded-full z-[9]'>
            <div className='p-1 flex items-center justify-center gap-1 text-xl relative parentDiv duration-200 rounded-full overflow-hidden'>
              <span className='bg-indigo-500 py-1 px-2 rounded-full relative'>Latest Post!</span>
              <span className='opacity-0'>Lets read it now</span>
              <span className='absolute right-1 childOne'>Lets read it now</span>
              <span className='absolute right-1 childTwo'>Lets read it now</span>
            </div>
          </motion.div>
        </div>
        <div className='w-full flex gap-1 justify-center'>
          <motion.h1 ref={textRef} initial={{opacity:0}} whileInView={{opacity:1}} id='text-anim' className='flex items-center justify-center text-[60px] lg:text-[50px] md-lg:text-[40px] text-nowrap font-bold md:hidden'>
            <span>Let’s Get in Touch</span>&nbsp;<br/><span> with Latest Content</span>
          </motion.h1>
          <motion.h1 initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} transition={{delay:0.5}} className='md:flex flex-col items-center justify-center text-[50px] font-bold hidden text-center'>
            <span>Let’s Get in Touch</span><span> with Latest Content</span>
          </motion.h1>
        </div>

        <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} transition={{delay:1}} className='w-full flex items-center justify-center py-7 px-3 max-w-[800px] mx-auto text-center text-xl'>
            <h3>In our latest blog post we take a closer look at the different ways you can grow and nurture your email community while building authority.</h3>
        </motion.div>

        <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} transition={{delay:1.2}} className='my-4 py-5 flex gap-3 items-center justify-center text-lg font-bold'>
          <Link href={'/blog'} className='px-4 py-2 rounded-full bg-white text-black shadow hover:bg-transparent border hover:text-white duration-200'>Latest Content</Link>
          <Link href={'/about'} className='px-4 py-2 rounded-full border shadow hover:bg-[#eee] hover:text-black duration-200'>About Us</Link>
        </motion.div>
        <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1,y:0}} transition={{delay:1.2}} className='my-4 py-5 flex gap-3 items-center justify-center text-lg font-bold px-2'>
          <div className='realtive flex items-center justify-center md:flex-col'>
            <div className='glass bg-[#ffffff25] rounded-lg shadow-md'>
              <Image height={1000} width={1000} alt='banner' src={'https://res.cloudinary.com/dgbf3zt5b/image/upload/v1704721969/wepik-export-202401081351343txE_xscgyn.png'}/>
            </div>
            <Tilt 
              className='bg-white p-4 text-black rounded-md shadow-lg flex flex-col gap-3 md:ml-0 -ml-56 my-3 w-[400px] md:w-full relative cursor-pointer'
              glareEnable={true}
              tiltMaxAngleY={10}
              tiltMaxAngleX={10}
              glareColor={'#1C2262'}
              >
              <div><p>Latest Blog</p></div>
              <div>
                <h1 className='text-2xl'>The Psychology of Color in Marketing and Design.</h1>
              </div>
              <div>
                <p className='text-sm font-thin'>A deep dive into the psychology of color, including how different colors can impact emotions, behavior, and perceptions.</p>
              </div>
            </Tilt>
          </div>
        </motion.div>
        <div>
          <BlogContent />
        </div>
        <div className='flex items-center justify-center my-8 gap-4 hover:gap-6 duration-200'>
          <span><FaChevronRight/></span>
          <Link href={'/blog'} className='text-xl'>View Blogs</Link>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
