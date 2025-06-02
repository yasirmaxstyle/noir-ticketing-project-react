import { useDispatch, useSelector } from 'react-redux'
import { useCallback, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import moment from "moment/moment";

import Input from '../../components/Input'
import InputHidden from '../../components/InputHidden'
import logobca from '../../assets/payment/bca.svg'
import logobri from '../../assets/payment/bri.svg'
import logodana from '../../assets/payment/dana.svg'
import logogopay from '../../assets/payment/gopay.svg'
import logogpay from '../../assets/payment/gpay.svg'
import logopaypal from '../../assets/payment/paypal.svg'
import logovisa from '../../assets/payment/visa.svg'
import logoovo from '../../assets/payment/ovo.svg'

import Modal from "../../components/Modal";
import toast, { Toaster } from 'react-hot-toast';

import { FaCheck } from "react-icons/fa6";
import { addPaymentAction, finishPaymentAction } from '../../redux/reducers/transaction';
import { addHistoryAction } from '../../redux/reducers/historyTransactions';

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
  payment: yup.string().required('Please select a payment method')
})

function PaymentPage() {
  const [doPayment, setDoPayment] = useState(false)
  const resolver = useYupValidationResolver(validationSchema)
  const { handleSubmit, register, formState: { errors } } = useForm({ resolver })
  const { id } = useParams()
  const dataOrder = useSelector(state => state.transaction.data)
  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [isDue, setIsDue] = useState(false)

  const currentOrder = dataOrder.find(data => data.id === id)

  const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')
  const nextFiveSeconds = moment().add(5, 'seconds')

  const onSubmit = ({ data }) => {
    const obj = {
      payment: {
        name: data,
        status: 'not paid',
        createdAt: currentTime,
        dueTime: nextFiveSeconds.format('MMMM Do YYYY, h:mm:ss a')
      },
      transactionId: currentOrder.transactionId
    }
    dispatch(addPaymentAction(obj))
    setDoPayment(!doPayment)
  }

  const handlePayment = () => {
    const current = moment().seconds()

    let status
    const obj = {
      status,
      transactionId: currentOrder.transactionId
    }

    if (current > nextFiveSeconds.seconds()) {
      status = 'not paid'
      dispatch(addHistoryAction({
        ...currentOrder,
        status
      }))
      dispatch(finishPaymentAction(obj))
      setDoPayment(!doPayment)
      setIsDue(!isDue)
    } else {
      status = 'paid'
      dispatch(addHistoryAction({
        ...currentOrder,
        status
      }))
      dispatch(finishPaymentAction(obj))
      setTimeout(() => {
        navigate('result')
      }, 1000);
    }
  }

  const notify = () => {
    toast.success('Text is copied')
  }

  const handleClose = () => {
    setDoPayment(!doPayment)
    toast.custom((t) => (
      <div
        className={`${t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Your payment is saved
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Check history to see it!
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <Link to='/profile/history'
            className='w-full border border-transparent p-4 flex items-center justify-center text-sm font-medium text-jet-black hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center'
          >
            See history
          </Link>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-jet-black hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ))
  }

  return (
    <section className='w-screen flex flex-col justify-center items-center bg-jet-black'>
      <Toaster />
      <div className='max-w-2xl my-20 w-full mx-auto text-ash flex flex-col items-center'>
        {isDue &&
          <>
            <div className="fixed z-[1] inset-0 h-screen w-screen opacity-80 bg-jet-black" />
            <Modal
              title='Oops!!!'
              type='payment'
              message={`Sorry! Your time is over! But it's ok. You can book your ticket again`}
              button1={'Close'}
              button2={'Book again'}
              close={() => setIsDue(!isDue)}
              onPayment={() => navigate('/movie')} />
          </>
        }
        {doPayment &&
          <>
            <div className="fixed z-[1] inset-0 h-screen w-screen opacity-80 bg-jet-black" />
            <Modal
              title='Payment Info'
              type='payment'
              message={`Pay this payment bill before it is due, on ${nextFiveSeconds.format('MMMM Do YYYY, h:mm:ss a')}. If the bill has not been paid by the specified time, it will be forfeited.`}
              notify={notify}
              onPayment={handlePayment}
              total={`IDR ${(currentOrder.data.seat.length * 50000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
              button1={'Pay Later'}
              button2={'Check Payment'}
              close={handleClose}
            />
          </>
        }
        <div className="text-white flex flex-col items-center gap-3 max-w-xl w-full mb-12">
          <div className="flex items-center gap-3 w-full">
            <div className="mx-3 size-10 rounded-full bg-ash flex justify-center items-center text-jet-black"><FaCheck /></div>
            <div className="border border-dashed flex-1 h-0" />
            <div className="mx-3 size-10 rounded-full bg-ash flex justify-center items-center text-jet-black"><FaCheck /></div>
            <div className="border border-dashed flex-1 h-0" />
            <div className="mx-3 size-10 rounded-full border bg-sunburst flex justify-center items-center text-jet-black">3</div>
          </div>
          <div className="flex justify-between w-full">
            <div className="w-16 text-center">
              <span>Date & Time</span>
            </div>
            <span className="text-ash">Seat</span>
            <span className="text-sunburst">Payment</span>
          </div>
        </div>
        <div className='w-full bg-graphite p-12 rounded'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className='font-bold text-white'>Payment Info</h4>
            <div className='grid gap-3 *:grid py-6 *:**:last:text-white'>
              <div>
                <span>DATE & TIME</span>
                <span>{currentOrder.data.date} at {currentOrder.data.time}</span>
              </div>
              <div>
                <span>MOVIE TITLE</span>
                <span>{currentOrder.movie.title}</span>
              </div>
              <div>
                <span>CINEMA NAME</span>
                <span>{currentOrder.data.cinema}</span>
              </div>
              <div>
                <span>NUMBER OF TICKETS</span>
                <span>{currentOrder.data.seat.length} pieces</span>
              </div>
              <div>
                <span>TOTAL PAYMENT</span>
                <span>IDR {(currentOrder.data.seat.length * 50000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
              </div>
            </div>
            <h4 className='font-bold text-white'>Personal Information</h4>
            <div className='py-6 grid gap-3'>
              <Input
                id="fullname"
                type="text"
                name="fullname"
                title="Full Name"
                placeholder="Your full name"
                className="px-3 w-full outline-0 rounded"
              />
              <Input
                id="email"
                type="email"
                name="email"
                title="Email"
                placeholder="Type your email"
                className="px-3 w-full outline-0 rounded"
              />
              <Input
                id="phone"
                type="tel"
                name="email"
                title="Phone Number"
                placeholder="Type your phone number"
                className="px-3 w-full outline-0 rounded"
              />
            </div>
            <h4 className='font-bold'>Payment Method</h4>
            <div className='grid grid-cols-4 gap-3 py-6'>
              <InputHidden {...register('payment')} type='radio' name='payment' id='gpay' value='gpay'>
                <img src={logogpay} alt="logo-gpay" />
              </InputHidden>
              <InputHidden {...register('payment')} type='radio' name='payment' id='visa' value='visa'>
                <img src={logovisa} alt="logo-visa" />
              </InputHidden>
              <InputHidden {...register('payment')} type='radio' name='payment' id='gopay' value='gopay'>
                <img src={logogopay} alt="logo-gopay" />
              </InputHidden>
              <InputHidden {...register('payment')} type='radio' name='payment' id='paypal' value='paypal'>
                <img src={logopaypal} alt="logo-paypal" />
              </InputHidden>
              <InputHidden {...register('payment')} type='radio' name='payment' id='dana' value='dana'>
                <img src={logodana} alt="logo-dana" />
              </InputHidden>
              <InputHidden {...register('payment')} type='radio' name='payment' id='bca' value='bca'>
                <img src={logobca} alt="logo-bca" />
              </InputHidden>
              <InputHidden {...register('payment')} type='radio' name='payment' id='bri' value='bri'>
                <img src={logobri} alt="logo-bri" />
              </InputHidden>
              <InputHidden {...register('payment')} type='radio' name='payment' id='ovo' value='ovo'>
                <img src={logoovo} alt="logo-ovo" />
              </InputHidden>
            </div>
            <button type="submit"
              className='w-full bg-sunburst text-jet-black py-3 font-bold rounded hover:bg-marigold'>
              Pay your order
            </button>
            {errors.payment && <span className="text-ash" role="alert">* {errors.payment.message}</span>}

          </form>
        </div>
      </div>
    </section>
  )
}

export default PaymentPage