import React, { useState } from 'react'
import Navbar from '../components/Custom/Navbar'
import Footer from '../components/Custom/Footer'
import HeroSection from '../components/Home/HeroSection'
import FeatureCards from '../components/Home/FeatureCards'
import PopularDestinations from '../components/Home/PopularDestinations'
import DiscoverSection from '../components/Home/DiscoverSection'
import ForumSection from '../components/Home/ForumSection'

function Home() {
    const [searchFilter, setSearchFilter] = useState(null);
    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-50 overflow-x-hidden">
            <Navbar />
            <main className="flex flex-col flex-1 items-center justify-start w-full h-full">
                <HeroSection onSearch={setSearchFilter} />
                <FeatureCards />
                <PopularDestinations filter={searchFilter} />
                <DiscoverSection />
                <ForumSection />
            </main>
            <Footer />
        </div>
    )
}

export default Home
