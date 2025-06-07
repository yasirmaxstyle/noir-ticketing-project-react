import { useSelector } from "react-redux"
import { Link, useParams } from "react-router"

import moment from "moment/moment";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ResultPage() {
  const dataOrder = useSelector(state => state.transaction.data)
  const { id } = useParams()
  const currentOrder = dataOrder.find(data => data.id === id)
  const bg = `https://image.tmdb.org/t/p/original/${currentOrder.movie.backdrop_path}`

  const handleDownload = () => {
    const content = document.getElementById('download-content')
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      pdf.addImage(imgData, 'PNG', 0, 0)
      pdf.save('ticket-movie.pdf')
    })
  }

  return (
    <div>
      <div className="flex flex-col md:h-screen w-screen justify-center items-center">
        <div>
          <img src={bg} alt="" className="absolute z-[-2] inset-0 size-full grayscale aspect-9/16 object-cover" />
          <div className="absolute z-[-1] size-full inset-0 bg-linear-to-t from-jet-black from-30% to-transparent to 100%" />
        </div>
        <div className="grid gap-6 px-6 py-30 bg-jet-black sm:bg-transparent">
          <div>
            <h2 className="text-white text-center">Thank you for purchasing</h2>
            <h2 className="text-white text-center">Enjoy your movie!</h2>
          </div>
          <ResultForDownload ids='download-content' />
          <div className="flex justify-center items-center gap-3">
            <button type="button"
              className="border-ash text-ash border rounded px-6 py-3"
              onClick={handleDownload}>
              DOWNLOAD
            </button>
            <Link to='/movie'
              className="bg-ash rounded px-6 py-3">DONE</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPage

function ResultForDownload({ids}) {
  const dataOrder = useSelector(state => state.transaction.data)
  const { id } = useParams()
  const currentOrder = dataOrder.find(data => data.id === id)
  return (
    <div className="flex flex-col items-center sm:flex-row gap-12 bg-platinum p-6 rounded print:block max-w-3xl" id={ids}>
      <div className="flex max-w-60 justify-center items-center border p-3 rounded">
        <div style={{ height: "auto", margin: "0 auto", width: "100%" }}>
          <QRCode
            size={200}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={currentOrder.movie.title}
            viewBox={`0 0 200 200`}
          />
        </div>
      </div>
      <div className="border border-dashed" />
      <div className="*:grid *:grid-cols-2 *:gap-12 *:**:grid grid gap-3">
        <div>
          <div>
            <span>Movie</span>
            <span>{currentOrder.movie.title}</span>
          </div>
          <div>
            <span>Category</span>
            <span>PG-13</span>
          </div>
        </div>
        <div>
          <div>
            <span>Date</span>
            <span>{moment(currentOrder.data.date).format('LL').toString()}</span>
          </div>
          <div>
            <span>Time</span>
            <span>{currentOrder.data.time}</span>
          </div>
        </div>
        <div>
          <div>
            <span>Count</span>
            <span>{currentOrder.data.seat.length} pcs</span>
          </div>
          <div>
            <span>Seats</span>
            <span>{currentOrder.data.seat.join(', ')}</span>
          </div>
        </div>
        <div className="font-bold border rounded p-3 flex items-center">
          <span>TOTAL</span>
          <span>IDR {(currentOrder.data.seat.length * 50000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span>
        </div>
      </div>
    </div>
  )
}