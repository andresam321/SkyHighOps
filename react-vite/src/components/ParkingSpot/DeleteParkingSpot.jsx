import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkDeleteParkingSpot } from "../../redux/parking_spot";
import { useNavigate } from "react-router-dom";

const DeleteParkingSpot = () => {
    const {parking_spotId} = useParams()
    const dispatch = useDispatch();
    const {closeModal} = useModal()
    const navigate = useNavigate()



    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteParkingSpot(parking_spotId))
        closeModal()
        navigate("/")
    }


return (
 <div>
    <form onSubmit={handleDelete} className="">
        <div>
                    <h2>Confirm Delete</h2>
        </div>
        <div className="">
                <p>Are you sure you want to remove this parking spot?</p>
        </div>
        <div className="">
            <button type="submit" className="">Yes (Delete Parking Spot)</button>
            <button onClick={() => closeModal()} className="keep-spot-button">No (Keep Parking Spot)</button>
        </div>
        </form>
    </div>
    )
}

export default DeleteParkingSpot