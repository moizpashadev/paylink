import Image from 'next/image';
import React, { useState } from 'react';
 import InfoIcon from '../svgs/info.svg';

const InfoArea = ({Text}) => {
  return (
    <div style={{ backgroundColor: '#D2EAFF' }}   className="  flex items-center border rounded-lg ml-5 mr-5">
      {/* <div className="content flex items-center py-2 justify-center">
        <Image src={InfoIcon} alt="My Icon" className="w-20 h-8"  />
        <span className=" text-xs">
            {Text} 
        </span>
      </div> */}

      <div className="rounded-md  sm:p-1 sm:py-2  sm:ml-5 sm:mr-5 md:p-1 md:py-1 lg:p-1 lg:py-1 xsmsize:p-1 flex justify-center items-center">
      <span className="relative flex ">
        <span className="animate-ping absolute inline-flex w-8 h-8 rounded-full  bg-sky-300 opacity-75"></span>
        {/* <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span> */}
        <Image src={InfoIcon} alt="My Icon" className="w-8 h-8 relative inline-flex rounded-full"  />
      </span>
       
        <span className="ml-5 xsize:text-xs text-xs">
            {Text} 
        </span>
      </div>


          {/* <div  style={{ backgroundColor: '#D2EAFF' }}
                className=" rounded-md p-3 py-3 ml-5 mr-5 sm:p-2 sm:py-2 sm:ml-5 sm:mr-5 md:p-4 md:py-4 lg:p-5 lg:py-5  flex justify-center items-center">
                <h2 className="font-outfit text-base md:text-2xl lg:text-3xl text-center">
                    <div>
                        <p className="heading tracking-widest"></p>
                    </div>
                </h2>
          </div> */}
    </div>
    
  );
};
//rounded-md p-3 py-3 ml-5 mr-5 sm:p-2 sm:py-2 sm:ml-5 sm:mr-5 md:p-4 md:py-4 lg:p-5 lg:py-5  flex justify-center items-center

export default InfoArea;
