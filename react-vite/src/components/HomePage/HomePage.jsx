import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { thunkGetAllParkingSpotsWithPlanes } from '../../redux/parking_spot';
import { thunkGetAllEmptyParkingSpots } from '../../redux/parking_spot';
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



console.log("Occupied spots:", loadSpotWithPlanes);
console.log("Empty spots:", loadEmptySpots);

return (
    <>
        <h2 className='h21-spot'>Occocupied Spots</h2>
    <div className="flex-container">
      {loadSpotWithPlanes?.map((eachVal, index) => (
        <div key={index} className="flex-item">
            <div className='plane-image-div'>
                {/* <h4>Parking Spot</h4> */}
                <img src={eachVal.aircraft.plane_image} alt="Plane" />
            </div>
                <div className='info-div'>
                    <p>Model: {eachVal.aircraft.model}</p>
                    <p>Tail Number: {eachVal.aircraft.tail_number}</p>
                    <p>Fuel Type: {eachVal.aircraft.fuel_type}</p>
                    <p>Parking Spot Number: {eachVal.parking_spot.spot_number}</p>
                    <p>Is Reserved: {eachVal.parking_spot.is_reserved}</p>
                    <p>Spot Size: {eachVal.parking_spot.spot_size}</p>
                </div>
        </div>
      ))}
    </div>
    <h2 className='h2-spot'>Empty Spots</h2>
        <div className="flex-container">
            {loadEmptySpots?.map((spot, index) => (
                <div key={index} className="flex-item">
                    <div className='info-div'>
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