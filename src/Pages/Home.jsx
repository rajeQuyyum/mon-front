import React from 'react'
import { BsCoin } from 'react-icons/bs'
import { FaCaretUp, FaRegStar, FaStar } from 'react-icons/fa'
import { FaMoneyCheckDollar } from 'react-icons/fa6'
import { IoArrowDownOutline, IoArrowUpOutline } from 'react-icons/io5'
import { LiaFunnelDollarSolid } from 'react-icons/lia'
import { MdOutlinePayment } from 'react-icons/md'
import { PiChartLineThin, PiHandDepositLight } from 'react-icons/pi'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

export default function Hom() {
  return (
   <section className='pt-18'>
   <div className=' bg-[#252424bb] flex flex-col justify-between text-white mb-2 w-[1000px] ml-52'>
     <div className='pl-3 py-3'>
        <h1 className='text-green-600 font-semibold mb-3 text-2xl'>Balance</h1>
        <h1 className='text-white font-semibold text-4xl'>$400,000</h1>
    </div>
    <div className='flex w-[700px] justify-between m-auto px-3 py-5'>
      <div className='flex flex-col items-center'>
         <NavLink to="/transfer">
            <IoArrowUpOutline className='text-6xl bg-black rounded-full py-4 mb-3' />
            <h1>Transfer</h1>
         </NavLink>
        
      </div>
      <div className='flex-col items-center flex'>
         <IoArrowDownOutline className='text-6xl bg-black rounded-full py-4 mb-3' />
         <h1>Deposite</h1>
      </div>
      <div className='flex-col items-center flex'>
        <MdOutlinePayment className='text-6xl bg-black rounded-full py-4 mb-3' />
        <h1>Pay Bills</h1>
      </div>
      <div className='flex-col items-center flex'>
         <BsCoin className='text-6xl bg-black rounded-full py-4 mb-3' />
         <NavLink to="invest">Invest</NavLink>
      </div>
    </div>
   </div>

   <div className='block w-[1000px] ml-52 bg-[#252424bb] mb-2 py-5 '>
    <h1 className='mb-7 text-white '>Banking Services</h1>
     <div className='flex justify-between'>
        <div className='big w-[320px] h-[120px] rounded-lg '>
           <div className='flex  items-center gap-2 mb-1'>
            <div>
                 <LiaFunnelDollarSolid className='text-2xl text-amber-900' />
            </div>
            <div>
                <h1 className='text-sm text-gray-600 font-sans'>savings account</h1>
                <p className='font-thin text-lg'>SAV</p>
            </div>
            </div>
           <div className='flex gap-2 text-4xl text-purple-800 mb-2'>
              <PiChartLineThin/>
                <PiChartLineThin/>
                  <PiChartLineThin/>
                    <PiChartLineThin/>
                      <PiChartLineThin/>
                        <PiChartLineThin/>
                          <PiChartLineThin/>
           </div>

        <div className='flex items-center justify-between'>
            <h1 className='font-thin text-sm text-gray-300'>2.5%APY</h1>
         
            <div className='flex'>
                <FaCaretUp className='text-green-500' />
            <p className='text-green-500 font-thin text-sm'>+0.25%</p>

            </div>
        </div>
           
        </div>
       

          <div className='big3 w-[320px] h-[120px] rounded-lg '>
           <div className='flex  items-center gap-2 mb-1'>
            <div>
                 <PiHandDepositLight  className='text-2xl text-amber-900' />
            </div>
            <div>
                <h1 className='text-sm text-gray-600 font-sans'>Fixed deposite</h1>
                <p className='font-thin text-lg'>FD</p>
            </div>
            </div>
           <div className='flex gap-2 text-4xl text-purple-800 mb-2'>
              <PiChartLineThin/>
                <PiChartLineThin/>
                  <PiChartLineThin/>
                    <PiChartLineThin/>
                      <PiChartLineThin/>
                        <PiChartLineThin/>
                          <PiChartLineThin/>
           </div>

        <div className='flex items-center justify-between'>
            <h1 className='font-thin text-sm text-gray-300'>2.5%APY</h1>
         
            <div className='flex'>
                <FaCaretUp className='text-green-500' />
            <p className='text-green-500 font-thin text-sm'>+0.25%</p>

            </div>
        </div>
           
        </div>
         <div className='big2 w-[320px] h-[120px] rounded-lg '>
           <div className='flex  items-center gap-2 mb-1'>
            <div>
                 <RiMoneyDollarCircleFill  className='text-2xl text-amber-900' />
            </div>
            <div>
                <h1 className='text-sm text-gray-600 font-sans'>Investment funds</h1>
                <p className='font-thin text-lg'>INV</p>
            </div>
            </div>
           <div className='flex gap-2 text-4xl text-purple-800 mb-2'>
              <PiChartLineThin/>
                <PiChartLineThin/>
                  <PiChartLineThin/>
                    <PiChartLineThin/>
                      <PiChartLineThin/>
                        <PiChartLineThin/>
                          <PiChartLineThin/>
           </div>

        <div className='flex items-center justify-between'>
            <h1 className='font-thin text-sm text-gray-300'>2.5%APY</h1>
         
            <div className='flex'>
                <FaCaretUp className='text-green-500' />
            <p className='text-green-500 font-thin text-sm'>+0.25%</p>

            </div>
        </div>
           
        </div>


     </div>
     
     
     
     

   </div>




   <div className=' w-[1000px] ml-52 bg-[#252424bb] py-5 px-3 mb-3'>
   <div className='flex items-center gap-1 mb-3'>
    <FaStar className='text-yellow-400' />
    <h1 className='text-green-500 text-lg font-serif'>Investment Portfolio</h1>
   </div>

   <div className='flex gap-10 mb-2'>
    <h1 className='text-white'>My Holdings</h1>
    <p className='text-gray-400'>Top Funds</p>
    <p className='text-gray-400'>Popular</p>
    <p className='text-gray-400'>High Yield</p>
    <p className='text-gray-400'>New Products</p>
   </div>
   <div className='w-[990px]'>
    <hr className='text-gray-600' />
   </div>
   
   <div className='flex justify-between mb-4'>
    <h1 className='text-gray-400'>Product</h1>
    <h1 className='text-gray-400'>Balance Return</h1>
   </div>


   <div className='text-white'>
    <div className='flex justify-between items-center mb-3'>
       <div className='flex items-center gap-2'> 
         <div>
            <img className='w-10' src="https://bank-paylio.netlify.app/cointex/images/coin/more-features-four-icon-5.png" alt="" />
        </div>
        <div>
            <h1>Growth Fund</h1>
            <p className='text-gray-400 text-sm'>Equity Fund</p>
        </div>
       </div>
       <div className='flex gap-3 text-sm'>
        <h1>$52,00</h1>
        <p className='bg-green-500 h-6  px-2 rounded-full'>+9.5%</p>
       </div>
    </div>

     <div className='flex justify-between items-center mb-3'>
       <div className='flex items-center gap-2'> 
         <div>
            <img className='w-10' src="https://bank-paylio.netlify.app/cointex/images/coin/more-features-three-img-2.png" alt="" />
        </div>
        <div>
            <h1>
                Bond Fund</h1>
            <p className='text-gray-400 text-sm'>Equity Fund</p>
        </div>
       </div>
       <div className='flex gap-3 text-sm'>
        <h1>$80,00</h1>
        <p className='bg-green-500 h-6  px-2 rounded-full'>+12.8%</p>
       </div>
    </div>

     <div className='flex justify-between items-center mb-3'>
       <div className='flex items-center gap-2'> 
         <div>
            <img className='w-10' src="https://bank-paylio.netlify.app/cointex/images/coin/our-services-others-icon3.png" alt="" />
        </div>
        <div>
            <h1>Money Market</h1>
            <p className='text-gray-400 text-sm'>Equity Fund</p>
        </div>
       </div>
       <div className='flex gap-3 text-sm'>
        <h1>$18,00</h1>
        <p className='bg-green-500 h-6  px-2 rounded-full'>+4.7%</p>
       </div>
    </div>

     <div className='flex justify-between items-center mb-3'>
       <div className='flex items-center gap-2'> 
         <div>
            <img className='w-10' src="https://bank-paylio.netlify.app/cointex/images/coin/services-icon-img1.png" alt="" />
        </div>
        <div>
            <h1>Tech Fund</h1>
            <p className='text-gray-400 text-sm'>Equity Fund</p>
        </div>
       </div>
       <div className='flex gap-3 text-sm'>
        <h1>$22,00</h1>
        <p className='bg-green-500 h-6  px-2 rounded-full'>+6.8%</p>
       </div>
    </div>

     <div className='flex justify-between items-center mb-3'>
       <div className='flex items-center gap-2'> 
         <div>
            <img className='w-10' src="https://bank-paylio.netlify.app/cointex/images/coin/services-icon-img3.png" alt="" />
        </div>
        <div>
            <h1>Global Fund</h1>
            <p className='text-gray-400 text-sm'>Equity Fund</p>
        </div>
       </div>
       <div className='flex gap-3 text-sm'>
        <h1>$20,00</h1>
        <p className='bg-green-500 h-6  px-2 rounded-full'>+5.2%</p>
       </div>
    </div>

     <div className='flex justify-between items-center mb-3'>
       <div className='flex items-center gap-2'> 
         <div>
            <img className='w-10' src="https://bank-paylio.netlify.app/cointex/images/coin/our-services-two-img3.png" alt="" />
        </div>
        <div>
            <h1>Balanced Fund</h1>
            <p className='text-gray-400 text-sm'>Equity Fund</p>
        </div>
       </div>
       <div className='flex gap-3 text-sm'>
        <h1>$30,00</h1>
        <p className='bg-green-500 h-6  px-2 rounded-full'>+10.2%</p>
       </div>
    </div>

    
   </div>

   </div>
   </section>
  )
}
