import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const pets = [
    { id: 1, name: "Milo", breed: "Golden Retriever", gender: "Male", age: "2 Yrs", image: "/milo.png", bio: "Milo is a bundle of joy who loves tennis balls and swimming." },
    { id: 2, name: "Bella", breed: "Siamese Cat", gender: "Female", age: "1 Yr", image: "/bella.png", bio: "Bella is an elegant lady who enjoys sunny spots and naps." },
    { id: 3, name: "Rocky", breed: "German Shepherd", gender: "Male", age: "3 Yrs", image: "/rocky.png", bio: "Rocky is a loyal protector who loves training and fetch." },
]

// 1. ADD 'async' HERE
const PetDetailsPage = async ({ params }) => {

    // 2. ADD 'await' HERE
    // In Next.js 15+, params is a Promise. You must resolve it before reading properties.
    const resolvedParams = await params
    const id = parseInt(resolvedParams.id)

    const pet = pets.find((p) => p.id === id)

    if (!pet) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold text-[#2d2d2d]">Pet Not Found 😕</h1>
                <Link href="/pets" className="text-[#E85D04] font-bold underline hover:text-[#d65300]">
                    Go Back Pets
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen  py-20 px-6 flex justify-center items-center">
            <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-[fade-up_0.5s_ease-out] will-change-transform">

                {/* Left: Image */}
                <div className="relative h-[400px] md:h-auto bg-gray-100">
                    <Image
                        src={pet.image}
                        alt={pet.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Right: Details */}
                <div className="p-10 md:p-16 flex flex-col justify-center gap-6">
                    <div>
                        <Link href="/pets" className="text-sm font-bold text-gray-400 hover:text-[#E85D04] mb-4 inline-flex items-center gap-1 transition-colors">
                            <span>←</span> Back to Pets
                        </Link>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-[#2d2d2d] mb-2">{pet.name}</h1>
                        <p className="text-xl text-[#E85D04] font-bold">{pet.breed}</p>
                    </div>

                    <div className="flex gap-4">
                        <Badge label="Age" value={pet.age} />
                        <Badge label="Gender" value={pet.gender} />
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        {pet.bio}
                    </p>

                    <button className="bg-[#2d2d2d] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-[#E85D04] hover:shadow-orange-500/30 hover:-translate-y-1 transition-all duration-300 mt-4 cursor-pointer">
                        Adopt {pet.name} Now
                    </button>
                </div>
            </div>
        </div>
    )
}

const Badge = ({ label, value }) => (
    <div className="bg-orange-50 border border-orange-100 px-4 py-2 rounded-lg">
        <p className="text-xs text-[#E85D04] font-bold uppercase tracking-wider opacity-80">{label}</p>
        <p className="text-[#2d2d2d] font-bold">{value}</p>
    </div>
)

export default PetDetailsPage