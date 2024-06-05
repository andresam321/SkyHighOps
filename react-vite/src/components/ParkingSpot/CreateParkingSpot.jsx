import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkCreateParkingSpot } from '../../redux/parking_spot';

const CreateParkingSpot = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector((state) => state.session.user);

    const [spot_number, setSpotNumber] = useState('');
    const [spot_size, setSpotSize] = useState('Small');
    const [is_reserved, setIsReserved] = useState('No');
    const [spotNumberExists, setSpotNumberExists] = useState(false);
    const [errors, setErrors] = useState({});



    useEffect(() => {
        const errObj = {}
        
        if(spot_number.length < 2 || spot_number > 5) errObj.spot_number = "Parking spot must be between two and five characters"
        if(!spot_size) errObj.spot_size = "Please provide a valid parking spot size "
        if(!is_reserved) errObj.is_reserved = "Defaults to no "
        if(spotNumberExists) errObj.spot_number = "Spot number already exists";


        setErrors(errObj)
    },[spot_number,spot_size,is_reserved])

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const spotExists = await checkSpotNumberExists(spot_number);
        if (spotExists) {
            setErrors({ ...errors, spot_number: "Parking spot number already exists" });
        }
        const formData = new FormData();
        formData.append('spot_number', spot_number);
        formData.append('spot_size', spot_size);
        formData.append('is_reserved', is_reserved);
        
        try {
            
            const res = await dispatch(thunkCreateParkingSpot(formData));
            console.log("line33",res)
            navigate('/');
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
                <div className=''>
                    <label htmlFor="spot_number">Spot Number</label>
                    <input
                        type="text"
                        id="spot_number"
                        value={spot_number}
                        onChange={(e) => setSpotNumber(e.target.value)}
                    />
                {errors.spot_number && <p className=''>{errors.spot_number}</p>}
                </div>
                <div className=''>
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
                {errors.spot_size && <p className=''>{errors.spot_size}</p>}
                </div>
                <div className=''>
                    <label htmlFor="is_reserved">Is Reserved</label>
                    <select
                        id="is_reserved"
                        value={is_reserved}
                        onChange={(e) => setIsReserved(e.target.value)}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                {errors.is_reserved && <p className=''>{errors.is_reserved}</p>}
                </div>
                <button disabled={Object.values(errors).length > 0} className='login-btn-main' type="submit">Create Spot</button>
            </form>
        </div>
    );
};

export default CreateParkingSpot;