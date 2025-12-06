'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full flex justify-center pt-5 z-50 shrink-0">
        
        {/* Main Nav Container */}
        <nav className='bg-[#F8D6B3] w-[90%] max-w-7xl rounded-3xl shadow-xl'>
            
            <div className='flex justify-between items-center px-6 py-4 md:px-8 md:py-5'>
                
                {/* 1. LEFT: Logo */}
                <Link href="/" className="shrink-0 cursor-pointer z-50 relative">
                    <Image 
                        src="/nav-logo.png" 
                        width={140} 
                        height={43.44} 
                        alt="Logo" 
                        // Added priority to ensure logo loads fast on weak connections
                        priority 
                        className="object-contain"
                    />
                </Link>

                {/* 2. CENTER: Desktop Links */}
                <ul className='hidden md:flex flex-1 justify-center gap-10 list-none font-bold text-gray-900 text-lg tracking-wide'>
                    {['Home', 'About', 'Pets', 'Donate'].map((item) => (
                        <li key={item} className='relative group'>
                            <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className='group-hover:text-orange-600 transition-colors duration-200'>
                                {item}
                            </Link>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    ))}
                </ul>

                {/* 3. RIGHT: Desktop CTA */}
                <div className="hidden md:block shrink-0">
                    <button className='cursor-pointer bg-[#FF9F1C] text-white font-extrabold px-8 py-3 rounded-full shadow-md hover:bg-orange-500 hover:shadow-lg transition-colors duration-200 lowercase text-lg'>
                        find a friend
                    </button>
                </div>

                {/* MOBILE: Hamburger Icon */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className='cursor-pointer md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none z-50'
                    aria-label="Toggle menu"
                >
                    {/* Simplified rotation logic for better performance */}
                    <span className={`block w-8 h-1 bg-gray-900 rounded-full transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                    <span className={`block w-8 h-1 bg-gray-900 rounded-full transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`block w-8 h-1 bg-gray-900 rounded-full transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                </button>
            </div>

            {/* MOBILE MENU: OPTIMIZED */}
            {/* Optimization: 
                1. Removed 'transition-all' from children.
                2. Only animating Max-Height and Opacity on the parent wrapper.
                3. Removed the slide-up/down movement of text (translate-y), just simple fade.
            */}
            <div 
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className='flex flex-col items-center pb-8 pt-2 gap-6 md:hidden'>
                    <ul className='flex flex-col items-center gap-5 list-none font-bold text-gray-900 text-xl tracking-wide w-full'>
                        {['Home', 'About', 'Pets', 'Donate'].map((item) => (
                            <li key={item} className="w-full text-center">
                                <Link 
                                    href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
                                    onClick={() => setIsMenuOpen(false)}
                                    className='block py-2 active:text-orange-600'
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile CTA */}
                    <button className='cursor-pointer bg-[#FF9F1C] text-white font-extrabold px-8 py-3 rounded-full shadow-md active:bg-orange-500 transition-colors lowercase text-lg w-[80%]'>
                        find a friend
                    </button>
                </div>
            </div>

        </nav>
    </div>
  )
}

export default Nav