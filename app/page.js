'use client'

import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'

// ==========================================
// 1. UTILS & HOOKS
// ==========================================

const useReveal = (threshold = 0.1) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() 
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

const HeroPremium = () => {
  // We keep useReveal only for non-critical elements (like the floating cards)
  // The H1 and Main Image must NOT rely on this hook for LCP speed.
  const { ref, isVisible } = useReveal()

  return (
    <div ref={ref} className='relative w-full flex justify-center items-center min-h-[85vh] overflow-hidden py-20'>
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className='relative z-10 w-[90%] max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center'>
        
        {/* =======================================
            TEXT SECTION (Left Side)
           ======================================= */}
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left order-last lg:order-first'>
            
            {/* 1. Pill Badge - Uses CSS Animation (delay 0.1s) */}
            <div className="opacity-0 animate-[fade-up_0.8s_ease-out_forwards_100ms]">
                <span className="inline-flex items-center gap-2 bg-orange-50 text-[#E85D04] px-5 py-2 rounded-full text-sm font-bold tracking-wide border border-orange-100 mb-8">
                    <span className="w-2 h-2 rounded-full bg-[#E85D04] animate-pulse"/>
                    Over 500+ pets adopted this month
                </span>
            </div>

            {/* 2. Massive Heading - THIS IS YOUR LCP ELEMENT */}
            {/* SOLUTION: Removed JS conditional classes. Added CSS animation. */}
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-extrabold text-[#2d2d2d] leading-[1.05] tracking-tight mb-8 opacity-0 animate-[fade-up_0.8s_ease-out_forwards_200ms]">
                Find your <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#E85D04] to-[#FF9F1C] relative">
                    soulmate.
                    {/* Artistic Underline */}
                    <svg className="absolute  h-4 -bottom-1 left-0 text-[#FF9F1C] animate-[width-grow_1s_ease-out_forwards_800ms] w-0 opacity-0" viewBox="0 0 200 9" fill="none" preserveAspectRatio="none"><path d="M2.00025 6.99997C2.00025 6.99997 101 -0.500003 198 2.49997" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
                </span>
            </h1>

            {/* 3. Description */}
            <p className="text-lg text-[#5a4a3a] font-medium max-w-lg leading-relaxed mb-10 opacity-0 animate-[fade-up_0.8s_ease-out_forwards_300ms]">
                They aren&apos;t just looking for a home. They are looking for you. Browse hundreds of profiles and find the one that clicks.
            </p>

            {/* 4. Action Area */}
            <div className="flex flex-col sm:flex-row items-center gap-8 w-full opacity-0 animate-[fade-up_0.8s_ease-out_forwards_500ms]">
                <button className='cursor-pointer relative overflow-hidden group bg-[#2d2d2d] text-white font-bold text-lg px-10 py-5 rounded-full shadow-2xl hover:scale-105 transition-all duration-300'>
                    <span className="relative z-10 flex items-center gap-2">
                        Start Adoption
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </button>

                {/* Avatar Stack */}
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-4">
                        {[1,2,3].map((_, i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden relative">
                                <Image 
                                    src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                                    alt="User" 
                                    fill 
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        ))}
                    </div>
                    <div className="text-sm font-semibold text-[#5a4a3a]">
                        <span className="block font-bold text-[#E85D04]">2k+ Families</span>
                        Trust us
                    </div>
                </div>
            </div>
        </div>

        {/* =======================================
            IMAGE SECTION (Right Side)
           ======================================= */}
        <div className="relative opacity-0 animate-[fade-in-scale_1s_ease-out_forwards_300ms]">
            
            {/* The Glow Behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-b from-orange-200/40 to-transparent rounded-full blur-2xl -z-10" />

            {/* Main Image Container */}
            <div className="relative animate-[float_6s_ease-in-out_infinite]">
                 <Image 
                    src="/pets.png" 
                    alt="Main Hero" 
                    width={800} 
                    height={800} 
                    priority // Critical for LCP
                    className="object-contain drop-shadow-2xl relative z-10 hover:scale-[1.02] transition-transform duration-500"
                 />
            </div>

            {/* FLOATING CARD - Keeps JS Hook because it's not critical for LCP */}
            <div className={`
                absolute bottom-10 right-4 lg:-right-8 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50
                animate-[float_5s_ease-in-out_infinite_1s]
                transition-all duration-1000 ease-out delay-700
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}>
                <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Just Adopted</p>
                        <p className="text-sm font-bold text-gray-800">Milo found a home!</p>
                    </div>
                </div>
            </div>

        </div>

      </div>

      {/* PURE CSS ANIMATIONS (No JS Required) 
          This is what makes the LCP fast. The browser paints this immediately.
      */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-scale {
            0% { opacity: 0; transform: scale(0.95) translateX(20px); }
            100% { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes width-grow {
            0% { width: 0; opacity: 0; }
            100% { width: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default HeroPremium