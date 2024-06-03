import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAircrafts } from '../../redux/aircraft';
import { thunkAssignAircraftToParkingSpot } from '../../redux/parking_spot';
import { useModal } from "../../context/Modal";

const AircraftAssignment = ({ spotId }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { closeModal } = useModal();

    let allAircraft = useSelector(state => state.aircraftReducer.allAircraft);
    const [selectedAircraft, setSelectedAircraft] = useState('');

    allAircraft = Object.values(allAircraft)
    console.log('allaircraft', allAircraft)

    useEffect(() => {
        dispatch(thunkGetAllAircrafts());
    }, [dispatch]);

    const handleAssign = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await dispatch(thunkAssignAircraftToParkingSpot(spotId, selectedAircraft));
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
                <label htmlFor="aircraft">Aircraft:</label>
                <select
                    id="aircraft"
                    name="aircraft"
                    value={selectedAircraft}
                    onChange={(e) => setSelectedAircraft(e.target.value)}
                    required
                >
                    <option value="" disabled>Select an aircraft</option>
                    {allAircraft.map(aircraft => (
                        <option key={aircraft.id} value={aircraft.id}>
                            {aircraft.model} - {aircraft.tail_number}
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

export default AircraftAssignment;