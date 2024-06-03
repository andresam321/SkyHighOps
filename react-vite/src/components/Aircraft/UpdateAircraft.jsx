import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { thunkAddAircraft } from '../../redux/aircraft';
import { useModal } from '../../context/Modal';


const UpdateAircraft = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {aircraftId} = useParams()
    const { closeModal } = useModal()


    const currentUser = useSelector((state) => state.session.user);
    const aircraftById = useSelector((state) => state.aircraftReducer[+aircraftId])
    console.log(aircraftById)
    
    const [plane_image, setPlane_image] = useState();
    const [tail_number, setTail_number] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState('');
    const [max_takeoff_weight, setMax_takeoff_weight] = useState("");
    const [seating_capacity, setSeating_capacity] = useState('');
    const [operation_status, setOperation_status] = useState("");
    const [fuel_type, setFuel_type] = useState("");
    const [active_owners, setActive_owners] = useState("");
    const [notes, setNotes] = useState("");
    const [last_time_fueled, setLast_time_fueled] = useState("");
    const [errors, setErrors] = useState({});
    const [showImage, setShowImage] = useState();


    useEffect(() => {
        if (aircraftById) {
            setShowImage(aircraftById.plane_image || "")
            setTail_number(aircraftById.tail_number || "")
            setManufacturer(aircraftById.manufacturer || "")
            setModel(aircraftById.model || "")
            setMax_takeoff_weight(aircraftById.max_takeoff_weight || "")
            setSeating_capacity(aircraftById.seating_capacity || "")
            setOperation_status(aircraftById.operation_status || "")
            setFuel_type(aircraftById.fuel_type || "")
            setActive_owners(aircraftById.active_owners || "")
            setNotes(aircraftById.notes || "")
            setLast_time_fueled(aircraftById.last_time_fueled || "")
            
        }
    }, [aircraftById])


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPlane_image(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setShowImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('plane_image', plane_image);
        formData.append('tail_number', tail_number);
        formData.append('manufacturer', manufacturer);
        formData.append('model', model);
        formData.append('max_takeoff_weight', max_takeoff_weight);
        formData.append('seating_capacity', seating_capacity);
        formData.append('operation_status', operation_status);
        formData.append('fuel_type', fuel_type);
        formData.append('active_owners', active_owners);
        formData.append('notes', notes);

        const formattedLastTimeFueled = new Date(last_time_fueled).toISOString().split('T')[0]; // Ensures date is in YYYY-MM-DD format
        console.log("Formatted last_time_fueled:", formattedLastTimeFueled);

        formData.append('last_time_fueled', formattedLastTimeFueled);

        try {
            const newAircraft = await dispatch(thunkAddAircraft(formData, aircraftId));

            // if (newAircraft && newAircraft) {
            //     const { id } = newAircraft;
            console.log("line33",newAircraft)
            closeModal()
            // } else {
            //     throw new Error("Failed to get aircraft ID from the response");
            // }
        } catch (err) {
            console.error("Failed to add aircraft:", err);
            setErrors({ general: "An unexpected error occurred. Please try again later." });
        }
    };

    useEffect(() => {
        const errorObj = {};
        // if (!plane_image) errorObj.plane_image = "Image required";
        if (tail_number.length < 3 || tail_number.length > 6) errorObj.tail_number = "Please provide a tail number between 3 and 6 characters";
        if (manufacturer.length < 2 || manufacturer.length > 12) errorObj.manufacturer = "Please provide a valid manufacturer";
        if (model.length < 2 || model.length > 10) errorObj.model = "Please provide a model between 2 and 10 characters";
        if (max_takeoff_weight.length < 3 || max_takeoff_weight.length > 10) errorObj.max_takeoff_weight = "Please provide a valid takeoff weight";
        if (seating_capacity.length < 1 || seating_capacity.length > 2) errorObj.seating_capacity = "Please provide a valid seating amount";
        if (!operation_status) errorObj.operation_status = "Operation status required";
        if (!fuel_type) errorObj.fuel_type = "Fuel type required";
        if (active_owners.length < 1 || active_owners.length > 2) errorObj.active_owners = "Active owners required";
        setErrors(errorObj);
    }, [plane_image, tail_number, manufacturer, model, max_takeoff_weight, seating_capacity, operation_status, fuel_type, active_owners]);




return (
    <div>
    <h2>Create Aircraft</h2>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Plane Image</label>
            <input type="file" id="plane_image" onChange={handleFileChange} />
            {showImage && <img src={showImage} alt="Preview" width="100" />}
            {/* {errors.plane_image && <p>{errors.plane_image}</p>} */}
        </div>
        <div>
            <label>Tail Number</label>
            <input type="text" id="tail_number" value={tail_number} onChange={(e) => setTail_number(e.target.value)} />
            {errors.tail_number && <p>{errors.tail_number}</p>}
        </div>
        <div>
            <label>Manufacturer</label>
            <input type="text" id="manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
            {errors.manufacturer && <p>{errors.manufacturer}</p>}
        </div>
        <div>
            <label>Model</label>
            <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
            {errors.model && <p>{errors.model}</p>}
        </div>
        <div>
            <label>Max Takeoff Weight</label>
            <input type="number" id="max_takeoff_weight" value={max_takeoff_weight} onChange={(e) => setMax_takeoff_weight(e.target.value)} />
            {errors.max_takeoff_weight && <p>{errors.max_takeoff_weight}</p>}
        </div>
        <div>
            <label>Seating Capacity</label>
            <input type="number" id="seating_capacity" value={seating_capacity} onChange={(e) => setSeating_capacity(e.target.value)} />
            {errors.seating_capacity && <p>{errors.seating_capacity}</p>}
        </div>
        <div>
            <label>Operation Status</label>
            <select id="operation_status" value={operation_status} onChange={(e) => setOperation_status(e.target.value)}>
                <option value="">Select an option</option>
                <option value="Operational">Operational</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Decommissioned">Decommissioned</option>
            </select>
            {errors.operation_status && <p>{errors.operation_status}</p>}
        </div>
        <div>
            <label>Fuel Type</label>
            <select id="fuel_type" value={fuel_type} onChange={(e) => setFuel_type(e.target.value)}>
                <option value="">Select an option</option>
                <option value="100ll AvGas">100ll AvGas</option>
                <option value="94 unleaded">94 unleaded</option>
                <option value="Jet A">Jet A</option>
                <option value="100 unleaded">100 unleaded</option>
            </select>
            {errors.fuel_type && <p>{errors.fuel_type}</p>}
        </div>
        <div>
            <label>Active Owners</label>
            <input type="number" id="active_owners" value={active_owners} onChange={(e) => setActive_owners(e.target.value)} />
            {errors.active_owners && <p>{errors.active_owners}</p>}
        </div>
        <div>
            <label>Notes</label>
            <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>
        <div>
            <label>Last Time Fueled</label>
            <input type="date" id="last_time_fueled" value={last_time_fueled} onChange={(e) => setLast_time_fueled(e.target.value)} />
            {errors.last_time_fueled && <p>{errors.last_time_fueled}</p>}
        </div>
        <div className="delete-spot-buttons">
            <button type="submit" className="">Yes (Update Aircraft)</button>
            <button onClick={() => closeModal()} className="">No (Aircraft)</button>
        </div>
    </form>
</div>
);
};


export default UpdateAircraft