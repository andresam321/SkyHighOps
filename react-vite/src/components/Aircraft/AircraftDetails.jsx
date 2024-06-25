import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { thunkGetSingleAircraft } from '../../redux/aircraft'
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { thunkGetAllOwnersThatCorrespondToAircraft,thunkGetOneOwnerById } from '../../redux/owner'
import UpdateAircraft from './UpdateAircraft'
import DeleteAircraft from './DeleteAircraft'
import OwnerDetails from '../Owner/OwnerDetails'
import CreateOwner from '../Owner/CreateOwner'
import "./Aircraft.css"

const AircraftDetails = () => {

    let dispatch = useDispatch()
    const {aircraftId} = useParams()

    // const currentUser = useSelector((state) => state.session.user);

    const aircraftbyId = useSelector((state)=> state.aircraftReducer[aircraftId])

    const ownerById =  useSelector((state) => Object.values(state.ownerReducer))
    // const selectedAircraft = aircraftbyId[aircraftId]

    console.log("This is the list of owners for this plane",ownerById)
    // console.log("line 15 in details",aircraftbyId)
    // console.log("line 17 in details",selectedAircraft)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(thunkGetSingleAircraft(aircraftId))
                await dispatch(thunkGetAllOwnersThatCorrespondToAircraft(aircraftId));
            } catch (error) {
                console.error('Error in useEffect:', error);
                // Handle error appropriately, e.g., set an error state
            }
        };
        fetchData();
    }, [dispatch, aircraftId]);

    
    if (!aircraftbyId || !ownerById) {
        return <div>Loading...</div>; // or handle appropriately
    }

    const getFuelTypeStyle = (fuelType) => {
        switch (fuelType) {
            case '100ll AvGas':
                return { color: 'blue' };
            case '94 unleaded':
                return { color: 'yellow' };
            case 'Jet A':
                return { color: 'black', fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: '2px 5px' };
            case '100 unleaded':
                return { color: 'lightblue' };
            default:
                return { color: 'gray' };
        }
    };



return (
    <div className="aircraft-details">
    <h2>Aircraft Details</h2>
    <div>
        <img src={aircraftbyId.plane_image} alt={aircraftbyId.model} />
    </div>
    <div className="details-container">
        <div>
            <p><span>Manufacturer:</span> {aircraftbyId.manufacturer}</p>
            <p><span>Model:</span> {aircraftbyId.model}</p>
            <p><span>Tail Number:</span> {aircraftbyId.tail_number}</p>
        </div>
        <div>
            <p><span>Fuel Type:</span> <span style={getFuelTypeStyle(aircraftbyId.fuel_type)}> {aircraftbyId.fuel_type}</span></p>
            <p><span>Operation Status:</span> {aircraftbyId.operation_status}</p>
            <p><span>Last Time Fueled:</span> {aircraftbyId.last_time_fueled}</p>
        </div>
        <div>
            <p><span>Seating Capacity:</span> {aircraftbyId.seating_capacity}</p>
            <p><span>Active Owners:</span> {aircraftbyId.active_owners}</p>
            <p><span>Max Takeoff Weight:</span> {aircraftbyId.max_takeoff_weight}</p>
        </div>
        <div>
            <p><span>Notes:</span> {aircraftbyId.notes}</p>
        </div>
    </div>
    <div className="owners-list">
            <div>
                <h4>Owners</h4>
                <OpenModalButton
                    buttonText={"Add Owner to aircraft"}
                    className="view-details-button"
                    modalComponent={<CreateOwner/>}
                    /> 
                </div>
                <div className="owners-grid">
                    {ownerById.map((owner) => (
                        <div key={owner.id} className="owner-card">
                            <p><strong>{owner.firstname} {owner.lastname}</strong></p>
                            <p><span>Notes:</span> {owner.notes}</p>
                            <OpenModalButton
                                buttonText={"View Owner Info"}
                                className="view-details-button"
                                modalComponent={<OwnerDetails owner={owner} />}
                            />
                        </div>
                    ))}
                </div>
                
            </div>
    <div className="button-container">
        <OpenModalButton
            buttonText={"Update Aircraft"}
            className="update-button"
            modalComponent={<UpdateAircraft aircraftId={aircraftId} />}
        />
        <OpenModalButton
            buttonText={"Delete Aircraft"}
            className="delete-button"
            modalComponent={<DeleteAircraft aircraftId={aircraftId} />}
        />
    </div>
</div>
);
};

export default AircraftDetails