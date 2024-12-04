'use client';

import React from 'react';
import Image from 'next/image';

const Textbox = ({ Icon, placeholder, value, onChange,ref }) => {
  return (
    <div className="">
      <div className="flex items-center w-full px-2 py-2 border rounded-lg bg-white mb-6">
        {Icon && <Image src={Icon} alt="My Icon" className="w-6 h-6" />}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className="px-5 w-full h-max focus:outline-none"
          value={value} // Bind value to input
          onChange={onChange} // Attach onChange handler
        />
      </div>
    </div>
  );
};

export default Textbox;
