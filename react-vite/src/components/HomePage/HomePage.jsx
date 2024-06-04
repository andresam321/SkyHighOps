import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { thunkGetAllParkingSpotsWithPlanes } from '../../redux/parking_spot';
import { thunkGetAllEmptyParkingSpots } from '../../redux/parking_spot';
// import { thunkRemoveAircraftFromParkingSpot } from '../../redux/parking_spot';
// import { thunkAssignAircraftToParkingSpot } from '../../redux/parking_spot';
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import ParkingSpotAssignment from '../ParkingSpot/ParkingSpotAssignment';
import AircraftAssignment from '../Aircraft/AircraftAssignment'
import "./HomePage.css"

const HomePage = () => {

const dispatch = useDispatch();

const loadSpotWithPlanes = useSelector((state) => state.parkingSpotReducer.planeWithSpots)

const loadEmptySpots = useSelector((state) => state.parkingSpotReducer?.emptySpots)
// console.log(loadSpotWithPlanes)
console.log("Empty spots: line 14", loadEmptySpots);

// loadSpotWithPlanes = Object.values(loadSpotWithPlanes)

useEffect(() => {
    dispatch(thunkGetAllParkingSpotsWithPlanes());
    dispatch(thunkGetAllEmptyParkingSpots())
}, [dispatch]);


// const handleRemovePlane = (spotId, planeId) => {
//   dispatch(thunkRemoveAircraftFromParkingSpot(spotId, planeId));
// };

// const handleAssignPlane = (spotId, planeId) => {
//   dispatch(thunkAssignAircraftToParkingSpot(spotId, planeId));
// };

// console.log("Occupied spots:", loadSpotWithPlanes);
console.log("Empty spots:", loadEmptySpots);


return (
  <>
  <h2 className='h2-spot'>Parking Spots</h2>
  <div className="parking-spot-container">
    {loadSpotWithPlanes?.map((eachVal, index) => (
      <div key={index} className="flex-item occupied">
        <div className='plane-image-div'>
          <img src={eachVal.aircraft.plane_image} alt="Plane" />
        </div>
        <div className='info-div'>
          <h3>Aircraft Info</h3>
          <div className="aircraft-link">
            <NavLink to={`/aircraft/${eachVal.aircraft.id}`}>
              <p>Model: {eachVal.aircraft.model}</p>
              <p>Tail Number: {eachVal.aircraft.tail_number}</p>
              <p>Fuel Type: {eachVal.aircraft.fuel_type}</p>
            </NavLink>
          </div>
        </div>
        <div className='info-div'>
          <h3>Parking Spot Info</h3>
          <p>Spot Number: {eachVal.parking_spot.spot_number}</p>
          <p>Is Reserved: {eachVal.parking_spot.is_reserved}</p>
          <p>Spot Size: {eachVal.parking_spot.spot_size}</p>
        </div>
      </div>
    ))}
    {loadEmptySpots?.map((spot, index) => (
      <div key={index} className="flex-item empty">
        <div className='info-div'>
          <h3>Parking Spot Info</h3>
          <p>Spot Number: {spot.spot_number}</p>
          <p>Spot Size: {spot.spot_size}</p>
          <p>Is Reserved: {spot.is_reserved}</p>
        </div>
      </div>
    ))}
  </div>
</>
);
};



export default HomePage