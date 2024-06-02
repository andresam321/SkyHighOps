import { useState } from 'react';
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
    const [errors, setErrors] = useState({});

    if (!currentUser) {
        return <div>Please log in to create a parking spot.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        // formData.append('user_id', currentUser.id);
        formData.append('spot_number', spot_number);
        formData.append('spot_size', spot_size);
        formData.append('is_reserved', is_reserved ? 'Yes' : 'No');

        const res = await dispatch(thunkCreateParkingSpot(formData));
        if (res.ok) {
            navigate('/');
        } else {
            setErrors(res.errors);
        }
    };

    return (
        <div className="create-parking-spot">
            <h2>Create a New Parking Spot</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="spot_number">Spot Number</label>
                    <input
                        type="text"
                        id="spot_number"
                        value={spot_number}
                        onChange={(e) => setSpotNumber(e.target.value)}
                    />
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
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </div>
    );
};

export default CreateParkingSpot;