import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllAreasWithParkingSpots } from '../../redux/airport_area';
import { NavLink } from 'react-router-dom';

const AirportAreas = () => {
    const dispatch = useDispatch();
    const loadAreasWithSpots = useSelector(state => state.airportAreasReducer.areasWithSpots);

    console.log("line10", loadAreasWithSpots)
    useEffect(() => {
        dispatch(thunkGetAllAreasWithParkingSpots());
    }, [dispatch]);

    return (
    <>
        <div>
            <div className='airport-areas'>
                {loadAreasWithSpots?.airport?.map((area,index) => (
                    <div key={area.id} > 
                        <NavLink to={`/area/parking_spot/${area.id}`}>
                            {/* <h3>{area.airport.parking_name}</h3> */}
                        <div>
                        <h3>{area.parking_name}</h3>
                        </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
};

export default AirportAreas;