'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

// ==========================================
// 1. REUSE THE CUSTOM HOOK
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

const DonatePage = () => {
  const [amount, setAmount] = useState(25)
  const [type, setType] = useState('one-time') 

  // Animation Refs
  const { ref: leftRef, isVisible: leftVisible } = useReveal(0.1)
  const { ref: formRef, isVisible: formVisible } = useReveal(0.1)
  const { ref: gridRef, isVisible: gridVisible } = useReveal(0.2) 

  const presetAmounts = [10, 25, 50, 100]
  const easeCurve = "ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"

  const impactData = [
    { icon: "💊", title: "Medical Care", desc: "$50 provides essential vaccinations for one rescue puppy." },
    { icon: "🍲", title: "Nutritious Food", desc: "$25 feeds a large dog for two full weeks." },
    { icon: "🏠", title: "Safe Shelter", desc: "$100 keeps our heating running for the entire winter month." },
    { icon: "🎾", title: "Rehabilitation", desc: "$10 buys toys and treats to help traumatized pets learn to trust." },
  ]

  return (
    // FIX: Removed 'overflow-hidden' from here. 
    // Sticky elements DO NOT work inside overflow-hidden containers.
    <div className="min-h-screen py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* ==========================================
            LEFT COLUMN: Story & Impact (Span 7)
           ========================================== */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* 1. Header & Image Wrapper */}
          <div 
             ref={leftRef}
             className={`transition-all duration-1000 ${easeCurve} ${leftVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
              <div className="mb-10">
                <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-4">
                   Make a Difference
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold text-[#2d2d2d] mb-6 leading-tight">
                   Help us save <br/>
                   <span className="text-[#E85D04]">more lives.</span>
                </h1>
                <p className="text-lg text-[#5a4a3a] leading-relaxed opacity-80 max-w-xl">
                   We rely 100% on donations from people like you. Your contribution provides medical care, food, and shelter for animals who have nowhere else to go.
                </p>
              </div>

              <div className="relative w-full h-[400px] rounded-4xl overflow-hidden shadow-2xl shadow-orange-900/10 group">
                 <Image 
                   src="/milo.png" 
                   alt="Happy dog"
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end p-8">
                    <p className="text-white font-bold text-xl">Milo found his home thanks to donors like you.</p>
                 </div>
              </div>
          </div>

          {/* 2. Impact Grid (Staggered Animation) */}
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8"
          >
             {impactData.map((item, index) => (
                <div 
                   key={index}
                   style={{ transitionDelay: `${index * 150}ms` }} 
                   className={`transition-all duration-1000 ${easeCurve} ${gridVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
                >
                    <ImpactCard 
                        icon={item.icon} 
                        title={item.title} 
                        desc={item.desc} 
                    />
                </div>
             ))}
          </div>

        </div>

        {/* ==========================================
            RIGHT COLUMN: Sticky Donation Form (Span 5)
           ========================================== */}
        <div className="lg:col-span-5 relative">
           {/* This div acts as the sticky container. 
              The 'sticky' class makes it stick, 'top-10' gives it spacing from the ceiling.
           */}
           <div 
              ref={formRef}
              className={`
                sticky top-10 
                bg-white p-8 md:p-10 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-orange-50 
                transition-all duration-1000 delay-300 ${easeCurve}
                ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
              `}
            >
              
              {/* Type Toggles */}
              <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
                 <button 
                    onClick={() => setType('one-time')}
                    className={`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 ${type === 'one-time' ? 'bg-white text-[#2d2d2d] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                    Give Once
                 </button>
                 <button 
                    onClick={() => setType('monthly')}
                    className={`flex-1 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 ${type === 'monthly' ? 'bg-white text-[#E85D04] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                    Monthly ❤️
                 </button>
              </div>

              {/* Amount Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                 {presetAmounts.map((preset) => (
                    <button
                       key={preset}
                       onClick={() => setAmount(preset)}
                       className={`py-4 rounded-2xl font-bold text-xl border-2 transition-all duration-200
                          ${amount === preset 
                             ? 'border-[#E85D04] bg-[#FFF4E6] text-[#E85D04]' 
                             : 'border-transparent bg-gray-50 text-[#5a4a3a] hover:bg-gray-100'
                          }
                       `}
                    >
                       ${preset}
                    </button>
                 ))}
              </div>

              {/* Custom Amount */}
              <div className="relative mb-8">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                 <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#E85D04] rounded-2xl py-4 pl-8 pr-4 text-[#2d2d2d] font-bold outline-none transition-all"
                    placeholder="Custom Amount"
                 />
              </div>

              {/* Donate Button */}
              <button className="w-full bg-[#E85D04] text-white font-extrabold text-xl py-5 rounded-2xl shadow-xl shadow-orange-500/30 hover:scale-[1.02] hover:shadow-orange-500/50 transition-all duration-300 active:scale-95 cursor-pointer">
                 Donate ${amount} {type === 'monthly' ? '/ month' : ''}
              </button>

              {/* Trust Footer */}
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs font-semibold uppercase tracking-wide">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                 Secure SSL Payment
              </div>

           </div>
        </div>

      </div>
    </div>
  )
}

const ImpactCard = ({ icon, title, desc }) => (
    <div className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-lg transition-all duration-300 h-full">
        <div className="w-12 h-12 shrink-0 bg-orange-50 rounded-full flex items-center justify-center text-2xl">
            {icon}
        </div>
        <div>
            <h3 className="font-bold text-[#2d2d2d]">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mt-1">{desc}</p>
        </div>
    </div>
)

export default DonatePage