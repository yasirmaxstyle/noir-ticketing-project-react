import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import 'yup-phone'

import Input from '../../components/Input'
import { editUserAction } from '../../redux/reducers/users';

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
  firstname: yup.string().notRequired(),
  lastname: yup.string().notRequired(),
  phone: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').notRequired(),
})

function Profile() {
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver })
  const userData = useSelector(state => state.users.data)
  const userLogin = useSelector(state => state.auth.data)
  const currentUser = userData.find(e => e.id === userLogin[0].data.id)
  const dispatch = useDispatch()

  const onSubmit = (data) => {
    let { phone, email, password, passwordConfirmation, firstname, lastname } = data
    const username = firstname + ' ' + lastname
    if (password === "") password = currentUser.password
    dispatch(editUserAction({
      newData: {
        username,
        phone,
        email,
        password
      },
      id: currentUser.id
    }))
  }

  return (
    <section className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' className='grid gap-6'>
        <div className='w-full bg-graphite grid gap-6 *:grid *:grid-cols-2 *:gap-6 p-6 lg:p-12 rounded'>
          <div className='border-b pb-3'>
            <span className='text-2xl'>
              Details Information
            </span>
          </div>
          <div>
            <div>
              <Input
                {...register('firstname')}
                id="first-name"
                type="text"
                name="firstname"
                title="First Name"
                placeholder='First name'
                className="px-3 w-full outline-0 rounded"
                defaultValue={currentUser.username.split(' ').slice(0, 1).join()}
              />
              {errors.firstname && <span className="text-ash" role="alert">{errors.firstname.message}</span>}
            </div>
            <div>
              <Input
                {...register('lastname')}
                id="last-name"
                type="text"
                name="lastname"
                title="Last Name"
                placeholder='Last name'
                className="px-3 w-full outline-0 rounded"
                defaultValue={currentUser.username.split(' ').slice(1, currentUser.username.length).join(' ')}

              />
              {errors.lastname && <span className="text-ash" role="alert">{errors.lastname.message}</span>}
            </div>
          </div>
          <div>
            <div>
              <Input
                {...register('email')}
                id="email"
                type="email"
                name="email"
                title="Email"
                placeholder={currentUser.email}
                className="px-3 w-full outline-0 rounded"
                defaultValue={currentUser.email}
              />
              {errors.email && <span className="text-ash" role="alert">{errors.email.message}</span>}
            </div>
            <div>
              <Input
                {...register('phone')}
                id="phone"
                type="tel"
                name="phone"
                title="Phone Number"
                placeholder="Phone number"
                className="px-3 w-full outline-0 rounded"
                defaultValue={currentUser.phone || ''}
              />
            </div>
            {errors.phone && <span className="text-ash" role="alert">{errors.phone.message}</span>}
          </div>
        </div>
        <div className='w-full bg-graphite grid gap-6 *:grid *:grid-cols-2 *:gap-6 p-6 lg:p-12 rounded'>
          <div className='border-b pb-3'>
            <span className='text-2xl'>
              Accounts and Privacy
            </span>
          </div>
          <div>
            <div>
              <Input
                {...register('password')}
                id="new-password"
                type="password"
                name="password"
                title="New Password"
                placeholder='Write your password'
                className="px-3 w-full outline-0 rounded"
              />
              {errors.password && <span className="text-ash" role="alert">{errors.password.message}</span>}
            </div>
            <div>
              <Input
                {...register('passwordConfirmation')}
                id="confirm-password"
                type="password"
                name="passwordConfirmation"
                title="Confirm Password"
                placeholder='Confirm your password'
                className="px-3 w-full outline-0 rounded"
              />
              {errors.passwordConfirmation && <span className="text-ash" role="alert">{errors.passwordConfirmation.message}</span>}
            </div>
          </div>
        </div>
        <div>
          <button className='px-12 py-3 text-jet-black bg-sunburst hover:bg-marigold rounded'
            type='submit'>
            <span>Update Changes</span>
          </button>
        </div>
      </form>
    </section>
  )
}

export default Profile