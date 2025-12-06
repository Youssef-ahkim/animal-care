'use client'

import PetCard from '@/components/PetCard'
import React, { useRef, useEffect, useState } from 'react'

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
// 2. MAIN PAGE COMPONENT
// ==========================================

const Page = () => {
  // We use two separate reveals: 
  // 1. One for the Title/Header
  // 2. One for the Grid (to trigger the stagger effect)
  const { ref: headerRef, isVisible: headerVisible } = useReveal(0.1)
  const { ref: gridRef, isVisible: gridVisible } = useReveal(0.1)

  const pets = [
    { id: 1, name: "Milo", breed: "Golden Retriever", gender: "Male", age: "2 Yrs", image: "/milo.png" },
    { id: 2, name: "Bella", breed: "Siamese Cat", gender: "Female", age: "1 Yr", image: "/bella.png" },
    { id: 3, name: "Rocky", breed: "German Shepherd", gender: "Male", age: "3 Yrs", image: "/rocky.png" },
  ]

  // Premium easing curve (same as your About page)
  const easeCurve = "ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"

  return (
    <div className="min-h-screen py-20 px-6 overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* ==========================
            HEADER SECTION
           ========================== */}
        <div 
          ref={headerRef} 
          className={`
            mb-16 text-center transition-all duration-1000 ${easeCurve}
            ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
            <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-[#E85D04] text-xs font-bold tracking-widest uppercase mb-4">
                Waiting for Love
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#2d2d2d] mb-6">
                Meet the <span className="text-[#E85D04]">New Arrivals</span>
            </h2>
            <p className="text-[#5a4a3a] text-lg max-w-2xl mx-auto leading-relaxed opacity-80">
                These cuties are waiting for a loving home. Browse their profiles and find your perfect match today.
            </p>
        </div>

        {/* ==========================
            GRID CONTAINER
           ========================== */}
        <div 
            ref={gridRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
           {pets.map((pet, index) => (
             <div 
                key={pet.id}
                // ANIMATION LOGIC:
                // We use the index to calculate delay (index * 150ms)
                // This creates the "waterfall" or "stagger" effect.
                style={{ transitionDelay: `${index * 150}ms` }}
                className={`
                    transition-all duration-1000 ${easeCurve}
                    ${gridVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-24 scale-90'}
                `}
             >
                 <PetCard 
                 id={pet.id}
                    name={pet.name}
                    breed={pet.breed}
                    gender={pet.gender}
                    age={pet.age}
                    image={pet.image}
                 />
             </div>
           ))}
        </div>

      </div>
    </div>
  )
}

export default Page