import React, { useState } from 'react'
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
        <div className="flex flex-col min-h-screen w-full  overflow-x-hidden bg-black">
            <main className="flex flex-col flex-1 items-center justify-start w-full h-full">
                <HeroSection onSearch={setSearchFilter} />
                <FeatureCards />
                <FeaturedPackages />
                <TravelGuides />
                <Testimonials />
                <ForumSection />
                <DiscoverSection />
            </main>
        </div>
    )
}

export default Home
