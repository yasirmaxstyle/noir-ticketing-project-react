function NewsLetterSection() {
  return (
    <div className="flex flex-col items-center bg-jet-black py-20 justify-center p-6">
      <div className="grid place-content-center p-6 gap-12 max-w-[1080px] text-center w-full rounded-xl bg-radial-[at_25%_5%] from-graphite to-jet-black to-70%">
        <h1 className="text-ash md:font-semibold">Subscribe to<br/>Our Newsletter</h1>
        <form className="flex flex-col gap-3 mb-6">
          <div className="grid md:grid-cols-2 gap-3">
            <input type="text" name="firstName" id="firstName" placeholder="Your First Name" className="border-ash border text-ash px-5 py-3 rounded outline-0" autoComplete="off"/>
            <input type="email" name="email" id="email" placeholder="Your Email Address" className="border-ash border text-ash px-5 py-3 rounded outline-0" autoComplete="off"/>
          </div>
          <div>
            <button type="submit" className="w-full shadow-md px-5 py-3 rounded text-white bg-jet-black hover:cursor-pointer hover:bg-marigold">
              Subscribe Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewsLetterSection