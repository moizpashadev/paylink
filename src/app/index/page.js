'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Image from 'next/image';
import { FaCreditCard, FaQrcode, FaMobileAlt } from "react-icons/fa";
import CreditCardIcon from '../svgs/CreditCard.svg';
import IntMobBankingIcon from '../svgs/intMbanking.svg';
import QRCodeIcon from '../svgs/QR.svg';
import qrgen from '../Images/qrgen.png';
import Header from '../components/header';
import Footer from '../components/footer';


const PaymentMethods = () => {
    const [expanded, setExpanded] = useState(null); // State to track which payment method is expanded

    const handleToggle = (index) => {
        setExpanded(expanded === index ? null : index); // Toggle between expand and collapse
    };
    const [data, setData] = useState(null);
    const [apiResponse, setApiResponse] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [voucherData, setVoucherData] = useState(null);
    const [institutionData, setInstitutionData] = useState(null);


    const CardPayNowOnClick = () => {
        try{

            router.push(`/cardinfo?data=12345566`);

    } catch (error) {
        console.error('Error fetching API data:', error);
    }

    }

    useEffect(() => {
        const encryptedData = searchParams.get('data');
        if (encryptedData) {
            try {
                // Decrypt the data
                const bytes = CryptoJS.AES.decrypt(encryptedData, 'your-secret-key'); // Use the same key
                const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                setData(decryptedData);

                //console.log('Decrypted Data:', decryptedData);

                // Call the API with decrypted data
                fetchBill(decryptedData);
            } catch (error) {
                //console.error('Error decrypting data:', error);
                //alert('Invalid or corrupted data!');
                router.push('/'); // Redirect to the home page on error
            }
        } else {
            //alert('No data found in the query string!');
            router.push('/'); // Redirect to the home page
        }
    }, [searchParams]);


    const fetchBill = async (decryptedData) => {
        try {

            const { institutionID, kuickpayID, authToken } = decryptedData;
            const countrycode = '92'; // Fixed value as per the example
            const apiUrl = `https://uat-paymentlink.kuickpay.com/api/SearchVoucher/${kuickpayID}/${institutionID}/${countrycode}`;

            const response = await axios.get(apiUrl,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }
            );


            if (response.data.response_code == "00") {

                setVoucherData(response.data.voucherData);
                setInstitutionData(response.data.institution);



                // Check if due_date exists and is valid, then format it
                if (response.data.voucherData.due_Date && !isNaN(new Date(response.data.voucherData.due_Date))) {



                    // Format the date directly inside voucherData
                    response.data.voucherData.due_Date = new Intl.DateTimeFormat('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    }).format(new Date(response.data.voucherData.due_Date));
                } else {
                    // If invalid or no due date, set it to 'N/A'
                    response.data.voucherData.due_Date = 'N/A';
                }


                console.log('Voucher Data:', response.data.voucherData);
                console.log('Institution Data:', response.data.institution);
            }
            else {
                console.log('Response code:', response.data.response_code);
            }

            setApiResponse(response.data);
            console.log('API Response:', response.data.voucherData.due_Date);
        } catch (error) {
            console.error('Error fetching API data:', error);
        }
    };



    return (
        
        <div className="p-1 flex flex-col min-h-screen relative z-10" >
            {/* Logo Section */}

            <Header Heading={"PAYMENT LINK"} />
            <main className="flex-grow ">
            {voucherData && institutionData ? (
                <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 lg:p-8 relative">
               
                    <div className="w-full py-3 md:w-6/12 order-2 md:order-1   ">

                        <h2 className="ml-10 content tracking-widest text-xl lg:text-lg md:text-sm xsize:text-md"> Payment Methods</h2>
                        <div className=" xsize:mr-10">
                           
                            <div className="flex items-center" onClick={() => handleToggle(0)}>
                                <div className="cursor-pointer p-4 flex justify-between items-center" >

                                    <div className="content flex items-center">
                                        <Image src={CreditCardIcon} alt="My Icon" className="w-20 h-8" />
                                        <span className='p-4 text-sm'>Debit/Credit Card</span>
                                    </div>

                                </div>
                                <div className={`content transform transition-transform ${expanded === 0 ? "rotate-180" : ""} ml-auto`}>

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>


                                </div>
                            </div>

                            <div className={`overflow-hidden transition-all  duration-500 ease-in-out ${expanded === 0 ? 'max-h-96' : 'max-h-0'}`}>

                                <div className="flex justify-end">
                                    <div className="button">
                                        <button 
                                        onClick={CardPayNowOnClick}
                                        className="content-white bg-btnBlue  border-bg-btnblue border-x border-y rounded hover:text-slate-950 hover:bg-transparent hover:border-x hover:border-y hover:border-black text-white px-10 py-2 mx-10 my-3" >Pay Now</button>
                                    </div>

                                </div>
                            </div>

                          
                            <div className="border-t my-2"></div>

                            <div className="flex items-center" onClick={() => handleToggle(1)}>
                                <div className="cursor-pointer p-4 flex justify-between items-center" >

                                    <div className="content flex items-center">
                                        <Image src={QRCodeIcon} alt="My Icon" className="w-20 h-8" />
                                        <span className='p-4 text-sm'> Pay with QR</span>
                                    </div>

                                </div>
                                <div className={`content transform transition-transform ${expanded === 1 ? "rotate-180" : ""} ml-auto `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>


                                </div>
                            </div>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded === 1 ? 'max-h-96' : 'max-h-0'}`}>

                                <div className="ml-5 flex justify-between">
                                    <div className="cursor-pointer flex justify-between" >

                                        <div className="pl-4 flex justify-between">
                                            <Image src={qrgen} alt="qrgen" className=" w-40" />
                                        </div>

                                    </div>

                                    <div className="button flex items-center">
                                        <button className="content-white bg-btnBlue  border-bg-btnblue border-x border-y rounded hover:text-slate-950 hover:bg-transparent hover:border-x hover:border-y hover:border-black text-white px-5 py-2 mx-10 my-3" >
                                            Save To Gallery</button>
                                    </div>

                                </div>
                            </div>

                            {/* Payment Mode 2: Pay with QR */}

                            {/* Line Break */}
                            <div className="border-t my-2"></div>
                            <div className="flex items-center" onClick={() => handleToggle(2)}>
                                <div className="cursor-pointer p-4 flex justify-between items-center" >

                                    <div className="content flex items-center">
                                        <Image src={IntMobBankingIcon} alt="My Icon" className="w-20 h-8" />
                                        <span className='p-4 text-sm'>Internet/Mobile Banking</span>
                                    </div>

                                </div>
                                <div className={`content transform transition-transform ${expanded === 2 ? "rotate-180" : ""} ml-auto`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>


                                </div>
                            </div>

                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded === 2 ? 'max-h-96' : 'max-h-0'}`}>

                                <div className="flex justify-end">
                                    <div className="button">


                                        <button className="content-white bg-btnBlue  border-bg-btnblue border-x border-y rounded hover:text-slate-950 hover:bg-transparent hover:border-x hover:border-y
                         hover:border-black text-white px-10 py-2 mx-10 my-3" >See How to Pay</button>


                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                     

                        <div className=" w-full max-h-100 md:w-6/12 order-1 md:order-2 mr-1 sm:mr-4 md:mr-8 lg:mr-6 flex justify-center">

                        
                            <div className="px-4 py-3 shadow-custom-shadow rounded lg:border md:border xs:border-none  border-gray-300 xsize:w-full sm:w-full lg:w-10/12  ">

                                <div className="flex justify-between items-center ">
                                    <h2 className="heading tracking-widest text-xl lg:text-xl md:text-md xsize:text-md"> Invoice Summary</h2>
                                    <button className="content  border-bg-btnblue border-x border-y rounded px-3 py-1 w-auto text-xl lg:text-md md:text-sm xsize:text-xs hover:bg-btnBlue  hover:text-white">
                                        Download Invoice
                                    </button>
                                </div>

                                {/* Main Content started */}
                                <div className="border-t mt-5"></div>

                                <div className="px-2 pt-2 flex text-xl justify-center items-center">
                                    <p className="xl:text-2xl lg:text-2xl md:text-2xl  sm:text-1xl xs-text-xs">           
                                         {institutionData.institutionName} </p>

                                </div>
                                <div className="px-2 pt-4 flex justify-between items-center">
                                    <p className="InvSumContent"> Consuemr Number</p>
                                    <p className="InvSumContent"> {data.kuickpayID}</p>
                                </div>
                                <div className="px-2 pt-2 flex justify-between items-center">
                                    <p className="InvSumContent "> Name</p>
                                    <p className="InvSumContent "> {voucherData.consumer_Detail}</p>
                                </div>
                                <div className="px-2 pt-2 flex justify-between items-center">
                                    <p className="InvSumContent "> Due Date</p>
                                    <p className="InvSumContent "> {voucherData.due_Date} </p>
                                </div>
                                <div className="px-2 pt-2 flex justify-between items-center">
                                    <p className="InvSumContent "> Status</p>
                                    {/* <p className="InvSumContent "> {voucherData.bill_Status === "U" ? "Pending" : "Paid"}</p> */}<p
  className={` ${
    voucherData.bill_Status === "U" ? "text-red-500 text-sm font-medium " : "text-green-500 ext-sm ont-medium"
  }`}
>
  {voucherData.bill_Status === "U" ? "Pending" : "Paid"}
</p>

                                </div>

                                <div className="border-t mt-5"></div>

                                {/* Bill Amount */}
                                <div className="px-2 pt-5 flex justify-between items-center">
                                    <p className="text-lg "> Bill Amount</p>
                                    <p className="text-lg">{institutionData.amount_Currency} {voucherData.billAmount}</p>
                                </div>
                                <div className=" xsmsize:border-t mt-5"></div>
                            </div>

                       
                    </div>
                </div>
                ) : (
                    
                    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 lg:p-8 relative">
  
  <div className="w-full py-3 md:w-6/12 order-2 md:order-1 animate-pulse">
    <h2 className="ml-10 content tracking-widest text-xl lg:text-lg md:text-sm xsize:text-md h-2 bg-customPulseColor rounded w-40 mb-4"></h2>
    <div className="xsize:mr-10">
    
      <div className="flex items-center mb-4">
        <div className="cursor-pointer p-4 flex justify-between items-center">
          <div className="content flex items-center">
            <div className="w-20 h-8 bg-customPulseColor rounded"></div>
            <span className="p-4 text-sm h-2 bg-customPulseColor rounded w-32"></span>
          </div>
        </div>
        <div className="content transform transition-transform ml-auto h-2 bg-customPulseColor rounded w-8"></div>
      </div>
     
      <div className="border-t my-2"></div>

      
      <div className="flex items-center mb-4">
        <div className="cursor-pointer p-4 flex justify-between items-center">
          <div className="content flex items-center">
            <div className="w-20 h-8 bg-customPulseColor rounded"></div>
            <span className="p-4 text-sm h-2 bg-customPulseColor rounded w-32"></span>
          </div>
        </div>
        <div className="content transform transition-transform ml-auto h-2 bg-customPulseColor rounded w-8"></div>
      </div>
     

      
      <div className="border-t my-2"></div>
      <div className="flex items-center mb-4">
        <div className="cursor-pointer p-4 flex justify-between items-center">
          <div className="content flex items-center">
            <div className="w-20 h-8 bg-customPulseColor rounded"></div>
            <span className="p-4 text-sm h-2 bg-customPulseColor rounded w-32"></span>
          </div>
        </div>
        <div className="content transform transition-transform ml-auto h-2 bg-customPulseColor rounded w-8"></div>
      </div>
     
    </div>
  </div>

 
  <div className="w-full max-h-80 md:w-6/12 order-1 md:order-2 mr-1 sm:mr-4 md:mr-8 lg:mr-6 flex justify-center animate-pulse">
    <div className="px-4 py-3 rounded lg:border md:border xs:border-none border-gray-300 xsize:w-full sm:w-full lg:w-10/12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="heading tracking-widest text-xl lg:text-lg md:text-sm xsize:text-md h-2 bg-customPulseColor rounded w-40 mb-4"></h2>
        <button className="content border-bg-btnblue border-x border-y  px-3 py-1 w-auto text-xl lg:text-md md:text-sm xsize:text-xs hover:bg-btnBlue hover:text-white h-8 bg-customPulseColor rounded"></button>
      </div>

      <div className="border-t mt-5"></div>

      <div className="px-2 pt-2 flex text-xl justify-center items-center">
        <p className="xl:text-2xl lg:text-1xl md:text-lg sm:text-sm xs-text-xs h-2 bg-customPulseColor rounded w-40 mb-4"></p>
      </div>
      <div className="px-2 pt-4 flex justify-between items-center">
        <p className="InvSumContent h-2 bg-customPulseColor rounded w-32"></p>
        <p className="InvSumContent h-2 bg-customPulseColor rounded w-32"></p>
      </div>
      <div className="px-2 pt-2 flex justify-between items-center">
        <p className="InvSumContent h-2 bg-customPulseColor rounded w-32"></p>
        <p className="InvSumContent h-2 bg-customPulseColor rounded w-32"></p>
      </div>
      <div className="px-2 pt-2 flex justify-between items-center">
        <p className="InvSumContent h-2 bg-customPulseColor rounded w-32"></p>
        <p className="InvSumContent h-2 bg-customPulseColor rounded w-32"></p>
      </div>

      <div className="border-t mt-5"></div>

      
      <div className="px-2 pt-5 flex justify-between items-center">
        <p className="text-lg h-2 bg-customPulseColor rounded w-32"></p>
        <p className="text-lg h-2 bg-customPulseColor rounded w-32"></p>
      </div>
      <div className="xsmsize:border-t mt-5"></div>
    </div>
  </div>
</div>




                  )} 
            </main>
            {/* Footer */}
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PaymentMethods;
