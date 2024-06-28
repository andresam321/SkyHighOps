import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { thunkDeleteOwner } from "../../redux/owner";
import { thunkGetAllOwnersThatCorrespondToAircraft } from "../../redux/owner";

const DeleteOwner = ({ owner }) => {

    const { closeModal } = useModal();
    const dispatch = useDispatch();


const handleDelete = async (e) => {
        e.preventDefault();

    try {
          // Dispatch thunkDeleteOwner action
        await dispatch(thunkDeleteOwner(owner.aircraft_id, owner.id));

          // Close modal
        dispatch(thunkGetAllOwnersThatCorrespondToAircraft(owner.aircraft_id));
        closeModal();

          // Optionally, fetch updated data
        
    } catch (error) {
        console.error("Error deleting owner:", error);
        alert("An error occurred. Please try again.");
    }
};

return (
        <div className="delete-container">
            <form onSubmit={handleDelete} className="delete-form">
                <div className="delete-header">
                    <h2>Confirm Delete</h2>
                </div>
                <div className="delete-message">
                    <p>Are you sure you want to delete this Owner?</p>
                </div>
                <div className="delete-buttons">
                    <button type="submit" className="delete-button">
                        Delete
                    </button>
                    <button onClick={() => closeModal()} className="cancel-button">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DeleteOwner;