import { useState } from "react";

import { FiMail } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

function Input({ id, type, title, ...props }) {
  const [eye, setEye] = useState(false)
  const handleEye = (e) => {
    e.preventDefault()
    setEye(!eye)
  }
  return (
    <>
      {type === 'text' &&
        <div className={`flex flex-col gap-2`}>
          <label htmlFor={id}>{title}</label>
          <div className="border flex items-center p-3 rounded">
            <input id={id} type={type} {...props} autoComplete="off" />
          </div>
        </div>
      }
      {type === 'tel' &&
        <div className={`flex flex-col gap-2`}>
          <label htmlFor={id}>{title}</label>
          <div className="border flex items-center p-3 rounded">
            <div className="hidden sm:block border-r-1 pr-3">+62</div>
            <input id={id} type={type} {...props} autoComplete="off" />
          </div>
        </div>
      }
      {type === 'email' &&
        <div className={`flex flex-col gap-2`}>
          <label htmlFor={id}>{title}</label>
          <div className="border flex items-center p-3 rounded">
            <FiMail className="hidden sm:block text-xl" />
            <input id={id} type={type} {...props} />
          </div>
        </div>
      }
      {type === 'password' &&
        <div className={`flex flex-col gap-2`}>
          <label htmlFor={id}>{title}</label>
          <div className="border flex items-center p-3 rounded">
            <FaLock className="hidden sm:block text-xl" />
            <input id={id} type={eye ? 'text' : type} {...props} />
            <button onClick={(e) => handleEye(e)}>
              {
                eye ?
                  <FaRegEyeSlash className="block text-xl" /> :
                  <FaRegEye className="block text-xl" />
              }
            </button>
          </div>
        </div>
      }

    </>
  )
}

export default Input