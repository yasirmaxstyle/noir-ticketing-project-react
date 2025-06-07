import logo from '../assets/new-noir.svg'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import cineone from "../assets/sponsor/cineone.svg"
import ebv from "../assets/sponsor/ebv.svg"
import hiflix from "../assets/sponsor/hiflix.svg"

function Footer() {
  return (
    <footer>
      <div className='bg-graphite flex flex-col items-center justify-center p-6 gap-6'>
        <div className='grid md:grid-cols-4 max-w-[1080px] w-full gap-6'>
          <div className='text-white grid gap-3'>
            <img src={logo} alt="logo tickitz" className='w-50' />
            <p>Stop waiting in line. Buy tickets conveniently, watch movies quietly.</p>
          </div>
          <div className='text-white grid gap-2'>
            <h4 className='font-bold'>EXPLORE</h4 >
            <ul>
              <li>Cinemas</li>
              <li>Movie List</li>
              <li>My Ticket</li>
              <li>Notification</li>
            </ul>
          </div>
          <div className='text-white grid gap-2'>
            <h4 className='font-bold'>OUR SPONSOR</h4 >
            <img src={ebv} alt="ebv logo" />
            <img src={cineone} alt="cineone logo" />
            <img src={hiflix} alt="hiflix logo" />
          </div>
          <div className='text-white grid gap-2'>
            <h4 className='font-bold'>FOLLOW US</h4 >
            <a href="" className='flex items-center gap-3'>
              <FaFacebook />
              <span>noir.cinema.id</span>
            </a>
            <a href="" className='flex items-center gap-3'>
              <FaInstagram />
              <span>noir.cinema.id</span>
            </a>
            <a href="" className='flex items-center gap-3'>
              <FaXTwitter />
              <span>noir.cinema.id</span>
            </a>
            <a href="" className='flex items-center gap-3'>
              <FaYoutube />
              <span>noir.cinema.id</span>
            </a>
          </div>
        </div>
        <span className='text-white m-3'>© 2025 Noir. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default Footer