import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUserAction } from '../../redux/reducers/users'
import { useForm } from "react-hook-form";
import * as yup from 'yup';

import Input from "../../components/Input"
import getBackground from "../../api/getBackground"
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Modal from "../../components/Modal";
import moment from "moment/moment";
import toast, { Toaster } from "react-hot-toast";

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
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Password is required'),
  terms: yup.boolean().oneOf([true], 'You have to agree to terms and conditions')
})

function RegisterPage() {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver })
  const users = useSelector((state) => state.users.data)
  let navigate = useNavigate()
  const [usedEmail, setUsedEmail] = useState(false)

  const dispatch = useDispatch()

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

  const onSubmit = (data) => {
    const { terms, passwordConfirmation, ...userData } = data
    const currentTime = moment().format('LLL')
    const obj = {
      ...userData,
      username: userData.email.split('@').slice(0, 1).join(),
      avatar: '/src/assets/avatar.svg',
      role: 'user',
      createdAt: currentTime
    }
    if (users.length > 0) {
      if (users.find(user => user.email === data.email)) {
        handleModal()
      } else {
        dispatch(addUserAction(obj))
        redirecting()
      }
    } else {
      dispatch(addUserAction(obj))
      redirecting()
    }
  }

  const handleModal = () => {
    setUsedEmail(!usedEmail)
  }

  const redirecting = () => {
    notify()
    setTimeout(() => {
      navigate('/auth/login')
    }, 1000);
  }

  const notify = () => {
    toast.success('Registration is successful')
  }

  return (
    <section>
      <div className="w-screen h-screen flex justify-center items-center relative">
        <Toaster />
        <div className="absolute grayscale blur-sm scale-110 w-full h-full z-[-1]" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }} />
        {usedEmail &&
          <>
            <div className="fixed h-full w-full opacity-80 bg-jet-black" />
            <Modal
              message={'Email has been registered. Please use another one, or proceed to Login!'}
              button1={'Try Again'}
              button2={'Login'}
              close={handleModal}
              link={'/auth/login'} />
          </>
        }
        <div className="max-w-xl w-full p-12 bg-platinum rounded-xl shadow-xl grid gap-6">
          <div className="text-center">
            <h2>Create Account</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div>
              <Input
                {...register('email')}
                id="email"
                type="email"
                name="email"
                title="Email"
                placeholder="Type your email"
                className="px-3 w-full outline-0 rounded"
              />
              {errors.email && <span className="text-red-500" role="alert">{errors.email.message}</span>}
            </div>
            <div>
              <Input
                {...register('password')}
                id="password"
                type="password"
                name="password"
                title="Password"
                placeholder="Type your password"
                className="px-3 w-full outline-0 rounded"
              />
              {errors.password && <span className="text-red-500" role="alert">{errors.password.message}</span>}
            </div>
            <div>
              <Input
                {...register('passwordConfirmation')}
                id="passwordConfirmation"
                type="password"
                name="passwordConfirmation"
                title="Password Confirmation"
                placeholder="Type your password again"
                className="px-3 w-full outline-0 rounded"
              />
              {errors.passwordConfirmation && <span className="text-red-500" role="alert">{errors.passwordConfirmation.message}</span>}
            </div>
            <div>
              <div className="flex gap-3 items-center">
                <input {...register('terms')} type="checkbox" name="terms" id="agree-terms" value={true} />
                <label htmlFor="agree-terms">I agree to terms & conditions</label>
              </div>
              {errors.terms && <span className="text-red-500" role="alert">{errors.terms.message}</span>}
            </div>
            <button type="submit" className="w-full bg-jet-black text-ash px-5 py-3 rounded">REGISTER</button>
          </form>
          <p>Already have an account? <Link to='/auth/login'>Log in</Link></p>
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

export default RegisterPage