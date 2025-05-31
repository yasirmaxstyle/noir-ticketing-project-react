import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup';

import getBackground from "../../api/getBackground"
import Input from "../../components/Input"
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";
import Modal from "../../components/Modal";

const useYupValidationResolver = validationSchema =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false
        });

        return {
          values,
          errors: {}
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message
              }
            }),
            {}
          )
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object({
  email: yup.string().email().required('Email is required')
})

function ResetPage() {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver })
  const [sendEmail, setSendEmail] = useState(false)

  const onSubmit = () => {
    setTimeout(() => {
      setSendEmail(!sendEmail)
    }, 300);
  }

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
        {sendEmail &&
          <>
            <div className="fixed h-full w-full opacity-80 bg-jet-black" />
            <Modal
              message={`Link has been sent to your email. Check it and follow the instructions to reset your password!`}
              button1={'Close'}
              button2={'Back to login'}
              close={onSubmit}
              link={'/auth/login'} />
          </>
        }
        <div className="absolute grayscale blur-sm scale-110 w-full h-full z-[-1]" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }} />
        <div className="max-w-xl w-full bg-platinum rounded-xl shadow-xl p-12 grid gap-6">
          <h2>Trouble logging in? 🧐</h2>
          <p>Enter your email and we'll send you a link to get back into your account.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div>
              <Input
                {...register('email', { required: true })}
                id="email"
                type="email"
                name="email"
                title="Email"
                placeholder="Type your email"
                className="px-3 w-full outline-0 rounded"
              />
              {errors.email && <span className="text-red-500" role="alert">{errors.email.message}</span>}
            </div>
            <button type="submit" className="w-full bg-jet-black text-white px-5 py-3 rounded">Send link</button>
          </form>
          <div className="text-center grid gap-3">
            <div className="flex items-center gap-3">
              <div className="grow border" />
              <span>OR</span>
              <div className="grow border" />
            </div>
            <Link to='/auth/register'>Create new account</Link>
          </div>
          <div className="w-full flex justify-center items-center gap-3">
            <FaArrowLeftLong />
            <Link to='/auth/login'>Back to Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPage