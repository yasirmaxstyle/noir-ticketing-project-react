import fallback from "../assets/fallback-image.svg"

function ImageWithFallback({ ...props}) {
  return (
    <>
      <img
        {...props}
        onError={(e) => (e.currentTarget.src = fallback)}
      />
    </>
  )
}

export default ImageWithFallback