function Input({ id, type, name, title, inputClassName, labelClassName, placeholder, isVertical = true }) {
  const inputProps = {
    type,
    id,
    name,
    className: inputClassName || "",
    placeholder,
  };
  const labelProps = {
    htmlFor: id,
    className: labelClassName || "",
  };

  return (
    <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} gap-2`}>
      <label {...labelProps}>{title}</label>
      <input {...inputProps} />
    </div>
  )
}

export default Input