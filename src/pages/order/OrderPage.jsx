import { useState } from "react"

function OrderPage() {
  console.log(useState(0))
  return (
    <section>
      <div>
        <div></div>
        <div className="grid grid-cols-2 gap-12 p-12 bg-jet-black w-fit">
          <div className='grid grid-cols-7 gap-3 bg-black'>
          {Array.from({ length: 49 }, (_, idx) =>
            <>
              <label htmlFor={`seat-${idx}`} className='bg-ash size-10 rounded'>
                <input type="checkbox" name="seat" id={`seat-${idx}`} className='hidden' />
              </label>
            </>
          )}
        </div>
        <div className='grid grid-cols-7 gap-3 bg-black'>
          {Array.from({ length: 49 }, (_, idx) =>
            <>
              <label htmlFor={`seat-${idx}`} className='bg-ash size-10 rounded'>
                <input type="checkbox" name="seat" id={`seat-${idx}`} className='hidden' />
              </label>
            </>
          )}
        </div>
        </div>
      </div>
      <div></div>
    </section>
  )
}

export default OrderPage