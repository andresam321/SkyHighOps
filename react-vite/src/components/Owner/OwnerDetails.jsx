import {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import DeleteOwner from './DeleteOwner'
import UpdateOwner from './UpdateOwner'
import { thunkGetAllOwnersThatCorrespondToAircraft, thunkGetOneOwnerById } from '../../redux/owner'
import "./OwnerCss.css"

const OwnerDetails = ({owner}) => {

const {aircraftId} = useParams()
const dispatch = useDispatch()


const currentUser = useSelector((state) => state.session.user);

// console.log("current user",currentUser)
// const ownerState =  useSelector((state) => state.ownerReducer[+aircraftId])
// console.log("This is the list of owners for this plane",ownerState)

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             await dispatch(thunkGetAllOwnersThatCorrespondToAircraft(aircraftId));
//         } catch (error) {
//             console.error('Error in useEffect:', error);
//             // Handle error appropriately, e.g., set an error state
//         }
//     };
//     fetchData();
// }, [dispatch, aircraftId]);

// if (!owner) {
//     return <div>Loading owner details...</div>;
// }


return (
<div className="owner-details-container">
    <h2 className="section-heading">Owner Details</h2>
    <div className="detail-section">
        <p><span className="detail-label">Name:</span> {owner.firstname} {owner.lastname}</p>
        <p><span className="detail-label">Online Presence:</span> {owner.username}</p>
        <p><span className="detail-label">Email:</span> {owner.email}</p>
    </div>
    <div className="detail-section">
        <p><span className="detail-label">Address:</span> {owner.address}</p>
        <p><span className="detail-label">Contact #:</span> {owner.phone_number}</p>
    </div>
    <div className="detail-section">
        <p><span className="detail-label">Payment Type:</span> {owner.payment_type}</p>
        <p><span className="detail-label">Owner Notes:</span> {owner.notes}</p>
    </div>
    <div className="button-container">
        <OpenModalButton
            buttonText={"Update Owner"}
            className="action-button"
            modalComponent={<UpdateOwner owner={owner} />}
        />
        <OpenModalButton
            buttonText={"Delete Owner"}
            className="action-button delete-button"
            modalComponent={<DeleteOwner owner={owner} />}
        />
    </div>
</div>
);
};

export default OwnerDetails