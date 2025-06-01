function InputHidden({ children, id, ...props }) {
  return (
    <label htmlFor={id} className="flex flex-col items-center bg-ash grayscale rounded py-3 has-checked:bg-sunburst has-checked:grayscale-0">
      <div>{children}</div>
      <input {...props} id={id} className="hidden" />
    </label>
  )
}

export default InputHidden