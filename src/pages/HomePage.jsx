import { useEffect, useState } from "react";
import getBackground from "../api/getBackground";
import HomepageBenefitSection from "../sections/HomepageBenefitSection";
import UpcomingMoviesSection from "../sections/UpcomingMoviesSection";
import NowPlayingMoviesSection from "../sections/NowPlayingMoviesSection";
import HomepageHeroSection from "../sections/HomepageHeroSection";
import NewsLetterSection from "../sections/NewsLetterSection";


export default function HomePage() {
  const [bgImage, setBgImage] = useState('')

  function getRandom(array) {
    const randomIndex = Math.floor(array.length * Math.random())
    return array[randomIndex]
  }

  useEffect(() => {
    getBackground().
      then(data => {
        const bg = getRandom(data)
        setBgImage(bg)
      })
  }, [])

  return (
    <>
      <main>
        <section>
          <HomepageHeroSection style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }} />
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