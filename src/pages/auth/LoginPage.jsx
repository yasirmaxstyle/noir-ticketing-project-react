import { useEffect, useState } from "react"
import Input from "../../components/Input"
import getBackground from "../../api/getBackground"
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router";

function LoginPage() {
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
    <section>
      <div className="w-screen h-screen flex justify-center items-center relative">
        <div className="absolute w-full h-full z-[-1]">
          <img src={bgImage} alt="background" className="grayscale blur-sm" />
        </div>
        <div className="max-w-xl w-full bg-light-almond rounded-xl shadow-xl p-12 grid gap-6">
          <h2>Welcome Back👋</h2>
          <p>Sign in with your data that you entered during
            your registration.</p>
          <form className="grid gap-6">
            <Input
              id="email"
              type="email"
              name="email"
              title="Email"
              placeholder="Type your Email"
              inputClassName="p-2 border-black border-2 rounded"
            />
            <Input
              id="pwd"
              type="password"
              name="pwd"
              title="Password"
              placeholder="Type your Password"
              inputClassName="p-2 border-black border-2 rounded"
            />
            <Link className="text-right">Forgot your password?</Link>
            <button type="submit" className="w-full bg-jet-black text-ash px-5 py-3 rounded">LOGIN</button>
          </form>
          <div className="flex items-center gap-3">
            <div className="grow border" />
            <span>Or</span>
            <div className="grow border" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Link className="p-3 rounded border flex justify-center items-center gap-3">
              <FaGoogle className="text-3xl" />
              <span>Google</span>
            </Link>
            <Link className="p-3 rounded border flex justify-center items-center gap-3">
              <FaFacebook className="text-3xl" />
              <span>Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage