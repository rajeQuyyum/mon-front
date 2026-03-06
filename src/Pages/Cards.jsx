import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

export default function Cards() {

    const [display, setDisplay] = useState(true)
     const [display2, setDisplay2] = useState(false)
  return (
    <section className='pt-20 ml-52'>

        
            <div className='flex items-center gap-1 mb-3 m-auto'>
                <FaStar className='text-yellow-400' />
                <h1 className='text-green-500 text-lg font-serif'>Investment Portfolio</h1>
               </div>

               <ul className='flex justify-between'>
                <div>
                     <h1 className={`text-white` } onClick={() => setDisplay(prev => !prev)}>My Holdings</h1>
                    <li className={`border border-green-500 relative   ${display ? 'block' : 'hidden'}`} >
                <div className='text-white '>
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
        <p className='bg-red-500 h-6  px-2 rounded-full'>+12.8%</p>
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
                </li>
                </div>

                <div className=''>
                    <h1 className={`text-white ` }  onClick={() => setDisplay2(prev => !prev)}>Top Funds</h1>
                    <li className={`border border-red-500   relative ${display2 ? 'block' : 'hidden'}`} >
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
                    </li>
                </div>
               </ul>
            
       

    </section>
  )
}
