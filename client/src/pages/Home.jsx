import React, { useState } from 'react'
import Navbar from '../components/Custom/Navbar'
import Footer from '../components/Custom/Footer'
import HeroSection from '../components/Home/HeroSection'
import FeatureCards from '../components/Home/FeatureCards'
import ForumSection from '../components/Home/ForumSection'
import DiscoverSection from '../components/Home/DiscoverSection'
import FeaturedPackages from '../components/Home/FeaturedPackages'
import TravelGuides from '../components/Home/TravelGuides'
import Testimonials from '../components/Home/Testimonials'

function Home() {
    const [searchFilter, setSearchFilter] = useState(null);
    return (
        <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-blue-50 to-pink-50 overflow-x-hidden">
            <Navbar />
            <main className="flex flex-col flex-1 items-center justify-start w-full h-full">
                <HeroSection onSearch={setSearchFilter} />
                <FeatureCards />
                <FeaturedPackages />
                <TravelGuides />
                <Testimonials />
                <ForumSection />
                <DiscoverSection />
            </main>
            <Footer />
        </div>
    )
}

export default Home
