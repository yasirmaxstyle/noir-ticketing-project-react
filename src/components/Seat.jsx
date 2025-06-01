function Seat({ idx, ...props }) {
  return (
    <label htmlFor={idx} className='bg-ash has-checked:bg-sunburst size-5 rounded'>
      <input {...props} type="checkbox" id={idx} className='hidden' />
    </label>
  )
}

export default Seat