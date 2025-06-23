import React from 'react'

function HomepageHeroSection({ style }) {
  return (
    <div className="h-screen w-screen relative flex flex-col items-center justify-center">
      <div className="absolute size-full z-[-2] grayscale hover:grayscale-0 duration-1000" style={style}></div>
      {/* <div className="absolute size-full z-[-1] bg-linear-to-t from-jet-black from-30% to-transparent to 100%"></div> */}
      <div className="absolute size-full z-[-1] bg-radial-[at_50%_35%] from-transparent to-jet-black to-40%"/>
      <div className="flex flex-col items-center justify-center">
        <div className="text-center py-3 flex flex-col gap-6">
          <div>
            <h2 className="text-sunburst leading-10">
              Embrace the Beauty<br/>of The Darkness :
            </h2>
          </div>
          <div className='flex flex-col gap-3'>
            <h1 className="text-sunburst text-center font-bold">
              Through Darkness,<br/>We Can See the Light
            </h1>
          </div>
        </div>
        <div className="py-3 px-6 w-fit rounded-full">
          <h4 className="text-white text-center">MODERN APP FOR EFFORTLESS MOVIE TICKETING</h4>
        </div>
        <p className="text-white">Book the screen. Embrace the scene.</p>
      </div>
    </div>
  )
}

export default HomepageHeroSection