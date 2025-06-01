import { useEffect, useState } from "react";

import NowPlayingMoviesSection from "../sections/NowPlayingMoviesSection";
import HomepageBenefitSection from "../sections/HomepageBenefitSection";
import UpcomingMoviesSection from "../sections/UpcomingMoviesSection";
import HomepageHeroSection from "../sections/HomepageHeroSection";
import NewsLetterSection from "../sections/NewsLetterSection";
import getBackground from "../api/getBackground";

export default function HomePage() {
  const [bgImage, setBgImage] = useState('')
  const [loading, setLoading] = useState(true)

  function getRandom(array) {
    const randomIndex = Math.floor(array.length * Math.random())
    return array[randomIndex]
  }

  useEffect(() => {
    getBackground().
      then(data => {
        const bg = getRandom(data)
        setBgImage(bg)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <main>
        <section>
          {loading ?
            <HomepageHeroSection style={{ backgroundColor: '#1A1A1A' }} /> :
            <HomepageHeroSection style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }} />
          }
        </section>
        <section>
          <NowPlayingMoviesSection />
        </section>
        <section>
          <HomepageBenefitSection />
        </section>
        <section>
          <UpcomingMoviesSection />
        </section>
        <section>
          <NewsLetterSection />
        </section>
      </main>
    </>
  )
}