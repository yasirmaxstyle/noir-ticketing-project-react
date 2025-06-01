import fallback from "../assets/fallback-image.jpg"

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