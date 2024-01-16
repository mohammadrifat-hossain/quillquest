import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="mt-7 bg-[#fff] text-black shadow-md border-t">
            <div className="flex md:flex-col">
                <div className="w-[50%] md:w-full">
                    <Image height={600} width={600}  alt="img" src={'https://images.unsplash.com/photo-1642370324100-324b21fab3a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'}/>
                </div>
                <div className="w-full p-6 sm:p-2 flex items-center justify-center gap-5 flex-col">
                    <div className="flex w-full md:flex-col">
                        <div className="w-[50%] md:w-full flex flex-col items-start justify-center gap-1">
                            <h5>Call us</h5>
                            <h1 className="text-3xl">0123345678</h1>
                            <p className="mt-5">Monday to Friday: 10am - 5pm</p>
                            <p>Weekend: 10am - 3pm</p>
                            <div className="flex items-center justify-center gap-3 my-4 text-2xl w-full">
                                <Link href={'https://www.facebook.com/mohammadrifat0007'} className="cursor-pointer hover:text-slate-400 duration-200"><FaFacebook/></Link>
                                <Link href={'https://www.instagram.com/mohammadrifat0007/'} className="cursor-pointer hover:text-slate-400 duration-200"><FaInstagram/></Link>
                                <Link href={'https://twitter.com/Rifat_hos'} className="cursor-pointer hover:text-slate-400 duration-200"><FaTwitter/></Link>
                                <Link href={'https://l.facebook.com/l.php?u=https%3A%2F%2Fcall.whatsapp.com%2Fvideo%2Fq3VPJ8XKBtEvhu1iXv9m7g%3Ffbclid%3DIwAR0XZl6a4jiByaFyKQS05qYIRRM04LwcQRJTL6m9ol1Gk-wfF0vkVkXwlKo&h=AT0R7pgf_4SfQxqwX9Mqve7oiZLbnQ33HzTK35sG_GdOOwUKYkLiod0HoULVaalWuKkKPk0Qex4kDMgyLsc0636N8j6czdw9_ikKn7SDYwG_QNS-mdyYOsSoNCvS4a2bJYuI4w'} className="cursor-pointer hover:text-slate-400 duration-200"><FaWhatsapp/></Link>
                            </div>
                        </div>
                        <div className="w-full flex justify-evenly sm:flex-col">
                            <div>
                                <h1 className="text-3xl">Sevices</h1>
                                <div className="mt-2 flex gap-2 flex-col">
                                    <p className="text-slate-500 hover:text-slate-900 text-sm duration-200 cursor-pointer">Website Development</p>
                                    <p className="text-slate-500 hover:text-slate-900 text-sm duration-200 cursor-pointer">Website Design</p>
                                    <p className="text-slate-500 hover:text-slate-900 text-sm duration-200 cursor-pointer">Google Ads</p>
                                    <p className="text-slate-500 hover:text-slate-900 text-sm duration-200 cursor-pointer">SEO</p>
                                    <p className="text-slate-500 hover:text-slate-900 text-sm duration-200 cursor-pointer">Social Media Marketing</p>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl">Team</h1>
                                <div className="mt-2 flex gap-2 flex-col">
                                    <p className="text-slate-500 hover:text-slate-900 text-sm duration-200 cursor-pointer">About Our Team</p>
                                    <p className="text-slate-500 hover:text-slate-900 text-sm duration-200 cursor-pointer">Members</p>
                                    <p className="text-slate-500 hover:text-slate-900 text-sm duration-200 cursor-pointer">Proffesions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-evenly w-full border-t border-t-[#eeeeee4f] p-3 md:flex-col">
                        <div className="flex gap-3">
                            <span className="text-sm text-slate-400 hover:text-slate-700 duration-300 cursor-pointer">Terms & Conditions</span>
                            <span className="text-sm text-slate-400 hover:text-slate-700 duration-300 cursor-pointer">Privacy Policy</span>
                            <span className="text-sm text-slate-400 hover:text-slate-700 duration-300 cursor-pointer">Cookies</span>
                        </div>
                        <div>© 2022. Company Name. All rights reserved.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
