'use client'

import Image from 'next/image'
import Link from 'next/link' // 1. Import Link
import React from 'react'

const PetCard = ({ 
  id, // 2. Add ID here
  name, 
  breed, 
  age, 
  gender, 
  location, 
  image
}) => {
  return (
    // 3. Wrap everything in Link and pass the dynamic ID
    <Link 
      href={`/pet/${id}`} 
      className="group relative w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 block"
    >
      
      {/* ==============================
          1. IMAGE SECTION
      ============================== */}
      <div className="relative h-72 w-full overflow-hidden bg-gray-100">
        <Image 
          src={image} 
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        
        {/* Floating Like Button 
            NOTE: Changed from <button> to <div> to avoid "button inside link" error.
            Added e.preventDefault() to stop navigation when clicking the heart.
        */}
        <div 
          role="button"
          onClick={(e) => {
            e.preventDefault(); // Prevents the Link from opening
            // Add your like logic here (e.g., console.log('Liked!'))
          }}
          className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm p-2.5 rounded-full shadow-sm hover:bg-white text-gray-500 hover:text-red-500 transition-all duration-300 group/heart z-10 cursor-pointer"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/heart:fill-red-500 group-hover/heart:stroke-red-500 transition-colors">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
           </svg>
        </div>

        {/* Gender Badge */}
        <div className="absolute bottom-4 left-4">
             <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-md border border-white/20
                ${gender === 'Male' ? 'bg-blue-50/90 text-blue-600' : 'bg-pink-50/90 text-pink-600'}
             `}>
                {gender}
             </span>
        </div>
      </div>

      {/* ==============================
          2. CONTENT SECTION
      ============================== */}
      <div className="p-6 flex flex-col gap-3">
        
        {/* Name & Breed */}
        <div>
           <div className="flex justify-between items-center mb-1">
              <h3 className="text-2xl font-extrabold text-[#2d2d2d] group-hover:text-[#E85D04] transition-colors">
                {name}
              </h3>
              <span className="text-xs font-bold text-[#E85D04] bg-[#FFF4E6] px-2 py-1 rounded-lg">
                {age}
              </span>
           </div>
           <p className="text-[#5a4a3a]/70 font-medium text-sm">{breed}</p>
        </div>

        {/* Action Button 
            (Visually looks like a button, but it's part of the Link) 
        */}
        <div className="mt-4 w-full py-3 rounded-xl bg-[#2d2d2d] text-white font-bold shadow-lg shadow-gray-200 group-hover:bg-[#E85D04] group-hover:shadow-orange-200 transition-all duration-300 flex items-center justify-center gap-2">
           Meet {name}
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>

      </div>
    </Link>
  )
}

export default PetCard