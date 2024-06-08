import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllParkingSpotsWithPlanes, } from '../../redux/parking_spot';
import { thunkUnAssignAircraftFromParkingSpot } from '../../redux/aircraft';
import { NavLink } from 'react-router-dom';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AircraftAssignment from '../Aircraft/AircraftAssignment';
import "./HomePage.css";

const HomePage = () => {
    const dispatch = useDispatch();
    const loadSpotWithPlanesAndWithout = useSelector((state) => state.parkingSpotReducer.planeWithSpots);


    useEffect(() => {
        dispatch(thunkGetAllParkingSpotsWithPlanes());
    }, [dispatch]);

    const handleRemoveAircraft =  (spotId) => {
      dispatch(thunkUnAssignAircraftFromParkingSpot(spotId));
  };

// const handleRemoveAircraft =  () => {
//     alert("Feature in progress, working on debuggin!")
// };

  // console.log(handleRemoveAircraft())

return (
<>
  <h2 className='h2-spot'>Parking Spots</h2>
  <div className="parking-spot-container">
    {loadSpotWithPlanesAndWithout?.map((eachVal, index) => (
      <div key={index} className={`flex-item ${eachVal.aircraft ? 'occupied' : 'empty'}`}>
        {eachVal.aircraft && (
          <>
            <div className='info-div'>
              <h3>Aircraft Info</h3>
              <div className="aircraft-link">
                <NavLink to={`/aircraft/${eachVal.aircraft.id}`} className="aircraft-info">
                <div className='plane-image-div'>
                    <img src={eachVal.aircraft.plane_image} alt="Plane" />
                </div>
                  <p>Model: {eachVal.aircraft.model}</p>
                  <p>Tail Number: {eachVal.aircraft.tail_number}</p>
                  <p>Fuel Type: {eachVal.aircraft.fuel_type}</p>
                </NavLink>
              </div>
            </div>
            <button className="remove-button" onClick={() => handleRemoveAircraft(eachVal.aircraft.id)}>Remove from Parking</button>
          </>
        )}
        <div className='info-div'>
          <h3>Parking Spot Info</h3>
          <NavLink to={`/parking_spot/${eachVal.id}`} className="">
            <p>Spot Number: {eachVal.spot_number}</p>
            <p>Is Reserved: {eachVal.is_reserved}</p>
            <p>Spot Size: {eachVal.spot_size}</p>
          </NavLink>
        </div>
      <div className='assign-button'>
        {!eachVal.aircraft && (
          <OpenModalButton
            buttonText="Assign Aircraft"
            className="assign-aircraft"
            modalComponent={<AircraftAssignment spotId={eachVal.id} />}
          />
        )}
      </div>
      </div>
    ))}
  </div>
</>
);
};


export default HomePage;