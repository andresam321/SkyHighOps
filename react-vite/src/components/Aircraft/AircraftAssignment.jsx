import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { thunkGetAllAircrafts, thunkAssignAircraftToParkingSpot } from '../../redux/aircraft';
import { useModal } from "../../context/Modal";
import "./Assignment.css"

const AircraftAssignment = ({ spotId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const allAircraft = useSelector((state) => state.aircraftReducer?.allAircraft);


    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAircraft, setFilteredAircraft] = useState([]);

    const [selectedAircraft, setSelectedAircraft] = useState('');

    useEffect(() => {
        dispatch(thunkGetAllAircrafts());
    }, [dispatch]);


    useEffect(() => {
        console.log('All Aircraft:', allAircraft);
        setFilteredAircraft(allAircraft);  // Initialize with all aircraft when data is loaded
    }, [allAircraft]);

    const handleAssignAircraft = async (e) => {
        e.preventDefault();
        if (selectedAircraft) {
            try {
                const payload = {
                    aircraft_id: selectedAircraft,
                    parking_spot_id: spotId
                };
                const res = await dispatch(thunkAssignAircraftToParkingSpot(payload));
                await dispatch(thunkGetAllAircrafts())
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

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        console.log('Search Term:', term);
        
        if (term === '') {
            setFilteredAircraft(allAircraft);
        } else {
            const filtered = allAircraft.filter(aircraft =>
                aircraft.model.toLowerCase().includes(term.toLowerCase()) ||
                aircraft.tail_number.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredAircraft(filtered);
            console.log('Filtered Aircraft:', filtered);
        }
    };


    return (
        <div className="assignment-container">
            <h3>Assign Aircraft to Parking Spot</h3>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search Aircraft..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <p>Feature Coming Soon</p>
            </div>
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
                <button type="button" onClick={() => closeModal()}>Cancel</button>
            </form>
        </div>
    );
};
export default AircraftAssignment;