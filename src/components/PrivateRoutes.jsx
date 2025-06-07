import { useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router"

function PrivateRoutes({ redirectPath, isAllowed }) {
  if (!isAllowed) {
    const navigate = useNavigate()
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        navigate(redirectPath, { replace: true })
      }, 3000)

      return () => clearTimeout(timeoutId)
    }, [navigate])
    return (
      // <Navigate to={redirectPath} replace />
      <div className="w-screen h-screen bg-jet-black flex justify-center items-center">
        <div className="relative flex justify-center items-center gap-3 text-white">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Redirecting...</span>
          </div>
          <span>Redirecting...</span>
        </div>
      </div>
    )
  } else {
    return <Outlet />
  }
}

export default PrivateRoutes