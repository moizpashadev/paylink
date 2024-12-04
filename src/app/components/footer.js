'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import footerSVG from '../svgs/Footer.svg';



const Footer = ({Heading}) => {
    return (
        <div className="relative">
  {/* Logo Section */}
  <footer className=" bottom-0 left-0 w-full md:h-40 xsize:h-20 flex items-end justify-center z-[-1]">
    <Image src={footerSVG} alt="My Icon" className="absolute left-0 md:h-40 sm:h-14 sm:-ml-24 xsize:h-14 xsize:-ml-24 md:-ml-1 -mb-1" />
    
    <p className="font-thin absolute bottom-2 text-center text-[#4A9AE8] md:text-sm sm:text-sm xsize:text-[8px]">
      <span className="text-slate-400 font-thin">© 2024, ALL RIGHTS RESERVED BY </span>
      INNOVARGE TECHNOLOGIES (Pvt.) Ltd
    </p>
  </footer>
</div>

    );
};

export default Footer;
