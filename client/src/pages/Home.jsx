import React from 'react'
import Navbar from '../components/Custom/Navbar'
import SearchBar from '../components/Custom/SearchBar'
import CategoryFilters from '../components/Custom/CategoryFilters'
import HeroSection from '../components/Custom/HeroSection'

function Home() {
    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center w-full min-h-screen bg-gray-50">
                <h1 className="mt-10 text-3xl md:text-5xl font-extrabold text-green-900 text-center">Where to?</h1>
                <CategoryFilters />
                <SearchBar />
                <HeroSection />
            </main>
        </>
    )
}

export default Home
