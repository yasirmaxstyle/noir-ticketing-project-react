import { Link } from "react-router"
import toast, { Toaster } from 'react-hot-toast';

function Modal({ message, button1, button2, link, close, loading, title, type, total, notify, onPayment }) {
  const secondButton = () => {
    if (button2) {
      if (link) {
        return (
          <Link to={link}
            className="bg-jet-black text-ash px-6 py-3 rounded">
            <span>{button2}</span>
          </Link>
        )
      } else {
        return (
          <button type="button"
            className="bg-jet-black text-ash px-6 py-3 rounded">
            {button2}
          </button>
        )
      }
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText('12321328913829724')
    notify()
  }
  return (
    <div className={`fixed z-[2] inset-x-0 mx-auto w-md p-6 grid gap-6 bg-ash rounded ${type && 'text-jet-black translate-y-1/2'}`}>
      {loading &&
        <div className="w-full flex justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
          </div>
        </div>
      }
      {type &&
        <>
          <div>
            <h2 className="text-center">{title}</h2>
          </div>
          {total &&
            <div className="grid gap-3">
              <div className="flex justify-between items-center">
                <span>Virtual Account</span>
                <div className="flex items-center gap-1">
                  <span className="font-bold">12321328913829724</span>
                  <button type="button"
                    className="border rounded px-2 py-1 hover:bg-jet-black hover:text-ash"
                    onClick={handleCopy}>Copy</button>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Total Payment</span>
                <span className="font-bold">{total}</span>
              </div>
              <div></div>
            </div>}
          <div>
            <p>{message}</p>
          </div>
          <div className="flex gap-3 font-bold flex-row-reverse">
            <button type="button" onClick={onPayment}
              className="bg-jet-black text-ash px-6 py-3 rounded">
              {button2}
            </button>
            <button type="button" onClick={close}
              className="border px-6 py-3 rounded">
              {button1}
            </button>
          </div>
        </>
      }
      {!type &&
        <>
          <div>
            <p>{message}</p>
          </div>
          <div className="flex gap-3 font-bold flex-row-reverse">
            {secondButton()}
            {button1 &&
              <button type="button" onClick={close}
                className="border px-6 py-3 rounded">
                {button1}
              </button>
            }
          </div>
        </>
      }
    </div>
  )
}

export default Modal