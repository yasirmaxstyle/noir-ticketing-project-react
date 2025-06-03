import { useSelector } from "react-redux"

function Seat({ idx, order, value, ...props }) {
  const history = useSelector(state => state.historyTransaction.data)
  const paidHistory = history.filter(e => e.data.payment.status === 'paid')
  const matchSeat = paidHistory.filter(e => {
    if (e.data.time === order.data.time
      && e.data.date === order.data.date
      && e.data.location === order.data.location
      && e.data.cinema === order.data.cinema
    ) return e
  })

  const chosenSeat = []

  matchSeat.forEach(e=> chosenSeat.push(...e.data.seat))
  console.log(chosenSeat)

  return (
    <label htmlFor={idx}
      className='bg-ash has-checked:bg-sunburst size-5 rounded has-disabled:bg-gray-500'>
      <input {...props}
        type="checkbox"
        id={idx}
        className='hidden'
        value={value}
      disabled={chosenSeat.includes(value)}
      />
    </label>
  )
}

export default Seat