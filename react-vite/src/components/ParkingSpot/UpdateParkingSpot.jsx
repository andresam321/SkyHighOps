import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { thunkUpdateParkingSpot } from '../../redux/parking_spot';
import { useModal } from '../../context/Modal';


const UpdateParkingSpot = () => {
    const {parking_spotId} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()

    const currentUser = useSelector((state) => state.session.user);
    const parkingSpotById = useSelector((state) => state.parkingSpotReducer[+parking_spotId])
    console.log(parkingSpotById)

    const [spot_number, setSpotNumber] = useState(parkingSpotById || '');
    const [spot_size, setSpotSize] = useState(parkingSpotById || 'Small');
    const [is_reserved, setIsReserved] = useState(parkingSpotById || '');
    const [errors, setErrors] = useState({});


    useEffect(()=> {
        if(parkingSpotById) {
            setSpotNumber(parkingSpotById.spot_number || "")
            setSpotSize(parkingSpotById.spot_size || "")
            setIsReserved(parkingSpotById.is_reserved || "")
        }
    }, [parkingSpotById])



    useEffect(() => {
        const errObj = {}
        
        if(spot_number.length < 2 || spot_number > 5) errObj.spot_number = "Parking spot must be between two and five characters"
        if(!spot_size) errObj.spot_size = "Please provide a valid parking spot size "
        if(!is_reserved) errObj.is_reserved = "Defaults to no"

        setErrors(errObj)
    },[spot_number,spot_size,is_reserved])

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('spot_number', spot_number);
        formData.append('spot_size', spot_size);
        formData.append('is_reserved', is_reserved);
        
        try {
            
            const res = await dispatch(thunkUpdateParkingSpot(formData,parking_spotId));
            console.log("line33",res)
            closeModal()
        } catch (error) {
            console.error("Error creating parking spot:", error);
            
        }
    }
    
    if (!currentUser) {
        return <div>Please log in to create a parking spot.</div>;
    }
    
    return (
        <div className="create-parking-spot">
            <h2>Updating Parking Spot</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="spot_number">Spot Number</label>
                    <input
                        type="text"
                        id="spot_number"
                        value={spot_number}
                        onChange={(e) => setSpotNumber(e.target.value)}
                    />
                {errors.spot_number && <p className=''>{errors.spot_number}</p>}
                </div>
                <div>
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
                <div>
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
                <div className="delete-spot-buttons">
                    <button type="submit" className="">Yes (Update Parking Spot)</button>
                    <button onClick={() => closeModal()} className="">No (Do no Update)</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateParkingSpot