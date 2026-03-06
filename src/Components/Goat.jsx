import React from 'react'
import { CiImageOn, CiVideoOn } from 'react-icons/ci'
import { IoCalculatorOutline, IoCallOutline, IoChevronBack, IoMicOutline } from 'react-icons/io5'
import matt from "../assets/matt.png";
import { PiSealCheckFill } from 'react-icons/pi';
import { MdCameraAlt } from 'react-icons/md';
import { IoIosAddCircleOutline } from 'react-icons/io';


export default function Goat() {
  return (
    <section className='w-[400px] m-auto '>
        <div className='text-gray-900 border-b gap-5 flex items-center mb-8'>
            <IoChevronBack className='text-2xl text-white' />
            <img className='h-[40px] w-[35px] rounded-full' src={matt} alt="Logo" />
            <div className='flex flex-col'>
                <div className='flex items-center'>
                    <h1 className='text-white'>Matt Gray</h1>
               
                </div>
                <h2 className='text-sm text-gray-600'>mattyboi4eva</h2>
            </div>

            

            <IoCallOutline className='text-2xl text-white' />
            <CiVideoOn className='text-2xl text-white' />
            <h1></h1>

        </div>

        <div className='flex flex-col justify-center items-center'>
            <img className='h-[40px] w-[35px] rounded-full' src={matt} alt="Logo" />
            
                <div className='flex items-center'>
                    <h1 className='text-white'>Matt Gray</h1>
               
                </div>
              
                <h2 className='text-sm text-gray-600'>mattyboi4eva</h2>
                <h1 className='text-gray-500 text-sm'>1,845 followers . 22.6k posts</h1>
                <h1 className='text-gray-500 text-sm'>This account follows you on instagram</h1>
                <h1 className='text-gray-500 text-sm'>You both follow theoriginalmomanager and 8 others</h1>
                <h1 className='text-white bg-gray-900  py-1.5 rounded-md px-2'>View profile</h1>
               
            </div>

            <div className='px-2'>
               


                <div className='mr-40 flex place-items-center gap-2'>
                     <img className='h-[40px] w-[35px] rounded-full ' src={matt} alt="Logo" />
                    <h1 className='text-white bg-gray-800  py-1 px-1 rounded-md mb-10'>Hey</h1>
                  
                </div>
                


            </div>

            <div className='mr-40 flex place-items-center gap-2 mb-10'>
                <img className='h-[40px] w-[35px] rounded-full ' src={matt} alt="Logo" />
                <h1 className='text-white bg-gray-800  py-1 px-1 rounded-md mb-10'>Whats good?</h1>
            </div>
           
           
            

            <div className='bg-gray-800 flex items-center rounded-xl mt-60'>
                <MdCameraAlt className='text-black bg-white rounded-full w-8 h-7 px-2'  />
                <input type="text" placeholder='Message....' />
                <div className='gap-1.5 flex'>
                    <IoMicOutline className='text-white text-2xl' />
                <CiImageOn className='text-white text-2xl' />
                <IoIosAddCircleOutline className='text-white text-lg' />
                </div>
            </div>
       
    </section>
  )
}
