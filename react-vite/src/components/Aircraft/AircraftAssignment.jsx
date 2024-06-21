import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllAircrafts, thunkAssignAircraftToParkingSpot,} from '../../redux/aircraft';
import { thunkGetAssignParkingSpotsWithSpecificArea, thunkGetParkingSpotsByArea } from '../../redux/parking_spot';

import { useModal } from "../../context/Modal";
import "./Assignment.css";

const AircraftAssignment = ({ spotId, areaId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const allAircraft = useSelector((state) => state.aircraftReducer?.allAircraft || []);
    const parkingSpots = useSelector((state) => state.parkingSpotReducer[spotId] || []);

    const [selectedAircraft, setSelectedAircraft] = useState('');


    useEffect(() => {
        dispatch(thunkGetAllAircrafts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(thunkGetParkingSpotsByArea(spotId));
    }, [dispatch, spotId]);


    // const handleAssignAircraft = async (e) => {
    //     e.preventDefault();
    //     if (selectedAircraft) {
    //         try {
    //             const payload = {
    //                 aircraft_id: selectedAircraft.value,
    //                 parking_spot_id: spotId
    //             };
    //             const res = await dispatch(thunkAssignAircraftToParkingSpot(payload));
    //                 // dispatch(thunkGetParkingSpotsByArea(spotId));
    //             if (!res) {
    //                 dispatch(thunkGetParkingSpotsByArea(spotId));
    //                 closeModal();
    //             } else {
    //                 console.log(res);
    //             }
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // };

    const handleAssignAircraft = async () => {
        alert("Feature Currently being debugged")
    }

    

    const aircraftOptions = allAircraft.map(aircraft => ({
        value: aircraft.id,
        label: `${aircraft.model} - ${aircraft.tail_number}`
    }));



    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '300px',
            minWidth: '300px',
        }),
    };

    return (
        <div className="assignment-container">
            <h3>Assign Aircraft to Parking Spot</h3>
            <form onSubmit={handleAssignAircraft}>
                <label htmlFor="aircraft">Aircraft:</label>
                <Select
                    id="aircraft"
                    name="aircraft"
                    options={aircraftOptions}
                    value={aircraftOptions.find(option => option.value === selectedAircraft)}
                    onChange={(option) => setSelectedAircraft(option)}
                    placeholder="Select or Search an aircraft..."
                    styles={customStyles}
                />
                <button type="submit">Assign</button>
                <button type="button" onClick={() => closeModal()}>Cancel</button>
            </form>
        </div>
    );
};

export default AircraftAssignment;