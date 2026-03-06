import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { NavLink } from 'react-router-dom'

export default function Wallet() {
  return (
   <section>
    <Navbar />
    <div className=' pt-40 pb-10'>
    
       <div className='bg-[#252424bb]   block m-auto w-[450px]  rounded-lg border border-r-amber-600 mb-2.5 text-white py-5'>
        <div>
        <h1 className='text-center'>Enter Bank Details</h1>
       </div>

       <div className='pl-6 mb-3'>
        <label className='block mb-2' htmlFor="amount">Amount to Transfer</label>
        <input className='border border-gray-500 outline-amber-500 w-[400px] h-10 rounded-lg pl-3' type="text" name='' id='' placeholder='$10' />
       </div>

        <div className='pl-6 mb-3'>
        <label className='block mb-2' htmlFor="amount">Bank Account Number</label>
        <input className='border border-gray-500 outline-amber-500 w-[400px] h-10 rounded-lg pl-3' type="text" name='' id='' placeholder='685832****' />
       </div>

        <div className='pl-6 mb-3'>
        <label className='block mb-2' htmlFor="amount">Account Holder Name</label>
        <input className='border border-gray-500 outline-amber-500 w-[400px] h-10 rounded-lg pl-3' type="text" name='' id='' placeholder='Senders name' />
       </div>

        <div className='pl-6 mb-3'>
        <label className='block mb-2' htmlFor="amount">Bank Name</label>
         <select className='md:w-[400px] w-full   h-10 border border-transparent' name="" id="">
                <option value="">Chase BANK</option>
                <option value="">Five Star Bank</option>
                <option value="">Global Bank</option>
                <option value="">VietinBank</option>
                <option value="">ACB</option>
                <option value="">Citi Bank</option>
                <option value="">Techcom Bank</option>
                <option value="">JC Bank</option>
                <option value="">Power Bank</option>
                <option value="">Ukrainian Credit Union</option>


                
                
            </select>
       </div>

       <div className='w-[400px] h-10 bg-green-500 text-center py-2 ml-6 rounded-lg'>
        <NavLink to="/con"><h1>Confirm Transfer</h1></NavLink>
       </div>

        
       </div>

   </div>
   <Footer />
   </section>
  )
}
