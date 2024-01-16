import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutMeCode from "../components/AboutMeCode";

const AboutPage = () => {
    return (
        <div>
            <Header/>
            <div id="wrapper" className="grid sm:grid-cols-1 grid-cols-2 h-screen">
                <div id="col-1" className="bg-blue-900 sm:px-2 pt-32 pb-40 md:px-20 py-64 md:py-20 px-32">
                    <h1 className="text-blue-500 font-extrabold text-6xl md:text-4xl">The <br/>
                        Blog  <br/>
                        Project</h1>
                    <p className="text-white text-normal text-3xl sm:pt-3 pt-6 font-medium">Blog Website created by Mohammad Rifat.</p>
                    <div>
                        <AboutMeCode />
                    </div>
                </div>  
                <div id="col-2" className="sm:px-3 px-20 py-64 md:px-12 text-black">
                    <div id="cards" className="sm:rounded-lg flex border py-5 px-6 md:py-8 md:px-16 -mt-6 bg-white -ml-24 sm:ml-0 pl-8 rounded-xl">
                        <div id="circle" className="w-8 h-8 bg-blue-500 md:w-16 md:h-16 rounded-full"></div>
                        <p className="sm:pl-4 pl-12 sm:text-base  font-semibold text-2xl ">“Love what’s you do!</p>
                    </div>
                    <div id="cards" className="sm:rounded-lg flex border py-5 px-6 md:py-8 md:px-16 mt-6 md:mt-12 bg-white pl-8 rounded-xl">
                        <div id="circle" className="w-8 h-8 bg-blue-500 md:w-16 md:h-16 rounded-full"></div>
                        <p className="sm:pl-4 pl-12 sm:text-base  font-semibold text-2xl">Do What’s you Love!”</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
