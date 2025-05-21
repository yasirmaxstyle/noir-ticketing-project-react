import React from 'react'

function HomepageHeroSection({ style }) {
  return (
    <div className="h-screen w-screen relative flex flex-col items-center justify-center">
      <div className="absolute size-full z-[-2] grayscale hover:grayscale-0 duration-1000" style={style}></div>
      <div className="absolute size-full z-[-1] bg-linear-to-t from-jet-black from-30% to-transparent to 100%"></div>
      <div className="flex flex-col items-center justify-center">
        <div className="py-3 px-6 w-fit rounded-full">
          <h4 className="text-ash">MOVIE TICKET PURCHASES #1 IN INDONESIA</h4>
        </div>
        <div className="text-center">
          <h1 className="text-sunburst">
            Experience the Magic of Cinema:
          </h1>
          <h1 className="text-sunburst font-satoshi text-center font-bold">
            Book Your Tickets Today
          </h1>
        </div>
        <p className="text-ash">Sign up and get the ticket with a lot of discount</p>
      </div>
    </div>
  )
}

export default HomepageHeroSection