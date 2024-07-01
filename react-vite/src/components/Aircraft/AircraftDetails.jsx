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
import { clearOwners } from '../../redux/owner'
import "./Aircraft.css"

const AircraftDetails = () => {

    let dispatch = useDispatch()
    const {aircraftId} = useParams()

    const currentUser = useSelector((state) => state.session.user);

    // console.log("current user",currentUser)

    const aircraftById = useSelector((state)=> state.aircraftReducer[aircraftId])

    const ownerById =  useSelector((state) => Object.values(state.ownerReducer))
    // const selectedAircraft = aircraftbyId[aircraftId]

    // console.log("This is the list of owners for this plane",ownerById)
    // console.log("line 15 in details",aircraftbyId)
    // console.log("line 17 in details",selectedAircraft)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Clearing owners for aircraft:', aircraftId);
                await dispatch(clearOwners());
                await dispatch(thunkGetSingleAircraft(aircraftId));
                await dispatch(thunkGetAllOwnersThatCorrespondToAircraft(aircraftId));
            } catch (error) {
                console.error('Error in useEffect:', error);
            }
        };
        fetchData();
    }, [dispatch, aircraftId]);

    
    if (!aircraftById) {
        return <div>Loading...</div>; // Handle loading state
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
        <img src={aircraftById.plane_image} alt={aircraftById.model} />
    </div>
    <div className="details-container">
        <div>
            <p><span>Manufacturer:</span> {aircraftById.manufacturer}</p>
            <p><span>Model:</span> {aircraftById.model}</p>
            <p><span>Tail Number:</span> {aircraftById.tail_number}</p>
        </div>
        <div>
            <p><span>Fuel Type:</span> <span style={getFuelTypeStyle(aircraftById.fuel_type)}> {aircraftById.fuel_type}</span></p>
            <p><span>Operation Status:</span> {aircraftById.operation_status}</p>
            <p><span>Last Time Fueled:</span> {aircraftById.last_time_fueled}</p>
        </div>
        <div>
            <p><span>Seating Capacity:</span> {aircraftById.seating_capacity}</p>
            <p><span>Active Owners:</span> {aircraftById.active_owners}</p>
            <p><span>Max Takeoff Weight:</span> {aircraftById.max_takeoff_weight}</p>
        </div>
        <div>
            <p><span>Notes:</span> {aircraftById.notes}</p>
        </div>
    </div>
    <div className="owners-list">
        <div>
            <h4>Owners</h4>
            <OpenModalButton
                buttonText={"Add Owner to Aircraft"}
                className="view-details-button"
                modalComponent={<CreateOwner />}
            />
        </div>
        <div className="owners-grid">
            {ownerById.length > 0 ? (
                ownerById.map((owner) => (
                    <div key={owner.id} className="owner-card">
                        <p><strong>{owner.firstname} {owner.lastname}</strong></p>
                        <p><span>Notes:</span> {owner.notes}</p>
                        <OpenModalButton
                            buttonText={"View Owner Info"}
                            className="view-details-button"
                            modalComponent={<OwnerDetails owner={owner} />}
                        />
                    </div>
                ))
            ) : (
                <p>No owners added atm.</p>
            )}
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