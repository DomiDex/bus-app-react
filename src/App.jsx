import { useEffect, useState } from 'react';
const BusService = ({ busArrivalData }) => {
  if (!busArrivalData) {
    return <div>Loading...</div>; // Display a loading message
  }

  return (
    <ul>
      {busArrivalData.services.map((service) => {
        const arrival = service.next_bus_mins;
        const busNumber = service.bus_no;
        const result = arrival < 0 ? 'Arrived' : `${arrival} minutes`;
        return (
          <li key={busNumber}>
            Bus {busNumber} : {result}
          </li>
        );
      })}
    </ul>
  );
};

async function fetchBusArrival(id) {
  const response = await fetch(
    `https://sg-bus-arrivals-sigma-schoolsc1.replit.app/?id=${id}`
  );
  const data = await response.json();
  return data;
}

const App = () => {
  const [busstopId, setBusStopId] = useState('');
  const [busArrivalData, setBusArrivalData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (busstopId) {
      setBusArrivalData(true);
      fetchBusArrival(busstopId)
        .then((data) => setBusArrivalData(data))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
  }, [busstopId]);

  function handleInputChange(event) {
    setBusStopId(event.target.value);
  }
  return (
    <div>
      <h1>Bus Arrival</h1>
      <input
        type='text'
        value={busstopId}
        onChange={handleInputChange}
        placeholder='Enter the bus id'
      />
      {loading && <p>loading ...</p>}
      {busArrivalData && busArrivalData.services && (
        <>
          <h2> bus stop {busArrivalData.bus_Stop_id}</h2>
          <BusService busArrivalData={busArrivalData} />
        </>
      )}
    </div>
  );
};

export default App;
