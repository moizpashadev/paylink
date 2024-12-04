import Image from 'next/image'; 
import bg from '../Images/bg.png'; 

export default function LandingPage() {
  return (
    <div className="">
      <nav className="bg-fuchsia-100 flex justify-between">
        {/* <img src="https://randomuser.me/api/portraits/men/75.jpg" className="h-12 py-1 px-1 rounded-2xl pt-1" /> */}
        <span className=" hover:text-slate-950 ml-2 text-xl flex items-center font-bold text-fuchsia-800" >Tech Mobiles</span>
        <ul className="px-28 py-2 flex space-x-10 justify-end ">
            <li className="corsur-pointer">Home</li>
            <li className="corsur-pointer">Services</li>
            <li className="corsur-pointer">Contact</li>
            <li className="corsur-pointer">About Us</li>
        </ul>
        <div className="hover:bg-black hover:text-slate-50 border-2 border-black rounded-md flex justify-end  px-2 m-2">
            <svg className='mr-2 w-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
            </svg>

            <p>0345 1298319</p></div>
        </nav>
        <main className="bg-fuchsia-200 flex justify-around">
            <div className="main py-40 pl-12 w-8/12">
                <div className="text-3xl">
                    The Best Phones In The Town
                </div>
                <p className="text-xs w-12/12"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum modi quam nostrum minus. Consequatur et voluptatibus numquam ea sit neque, eos animi inventore non minus vitae unde, sapiente suscipit deserunt.</p>
                <div className="button mt-10 ">
                    <button className="bg-fuchsia-600 rounded-xl  hover:text-slate-950 hover:bg-white text-white  hover:border-2 hover:border-black px-2 py-2 mr-2"> Book Now</button>
                    <button className="bg-fuchsia-600 rounded-xl hover:text-slate-950 hover:bg-white hover:border-2 hover:border-black text-white px-2 py-2">Raise a Query</button>
               
                </div>
            
            </div>
            <div className="flex w-4/12">
                
                <Image src={bg} alt="Logo" className="" />
            </div>
           
            
        </main>
    </div>
  );
}
