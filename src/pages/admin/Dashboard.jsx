import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Dashboard() {
  const history = useSelector(state => state.historyTransaction.data)
  const paidTransactions = history.filter(e => e.data.payment.status === 'paid')

  const sorted = paidTransactions.map(e => {
    return {
      name: e.movie.title,
      date: e.data.payment.createdAt.split(' ').slice(0, 2),
      location: e.data.location
    }
  })

  const day = [];
  const loc = [];

  sorted.forEach((e) => {
    if (day.length > 0 &&
      day[day.length].name === e.name &&
      day[day.length].date === e.date) {
      day[day.length].count = day[day.length].count + 1
    }
    if (loc.length > 0 &&
      loc[loc.length].name === e.name &&
      loc[loc.length].location === e.location) {
      loc[loc.length].count = loc[loc.length].count + 1
    }
    else {
      day.push({
        name: e.name,
        date: e.date,
        count: 1
      })
      loc.push({
        name: e.name,
        location: e.location,
        count: 1
      })
    }
  });

  const handleChartByDay = (data) => {
    console.log(data)
  }
  const handleChartByLocation = (data) => {
    console.log(data)
  }

  return (
    <div className='pt-20 min-h-screen w-screen flex justify-center items-center bg-jet-black'>
      <div className='grid gap-6 max-w-[1080px] w-full text-ash'>
        <div className='w-full h-screen p-3 grid gap-3 bg-graphite rounded'>
          <div>
            <h2>Sales Chart</h2>
            <form onSubmit={handleChartByDay}
              className='*:border *:rounded flex gap-3 *:py-3 *:px-5'>
              <select name="movieName" id="movieName">
                {sorted.map((e, idx) =>
                  <option key={`movie-list-${idx}`} value={e.name}>{e.name}</option>
                )}
              </select>
              <select name="movieName" id="movieName">
                <option value='weekly'>Weekly</option>
                <option value='monthly'>Monthly</option>
              </select>
              <button
                className='bg-ash text-jet-black'>Filter</button>
            </form>
          </div>
          <div className='min-w-[1080px] overflow-x-scroll'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className='h-screen w-full p-3 grid gap-3 bg-graphite rounded'>
          <div>
            <h2>Ticket Sales</h2>
            <form onSubmit={handleChartByDay}
              className='*:border *:rounded flex gap-3 *:py-3 *:px-5'>
              <select name="movieName" id="movieName">
                {sorted.map((e, idx) =>
                  <option key={`movie-list-${idx}`} value={e.name}>{e.name}</option>
                )}
              </select>
              <select name="movieName" id="movieName">
                {sorted.map((e, idx) =>
                  <option key={`location-list-${idx}`} value={e.location}>{e.location}</option>
                )}
              </select>
              <button
                className='bg-ash text-jet-black'>Filter</button>
            </form>
          </div>
          <div className='min-w-[1080px] overflow-x-scroll'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard