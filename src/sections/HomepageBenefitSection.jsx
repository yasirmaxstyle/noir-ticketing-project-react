import { MdScreenRotation } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { SiRclone } from "react-icons/si";

function HomepageBenefitSection() {
  return (
    <div className="bg-jet-black flex flex-col justify-center items-center py-20">
      <div className={`flex flex-col gap-24 max-w-[1080px] px-10`} >
        <div className="flex flex-col gap-3">
          <div className="w-fit self-center">
            <h4 className="text-ash py-3 px-6 rounded-full">WHY CHOOSE US</h4>
          </div>
          <h1 className="text-neutral-50 text-center">Unleashing the Ultimate<br />Movie Experience</h1>
        </div>
        <div className="grid md:flex gap-4">
          <div className="bg-radial-[at_25%_5%] from-graphite to-jet-black to-60% rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            <MdScreenRotation className="text-4xl text-ash" />
            <h4 className="text-ash font-bold">Cinematic Experience</h4>
            <p className="text-ash">Noir’s dark theme and sleek UI bring the feel of the theater right to your screen — immersive, elegant, and easy to use.</p>
          </div>
          <div className="bg-radial-[at_25%_5%] from-graphite to-jet-black to-60% rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            <IoTicketOutline className="text-4xl text-ash" />
            <h4 className="text-ash font-bold">Effortless Booking</h4>
            <p className="text-ash">From real-time seat maps to secure payments, users can book tickets in seconds — no queues, no hassle.</p>
          </div>
          <div className="bg-radial-[at_25%_5%] from-graphite to-jet-black to-60% rounded-2xl p-6 flex flex-col items-center text-center gap-3">
            < SiRclone className="text-4xl text-ash" />
            <h4 className="text-ash font-bold">All-in-One System</h4>
            <p className="text-ash">With user profiles, history tracking, and a built-in admin dashboard for theater management, Noir streamlines operations from both sides of the screen.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomepageBenefitSection