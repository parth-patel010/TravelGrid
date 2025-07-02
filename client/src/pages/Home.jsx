import React from 'react'
import Navbar from '../components/Custom/Navbar'
import SearchBar from '../components/Custom/SearchBar'
import CategoryFilters from '../components/Custom/CategoryFilters'
import HeroSection from '../components/Custom/HeroSection'

function Home() {
    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50">
            <Navbar />
            <main className="flex flex-col flex-1 items-center justify-start w-full">
                <h1 className="mt-10 text-3xl md:text-5xl font-extrabold text-green-900 text-center">Where to?</h1>
                <CategoryFilters />
                <SearchBar />
                <HeroSection />
            </main>
        </div>
    )
}

export default Home
