import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkAssignAircraftToParkingSpot, thunkGetAllEmptyParkingSpots } from '../../redux/parking_spot';
import { useModal } from "../../context/Modal";

const ParkingSpotAssignment = ({ spotId }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { closeModal } = useModal();
    const emptyParkingSpots = useSelector(state => state.parkingSpotReducer.emptySpots || []);
    const [selectedParkingSpot, setSelectedParkingSpot] = useState(spotId || '');

    useEffect(() => {
        dispatch(thunkGetAllEmptyParkingSpots());
    }, [dispatch]);

    const handleAssign = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await dispatch(thunkAssignAircraftToParkingSpot(selectedParkingSpot));
            setLoading(false);
            closeModal();
        } catch (err) {
            setLoading(false);
            setError('Failed to assign aircraft to parking spot.');
        }
    };

    return (
        <div>
            <h3>Assign Aircraft to Parking Spot</h3>
            <form onSubmit={handleAssign}>
                <label htmlFor="parkingSpot">Parking Spot:</label>
                <select
                    id="parkingSpot"
                    name="parkingSpot"
                    value={selectedParkingSpot}
                    onChange={(e) => setSelectedParkingSpot(e.target.value)}
                    required
                >
                    <option value="" disabled>Select a parking spot</option>
                    {emptyParkingSpots.map(spot => (
                        <option key={spot.id} value={spot.id}>
                            {spot.spot_number}
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? 'Assigning...' : 'Assign'}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default ParkingSpotAssignment;