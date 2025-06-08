import { useEffect, useState } from "react";

import HeaderAdmin from "./HeaderAdmin";
import { Outlet } from "react-router";

function LayoutAdmin() {
  const [transBg, setTransBg] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setTransBg(window.pageYOffset > 10)
      );
    }
  }, [])
  return (
    <div className='flex flex-col'>
      <HeaderAdmin className={`bg-${transBg && "jet-black"}`} />
      <Outlet className='grow' />
    </div>
  )
}

export default LayoutAdmin