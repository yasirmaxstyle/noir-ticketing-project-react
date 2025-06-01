import { PiMedal } from "react-icons/pi";
import { LuHandCoins } from "react-icons/lu";
import { TbHours24 } from "react-icons/tb";

function HomepageBenefitSection() {
  return (
    <div className="bg-jet-black flex flex-col justify-center items-center py-20">
      <div className={`flex flex-col gap-24 max-w-[1080px] px-10`} >
        <div className="flex flex-col gap-3">
          <div className="w-fit self-center">
            <h4 className="text-ash py-3 px-6 rounded-full">WHY CHOOSE US</h4>
          </div>
          <h1 className="text-neutral-50 text-center">Unleashing the Ultimate Movie Experience</h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-graphite rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            <PiMedal className="text-6xl text-ash" />
            <h4 className="text-ash font-bold">Guaranteed</h4>
            <p className="text-ash">Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.</p>
          </div>
          <div className="bg-graphite rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            <LuHandCoins className="text-6xl text-ash" />
            <h4 className="text-ash font-bold">Affordable</h4>
            <p className="text-ash">Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.</p>
          </div>
          <div className="bg-graphite rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            < TbHours24 className="text-6xl text-ash" />
            <h4 className="text-ash font-bold">24/7 Customer Support</h4>
            <p className="text-ash">Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomepageBenefitSection