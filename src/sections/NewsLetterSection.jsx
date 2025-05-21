function NewsLetterSection() {
  return (
    <div className="flex flex-col items-center bg-jet-black h-screen justify-center">
      <div className="flex flex-col items-center p-6 gap-6 max-w-[1080px] text-center bg-graphite w-full rounded-xl">
        <h1 className="text-ash font-semibold">Subscribe to Our Newsletter</h1>
        <form className="flex flex-col gap-3 mb-6">
          <div className="flex gap-3">
            <input type="text" name="firstName" id="firstName" placeholder="Your First Name" className="border-ash border text-ash px-5 py-3 rounded" />
            <input type="email" name="email" id="email" placeholder="Your Email Address" className="border-ash border text-ash px-5 py-3 rounded" />
          </div>
          <div>
            <button type="submit" className="w-full shadow-md px-5 py-3 rounded text-white bg-jet-black">
              Subscribe Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewsLetterSection