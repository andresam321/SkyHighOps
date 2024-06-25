import {useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { thunkGetAllAircrafts  } from '../../redux/aircraft'
// import { thunkGetAllAreasWithParkingSpots } from '../../redux/airport_area';
import { NavLink } from 'react-router-dom'
import "./AircraftList.css"

const AircraftList = () => {

const dispatch = useDispatch();
const [expandedAircraft, setExpandedAircraft] = useState(null);


const allAircraft = useSelector((state) => state.aircraftReducer)

const toggleAircraft = (id) => {
  setExpandedAircraft((prev) => (prev === id ? null : id));
};

// console.log("LINE10",allAircraft)

useEffect(() => {
  dispatch(thunkGetAllAircrafts())
},[dispatch])

// useEffect(() => {
//   dispatch(thunkGetAllAreasWithParkingSpots());
// }, [dispatch]);




  return (
    <div className="aircraft-list">
    <h1>Aircraft List</h1>
    {allAircraft?.allAircraft?.map((aircraft) => (
      <div className="aircraft-item" key={aircraft.id}>
        <div className="aircraft-summary">
          <div>
            <p><span className="label">Tail Number:</span> {aircraft.tail_number}</p>
            <p><span className="label">Fuel Type:</span> {aircraft.fuel_type}</p>
            <p><span className="label">Last Fueled:</span> {aircraft.last_time_fueled}</p>
          </div>
          <div className="aircraft-image">
            <img src={aircraft.plane_image} alt="Aircraft" />
          </div>
        </div>
        <button className="view-details-button">
          <NavLink to={`/aircraft/${aircraft.id}`} className="active">
            View Aircraft Details
          </NavLink>
        </button>
        <button onClick={() => toggleAircraft(aircraft.id)} className="toggle-info-button">
          {expandedAircraft === aircraft.id ? 'Hide Details' : 'Show Aircraft Info'}
        </button>
        {expandedAircraft === aircraft.id && (
          <div className="aircraft-details">
            <div>
              <p><span className="label">Manufacturer:</span> {aircraft.manufacturer}</p>
              <p><span className="label">Model:</span> {aircraft.model}</p>
              <p><span className="label">Operation Status:</span> {aircraft.operation_status}</p>
              <p><span className="label">Seating Capacity:</span> {aircraft.seating_capacity}</p>
              <p><span className="label">Max Takeoff Weight:</span> {aircraft.max_takeoff_weight}</p>
              <p><span className="label">Active Owners:</span> {aircraft.active_owners}</p>
              <p><span className="label">Notes:</span> {aircraft.notes}</p>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
);
};


export default AircraftList