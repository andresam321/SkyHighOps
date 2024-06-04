import {useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { thunkGetAllAircrafts  } from '../../redux/aircraft'
import "./Aircraft.css"

const AircraftList = () => {

const dispatch = useDispatch();
const [expandedAircraft, setExpandedAircraft] = useState(null);


const allAircraft = useSelector((state) => state.aircraftReducer)

const toggleAircraft = (id) => {
  setExpandedAircraft((prev) => (prev === id ? null : id));
};

console.log("LINE10",allAircraft)

useEffect(() => {
  dispatch(thunkGetAllAircrafts())
},[dispatch])



  return (
    <div className="aircraft-list">
      <h1>Aircraft List</h1>
    {allAircraft?.allAircraft?.map((aircraft) => (
      <div className="aircraft-item" key={aircraft.id}>
        <div className="aircraft-summary">
          <div className=''>
            <p>Tail Number: {aircraft.tail_number}</p>
          </div>
          <div className=''>
            <p>Fuel Type: {aircraft.fuel_type}</p>
          </div>
          <div className=''>
            <p>Last Time Fueled By Technician: {aircraft.last_time_fueled}</p>
          </div>
          <div className="aircraft-image">
              <img src={aircraft.plane_image} alt="Aircraft" />
          </div>
        </div>
        {expandedAircraft === aircraft.id && (
          <div className="aircraft-details">
            <div className=''>
              <p>Manufacturer: {aircraft.manufacturer}</p>
              <p>Model: {aircraft.model}</p>
              <p>Operation Status: {aircraft.operation_status}</p>
            </div>
            <div className=''>
              <p>Seating Capacity: {aircraft.seating_capacity}</p>
              <p>Max Takeoff Weight: {aircraft.max_takeoff_weight}</p>
              <p>Active Owners: {aircraft.active_owners}</p>
              <p>Notes: {aircraft.notes}</p>
            </div>
          </div>
        )}
        <button onClick={() => toggleAircraft(aircraft.id)}>
          {expandedAircraft === aircraft.id ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    ))}
  </div>
);
};


export default AircraftList