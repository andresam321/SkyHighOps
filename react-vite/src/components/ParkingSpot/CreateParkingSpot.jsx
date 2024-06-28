import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { thunkCreateParkingSpot } from '../../redux/parking_spot';
import { thunkCheckSpotExists } from '../../redux/parking_spot';
import './CreateParking.css'

const CreateParkingSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.session.user);
    // const {id} = useParams
    const [spot_number, setSpotNumber] = useState('');
    const [spot_size, setSpotSize] = useState('Small');
    const [is_reserved, setIsReserved] = useState('No');
    const [airport_parking_id, setAirport_parking_id] = useState("")
    const [spotNumberExists, setSpotNumberExists] = useState(false);
    const [errors, setErrors] = useState({});

    // const checkSpotExists = (spotNumber) => {
    //     return existingParkingSpots.some(spot => spot.spot_number === spotNumber);
    // };

    
    const getPrefix = (parking_area_id) => {
        const prefixes = {
            '1': 'N',  // North
            '2': 'E',  // East
            '3': 'W',  // West
            '4': 'S'   // South
        };
        return prefixes[parking_area_id] || '';
    };

    useEffect(() => {
        const validateSpot = async () => {
            const prefix = getPrefix(airport_parking_id);

            const errObj = {};
            if (!spot_number.startsWith(prefix)) {
                errObj.spot_number = `Parking spot number must start with '${prefix}' for the selected parking area`;
            } else if (!/^[a-zA-Z]\d*$/.test(spot_number)) {
                errObj.spot_number = "Parking spot must start with a letter followed by digits (parking spot number unique, no duplicates)";
            } else if (spot_number.length < 2 || spot_number.length > 5) {
                errObj.spot_number = "Parking spot must be between two and five characters";
            }

            if (!airport_parking_id) errObj.airport_parking_id = "Please provide a valid parking area";
            if (!spot_size) errObj.spot_size = "Please provide a valid parking spot size";
            if (!is_reserved) errObj.is_reserved = "Defaults to no";

            if (Object.keys(errObj).length === 0) {
                const exists = await dispatch(thunkCheckSpotExists(spot_number, airport_parking_id));
                if (exists) {
                    errObj.spot_number = "Parking spot number already exists";
                }
            }

            setErrors(errObj);
        };

        validateSpot();
    }, [spot_number, airport_parking_id, spot_size, is_reserved, dispatch]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const spotExists = checkSpotExists(spot_number);
        // if (spotExists) {
        //     setErrors({ spot_number: "Parking spot number already exists" });
        //     return;
        // }   
        const formData = new FormData();
        formData.append('airport_parking_id', airport_parking_id)
        formData.append('spot_number', spot_number);
        formData.append('spot_size', spot_size);
        formData.append('is_reserved', is_reserved);
        
        try {
            
            const res = await dispatch(thunkCreateParkingSpot(formData));
            console.log("line33",res)
            navigate(`/area/parking_spot/${airport_parking_id}`);
        } catch (error) {
            console.error("Error creating parking spot:", error);
            
        }
    }

    
    if (!currentUser) {
        return <div>Please log in to create a parking spot.</div>;
    }
    
    return (
        <div className="create-parking-spot">
            <h2>Create a New Parking Spot</h2>
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                    <label htmlFor="spot_size">Parking Location</label>
                    <select
                        id=""
                        value={airport_parking_id}
                        onChange={(e) => setAirport_parking_id(e.target.value)}
                    >
                        <option value="">Other</option>
                        <option value="1">North Parking</option>
                        <option value="2">East Parking</option>
                        <option value="3">West Parking</option>
                        <option value="4">South Parking</option>
                    </select>
                    {errors.airport_parking_id && <p className='error'>{errors.airport_parking_id}</p>}
                </div>
                <div className='form-group'>
                    <label htmlFor="spot_number">Spot Number</label>
                    <input
                        type="text"
                        id="spot_number"
                        value={spot_number}
                        onChange={(e) => setSpotNumber(e.target.value.toUpperCase())}
                    />
                    {errors.spot_number && <p className='error'>{errors.spot_number}</p>}
                </div>
                <div className='form-group'>
                    <label htmlFor="spot_size">Spot Size</label>
                    <select
                        id="spot_size"
                        value={spot_size}
                        onChange={(e) => setSpotSize(e.target.value)}
                    >
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                    {errors.spot_size && <p className='error'>{errors.spot_size}</p>}
                </div>
                <div className='form-group'>
                    <label htmlFor="is_reserved">Is Reserved</label>
                    <select
                        id="is_reserved"
                        value={is_reserved}
                        onChange={(e) => setIsReserved(e.target.value)}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {errors.is_reserved && <p className='error'>{errors.is_reserved}</p>}
                </div>
                <button disabled={Object.values(errors).length > 0} className='btn-main' type="submit">Create Spot</button>
            </form>
        </div>
    );
};

export default CreateParkingSpot;