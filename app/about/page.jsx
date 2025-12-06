'use client'

import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'

// ==========================================
// 1. CUSTOM HOOKS (KEPT PERFECT)
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

const useParallax = () => {
  const ref = useRef(null)
  
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleScroll = () => {
      if (!ref.current) return
      const scrolled = window.scrollY
      const parent = ref.current.parentElement
      if (!parent) return
      
      const rect = parent.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const speed = 0.15 
        ref.current.style.transform = `translateY(${rect.top * speed}px)`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return ref
}


// ==========================================
// 2. MAIN PAGE
// ==========================================

const AboutPage = () => {
  return (
    <div className="w-full overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 flex flex-col gap-24 lg:gap-40">
        <HeroSection />
        <StorySection />
        <StatsSection />
        <CTASection />
      </div>
    </div>
  )
}


// ==========================================
// 3. SUB-COMPONENTS
// ==========================================

const HeroSection = () => {
  const { ref: textRef, isVisible: textVisible } = useReveal()
  const { ref: imgRef, isVisible: imgVisible } = useReveal(0.2)

  const transitionBase = "transition-all duration-1000 ease-[cubic-bezier(0.17,0.55,0.55,1)]"
  
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      
      {/* TEXT SIDE */}
      <div ref={textRef} className="flex flex-col items-start gap-6 order-last lg:order-first">
        
        {/* Badge */}
        <div className={`${transitionBase} delay-100 ${textVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
          <span className="bg-[#fff0da] text-[#E85D04] px-4 py-1.5 rounded-full text-sm font-bold tracking-wide shadow-sm border border-[#E85D04]/20 uppercase">
            🐾 Our Mission
          </span>
        </div>

        {/* Heading - MORE EMOTIONAL IMPACT */}
        <h1 className={`${transitionBase} delay-200 ${textVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'} text-4xl lg:text-6xl font-extrabold text-[#2d2d2d] leading-[1.1] tracking-tight`}>
          We don&apos;t just rescue. <br />
          <span className="relative inline-block text-[#E85D04]">
            We rewrite stories.
            <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#FF9F1C] opacity-60" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C2.00025 6.99997 101 -0.500003 198 2.49997" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
          </span>
        </h1>

        {/* Paragraph - CLEARER VALUE PROPOSITION */}
        <p className={`${transitionBase} delay-300 ${textVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'} text-lg text-[#5a4a3a] font-medium max-w-lg leading-relaxed opacity-90`}>
          From the moment they enter our care to the second they find their forever home, we provide the medical attention, rehabilitation, and unconditional love that every living being deserves.
        </p>

        {/* Button */}
        <div className={`${transitionBase} delay-500 ${textVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'} pt-4`}>
          <button className="text-[#E85D04] font-bold flex items-center gap-2 group text-lg">
            See our impact <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* IMAGE SIDE (Clip Path Reveal) */}
      <div ref={imgRef} className="hero-image-container relative h-[500px] lg:h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl shadow-orange-900/5">
        <div 
          className={`w-full h-full relative transition-all duration-1500 ease-[cubic-bezier(0.19,1,0.22,1)] will-change-[clip-path,transform]
          ${imgVisible ? '[clip-path:inset(0_0_0_0)] scale-100' : '[clip-path:inset(100%_0_0_0)] scale-110'}`}
        >
          <Image src="/about-hero-1.png" alt="A volunteer holding a happy dog" fill priority className="object-cover" />
        </div>
      </div>
    </section>
  )
}

const StorySection = () => {
  const { ref: textRef, isVisible: textVisible } = useReveal()
  const parallaxRef = useParallax()

  const transitionBase = "transition-all duration-1000 ease-out"

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* IMAGE SIDE (Parallax) */}
      <div className="relative h-[500px] lg:h-[700px] w-full rounded-[40px] overflow-hidden order-last lg:order-first bg-orange-50 shadow-lg">
        <div className="h-[120%] w-full relative -top-[10%] will-change-transform">
          <div ref={parallaxRef} className="w-full h-full relative"> 
             <Image src="/about-story-1.png" alt="A veterinarian treating a cat" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* TEXT SIDE - BETTER STORYTELLING */}
      <div ref={textRef} className="flex flex-col items-start gap-10">
        <div className={`${transitionBase} delay-100 ${textVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#2d2d2d] mb-4">A sanctuary for the forgotten.</h2>
          <p className="text-lg text-[#5a4a3a] font-medium max-w-lg leading-relaxed opacity-90">
            What began as a small community effort has evolved into a state-of-the-art facility. We focus on the &quot;unadoptables&quot;—the seniors, the injured, and the traumatized—giving them the time they need to heal.
          </p>
        </div>
        
        <div className={`${transitionBase} delay-300 ${textVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#2d2d2d] mb-4">A promise kept to every tail.</h2>
          <p className="text-lg text-[#5a4a3a] font-medium max-w-lg leading-relaxed opacity-90">
            We are a strict no-kill organization. Once an animal enters our doors, they are family. Whether it takes two weeks or two years to find their perfect match, they are safe with us.
          </p>
        </div>
      </div>
    </section>
  )
}

const StatsSection = () => {
  const { ref, isVisible } = useReveal()

  return (
    <section ref={ref} className="stats-container py-10">
      <div className={`text-center mb-16 flex flex-col items-center gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl lg:text-5xl font-bold text-[#2d2d2d]">Proof of Compassion</h2>
        <p className="text-[#5a4a3a] text-lg max-w-xl">Numbers don&apos;t lie, but they can&apos;t capture the purrs and tail wags behind them.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard number="5,200+" label="Lives Saved" isVisible={isVisible} delay="delay-100" />
        <StatCard number="4,850+" label="Forever Homes Found" isVisible={isVisible} delay="delay-200" />
        <StatCard number="120+" label="Community Heroes" isVisible={isVisible} delay="delay-300" />
      </div>
    </section>
  )
}

const CTASection = () => {
  const { ref, isVisible } = useReveal()

  return (
    <section ref={ref} className={`
      bg-[#FF9F1C] rounded-[40px] p-12 lg:p-24 text-center flex flex-col items-center gap-8 shadow-2xl shadow-orange-500/30 relative overflow-hidden transform-gpu
      transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]
      ${isVisible ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-sm'}
    `}>
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 mix-blend-overlay pointer-events-none" style={{ clipPath: 'circle(70% at 50% 120%)'}}></div>
      
      {/* STRONGER CALL TO ACTION */}
      <h2 className="text-white text-4xl lg:text-6xl font-extrabold relative z-10 leading-tight">
        Their future starts <br className="hidden md:block"/> with you.
      </h2>
      <p className="text-white/90 text-xl max-w-2xl font-medium relative z-10">
        Every donation feeds a hungry belly. Every volunteer hour comforts a lonely soul. Join the movement today.
      </p>
      <div className="flex gap-4 relative z-10 pt-8">
        <button className='cursor-pointer bg-white text-[#E85D04] font-extrabold px-12 py-5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 text-lg tracking-wide'>
          Adopt a Best Friend
        </button>
      </div>
    </section>
  )
}

const StatCard = ({ number, label, isVisible, delay }) => (
  <div className={`
    bg-white/80 backdrop-blur-md border border-[#F8D6B3]/50 rounded-3xl p-10 flex flex-col items-center text-center shadow-xl shadow-orange-100/50 
    transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${delay}
    ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90'}
  `}>
    <h3 className="text-5xl lg:text-7xl font-extrabold text-[#E85D04] mb-3 tracking-tight">{number}</h3>
    <p className="text-[#5a4a3a] font-bold text-lg uppercase tracking-wider opacity-80">{label}</p>
  </div>
)

export default AboutPage