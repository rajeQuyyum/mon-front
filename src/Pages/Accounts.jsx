import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { NavLink } from 'react-router-dom'

export default function Accounts() {
  return (
    <section>
        <Navbar />
   <div className=' pt-20'>
    <div className='bg-amber-300 w-[1000px] ml-52 text-center py-6 mb-8'>
        <h1 className='text-2xl font-serif'>Account Details</h1>
    </div>

    <div className='bg-[#252424bb] flex-col items-center gap-10 m-auto w-[300px] flex text-white py-5 rounded-lg border border-r-amber-600 mb-10'>
        <img className='h-10 w-10 rounded-3xl' src="https://bank-paylio.netlify.app/cointex/images/avt/pic.jpg" alt="" />
        <h1 className='text-2xl font-semibold'>Bernd Will</h1>
        <p className='text-sm text-gray-500'>ID: 83UEDC3</p>
    </div>

    <div className='bg-[#252424bb] flex-col items-center gap-10 m-auto w-[300px] flex text-white py-5 rounded-lg border border-r-amber-600 mb-10'>
        <p className='text-sm text-gray-500'>Current Balance</p>
        <h1 className='text-2xl font-semibold text-green-500'>$10,000</h1>

    </div>

    <div className='bg-[#252424bb] flex-col items-center gap-10 m-auto w-[300px] flex py-5 rounded-lg border border-r-amber-600 mb-2.5'>
     <div className='flex items-center gap-5'>
        <img className='w-[40px] rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI9lRck6miglY0SZF_BZ_sK829yiNskgYRUg&s" alt="" />
        <h1 className='text-white text-lg font-serif'>Personal Information</h1>
        <FaAngleRight className='text-gray-500' />
     </div>
    </div>

    <div className='bg-[#252424bb] flex-col items-center gap-10 m-auto w-[300px] flex py-5 rounded-lg border border-r-amber-600 mb-2.5'>
     <div className='flex items-center gap-8'>
        <img className='w-[40px] rounded-full' src="https://p7.hiclipart.com/preview/818/360/1007/computer-icons-password-login-user-padlock.jpg" alt="" />
        <h1 className='text-white text-lg font-serif'>Security & Privacy</h1>
        <FaAngleRight className='text-gray-500' />
     </div>
    </div>

    <div className='bg-[#252424bb] flex-col items-center gap-10 m-auto w-[300px] flex py-5 rounded-lg border border-r-amber-600 mb-2.5'>
     <div className='flex items-center gap-12'>
        <img className='w-[40px] rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAZ0Ix-HJGS5ATL7jiw6o5kIhLQ8usqQy5-A&s" alt="" />
        <h1 className='text-white text-lg font-serif'>Notifications</h1>
        <FaAngleRight className='text-gray-500' />
     </div>
    </div>

    <div className='bg-[#252424bb] flex-col items-center gap-10 m-auto w-[300px] flex py-5 rounded-lg border border-r-amber-600 mb-2.5'>
     <div className='flex items-center gap-8'>
        <img className='w-[40px] h-10 rounded-full' src="https://media.istockphoto.com/id/903337960/vector/realistic-detailed-credit-card.jpg?s=612x612&w=0&k=20&c=UwLT-Ruldc2jGZD-oBfqLr5zbH3jKU5VDQimQJ6sTm4=" alt="" />
        <h1 className='text-white text-lg font-serif'>Linked Accounts</h1>
        <FaAngleRight className='text-gray-500' />
     </div>
    </div>

    <div className='bg-[#252424bb] flex-col items-center gap-10 m-auto w-[300px] flex py-5 rounded-lg border border-r-amber-600 mb-2.5'>
     <div className='flex items-center gap-5'>
        <img className='w-[40px] rounded-full' src="https://media.istockphoto.com/id/1299149656/vector/stock-market-chart.jpg?s=612x612&w=0&k=20&c=_lpQHhW__KiOxqewB7lp-xvthzexeORFktDI0rQgEyg=" alt="" />
        <h1 className='text-white text-lg font-serif'>Transaction History</h1>
        <FaAngleRight className='text-gray-500' />
     </div>
    </div>

    <div className='bg-[#252424bb] flex-col items-center gap-10 m-auto w-[300px] flex py-5 rounded-lg border border-r-amber-600 mb-2.5'>
     <div className='flex items-center gap-12'>
        <img className='w-[40px] rounded-full' src="https://static.vecteezy.com/system/resources/previews/021/190/084/non_2x/settings-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg" alt="" />
        <h1 className='text-white text-lg font-serif'>App Settings</h1>
        <FaAngleRight className='text-gray-500' />
     </div>
    </div>

    <div className='bg-[#252424bb] flex-col items-center gap-10 m-auto w-[300px] flex py-5 rounded-lg border border-r-amber-600 mb-2.5'>
     <div className='flex items-center gap-9'>
        <img className='w-[40px] h-10 rounded-full' src="https://icon2.cleanpng.com/20240318/swl/transparent-question-mark-red-question-mark-with-dot-and-1710897593038.webp" alt="" />
       <NavLink to="/chat"><h1 className='text-white text-lg font-serif'>Help & Support</h1></NavLink>
        <FaAngleRight className='text-gray-500' />
     </div>
    </div>

    <div className='w-[300px] py-2.5 m-auto block mb-8 bg-red-500 text-center text-white rounded-lg'>
      <NavLink to="/login"><h1 className='text-lg'>Logout</h1></NavLink>
    </div>
   </div>
   <Footer />
   </section>
  )
}
