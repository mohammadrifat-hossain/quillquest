import React from 'react';

const AboutMeCode = () => {
    return (
        <div className="rounded-lg shadow-xl bg-gray-900 text-white text-wrap" >
                <div className="border-b border-gray-800 px-8 py-3">
                    <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500"></div>
                    <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300"></div>
                    <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400"></div>
                </div>
                <div className="px-8 py-6">
                    <p><em className="text-blue-400">const</em> <span className="text-green-400">aboutMe</span> <span className="text-pink-500">=</span> <em className="text-blue-400"></em>() {"=>"} {'{'}</p>
                    <p>&nbsp;&nbsp;<span className="text-pink-500">return</span> {'{'}</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name: <span className="text-yellow-300">{`"Rifat Hossain"`}</span>,</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Position: <span className="text-yellow-300">{`"fullstack-developer"`}</span>,</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Address:  <span className="text-yellow-300">{`"Manikgonj,Dhaka,Bangladesh"`}</span>,</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Email: <span className="text-yellow-300">{`"mohammadrifat.hossain.rk@gmail.com"`}</span>,</p>
                    <p>&nbsp;&nbsp;{'}'}</p>
                    <p>{'}'}</p>
                </div>
            </div>
    );
}

export default AboutMeCode;
