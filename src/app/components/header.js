'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../Images/kuickpay-logo.png';



const Header = ({Heading}) => {
    return (
        <div className="">
            {/* Logo Section */}
           
            <nav className=" flex justify-between">

                <div className="ml-3 flex justify-start p-2 sm:ml-5 sm:p-2 md:p-4 lg:p-4">
                    <Image src={logo} alt="Logo" className="responsive-logo" />
                </div>
                <div className="hover:bg-black hover:border-black hover:text-slate-50 border-2 border-green-600 text-green-600 rounded-md flex justify-between py-1 px-2 m-4 p-4 pr-2 sm:ml-5 md:ml-5 ">
                    <svg className='flex justify-start w-6 mr-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>

                    <p className='flex justify-end '>0345 1298319</p>
                    </div>
                    
                    </nav>


            {/* Payment Link Section */}
            <div style={{ backgroundColor: '#E3EBF2' }}
                className="rounded-md p-3 py-3 ml-5 mr-5 sm:p-2 sm:py-2 sm:ml-5 sm:mr-5 md:p-4 md:py-4 lg:p-5 lg:py-5  flex justify-center items-center">
                <h2 className="font-outfit text-base md:text-2xl lg:text-3xl text-center">
                    <div>
                        <p className="heading tracking-widest">{Heading}</p>
                    </div>
                </h2>
            </div>
        </div>
    );
};

export default Header;
