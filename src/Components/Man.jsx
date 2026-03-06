import React from 'react'
import { BsThreads } from 'react-icons/bs'
import { IoMdAdd } from 'react-icons/io'
import heroo from "../assets/heroo.png";
import here from "../assets/here.png";
import main from "../assets/main.png";
import { HiBars3 } from 'react-icons/hi2';
import { AiOutlineAppstore, AiOutlineLink } from 'react-icons/ai';
import { RiFacebookCircleFill, RiFolderUserFill } from 'react-icons/ri';
import { IoPersonAddOutline } from 'react-icons/io5';
import { LuSquarePlay } from 'react-icons/lu';
import { FaRepeat } from 'react-icons/fa6';
import { PiSealCheckFill } from 'react-icons/pi';
export default function Man() {
  return (
    <section className='w-[400px] m-auto'>
       <div className='text-white flex justify-between items-center mb-5'>
        <IoMdAdd className='text-2xl' />
        <div className='flex items-center gap-1'>
            <h1 className='text-lg'>ashanti</h1>
        <PiSealCheckFill className='text-lg text-blue-500' />
        </div>
        <div className='flex gap-3 items-center'>
            <BsThreads className='text-lg' />
        <HiBars3 className='text-2xl' />
        </div>
        </div> 
        <h1 className='text-white pl-28 text-sm'>ashanti</h1>
        <div className='text-white justify-between flex w-[350px] items-center m-auto'>
           <img className='h-[80px] w-[75px] rounded-full' src={heroo} alt="Logo" />
           <div>
            <h1>4,739</h1>
            <h1>post</h1>
           </div>
           <div>
            <h1>8.8</h1>
            <h1>followers</h1>
           </div>
           <div>
            <h1>599</h1>
            <h1>following</h1>
           </div>
        </div>

        <div className='text-white flex m-auto flex-col gap-0 text-xs w-[350px]'>
            <h1 className='text-gray-600 font-light'>Artist</h1>
            <h1>"Falling for you" available everywhere now!!! Grammy</h1>
            <h1>award winning multi platinum singer, songwriter, actress.</h1>
            <h1>CEO of Written Entertainment</h1>
            <div className='flex items-center gap-1 mt-2'>
                <AiOutlineLink className='text-blue-400 text-lg' />
            <h1 className='text-blue-400'>www.ticketmaster.com/ashanti-concert-t</h1>
            </div>
        </div>

        <div className='text-white flex items-center justify-center gap-1.5 w-[350px] mb-5'>
            <BsThreads />
            <h1>ashanti</h1>
            <RiFacebookCircleFill />
            <h1>Ashanti Douglas</h1>
        </div>

        <div className='flex text-white items-center w-[350px] justify-center gap-2 mb-3'>
            <h1 className='bg-gray-800 px-6 py-1 rounded-md'>Edit profile </h1>
            <h1 className='bg-gray-800 px-6 py-1 rounded-md'>Share profile</h1>
            <IoPersonAddOutline className='bg-gray-800 px-1 text-2xl py-1 rounded-md' />
        </div>

        <div className='flex w-[350px] gap-1 items-center m-auto mb-4'>
             <IoMdAdd className='text-3xl bg-black rounded-full text-white' />
             <img className='w-[300px]' src={here} alt="Logo" />
        </div>

        <div className='text-white flex w-[350px] justify-between m-auto'>
            <AiOutlineAppstore />
            <LuSquarePlay />
            <FaRepeat />
            <RiFolderUserFill />
        </div>

        <div className=''>
            <img className='w-[400px]' src={main} alt="Logo" />
        </div>
    </section>
  )
}
