import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, replace, useNavigate } from "react-router";
import { loginUserAction } from '../../redux/reducers/auth'
import { useForm } from "react-hook-form";
import * as yup from 'yup';

import getBackground from "../../api/getBackground"
import Input from "../../components/Input"
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
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
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
  terms: yup.boolean().oneOf([true], 'You have to agree to terms and conditions')
})

function LoginPage() {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver })
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [notEmail, setNotEmail] = useState(false)
  const [notPassword, setNotPassword] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const users = useSelector((state) => state.users.data)

  const onSubmit = (data) => {
    if (users.length > 0) {
      let found = users.find(user => user.email === data.email)
      if (found) {
        if (found.password === data.password) {
          dispatch(loginUserAction(found))
          setLoginSuccess(true)
          setTimeout(() => {
            navigate('/', { replace: true })
          }, 3000);
        } else {
          setNotPassword(!notPassword)
        }
      } else {
        setNotEmail(!notEmail)
      }
    } else {
      setNotEmail(!notEmail)
    }
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
        <div className="absolute grayscale blur-sm scale-110 w-full h-full z-[-1]" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }} />
        {notEmail &&
          <>
            <div className="fixed h-full w-full opacity-80 bg-jet-black" />
            <Modal
              message={'Email is not registered. Please proceed to register!'}
              button1={'Try Again'}
              button2={'Register'}
              close={() => setNotEmail(!notEmail)}
              link={'/auth/register'} />
          </>
        }
        {notPassword &&
          <>
            <div className="fixed h-full w-full opacity-80 bg-jet-black" />
            <Modal
              message={'Incorrect password. Please try again!'}
              button1={'Try Again'}
              close={() => setNotPassword(!notPassword)} />
          </>
        }
        {loginSuccess &&
          <>
            <div className="fixed h-full w-full opacity-80 bg-jet-black" />
            <Modal
              loading={true}
              message={'Login success. You are redirecting to home page...'} />
          </>
        }
        <div className="max-w-xl w-full bg-platinum rounded-xl shadow-xl p-12 grid gap-6">
          <h2>Welcome Back👋</h2>
          <p>Sign in with your data that you entered during
            registration.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div>
              <Input
                {...register('email')}
                id="email"
                type="email"
                name="email"
                title="Email"
                placeholder="Type your Email"
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
                placeholder="Type your Password"
                className="px-3 w-full outline-0 rounded"
              />
              {errors.password && <span className="text-red-500" role="alert">{errors.password.message}</span>}
            </div>
            <Link to='/auth/reset-password' className="text-right">Forgot your password?</Link>
            <button type="submit" className="w-full bg-jet-black text-ash px-5 py-3 rounded">LOGIN</button>
          </form>
          <p>Do not have account? <Link to='/auth/register'>Register</Link></p>
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