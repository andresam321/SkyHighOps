import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetAllAircrafts, thunkAssignAircraftToParkingSpot } from '../../redux/aircraft';
import { useModal } from "../../context/Modal";
import "./Aircraft.css"

const AircraftAssignment = ({ spotId }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { closeModal } = useModal();

    const allAircraft = useSelector((state) => state.aircraftReducer?.allAircraft);


    console.log("allaircraft",allAircraft)
    
    const [selectedAircraft, setSelectedAircraft] = useState('');

    useEffect(() => {
        dispatch(thunkGetAllAircrafts());
    }, [dispatch]);

    const handleAssignAircraft = async (e) => {
        e.preventDefault();
        if (selectedAircraft) {
            try {
                const payload = {
                    aircraft_id: selectedAircraft,
                    parking_spot_id: spotId
                };
                const res = await dispatch(thunkAssignAircraftToParkingSpot(payload));
                if (!res) {
                    closeModal(); 
                } else {
                    console.log(res) 
                }
            } catch (error) {
                console.error(error); 
            }
        }
    };
    

    return (
        <div>
            <h3>Assign Aircraft to Parking Spot</h3>
            <form onSubmit={handleAssignAircraft}>
                <label htmlFor="aircraft">Aircraft:</label>
                <select
                    id="aircraft"
                    name="aircraft"
                    value={selectedAircraft}
                    onChange={(e) => setSelectedAircraft(e.target.value)}
                    required
                >
                    <option value="" disabled>Select an aircraft</option>
                    {allAircraft?.map(aircraft => (
                        <option key={aircraft.id} value={aircraft.id}>
                            {aircraft.model} - {aircraft.tail_number}
                        </option>
                    ))}
                </select>
                <button type="submit">Assign</button>
                <button onClick={() => closeModal()}>Cancel</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AircraftAssignment;