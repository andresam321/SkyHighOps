import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkDeleteAircraft } from "../../redux/aircraft";
import { useNavigate } from "react-router-dom";


const DeleteAircraft = () => {
    const {aircraftId} = useParams()
    const dispatch = useDispatch();
    const {closeModal} = useModal()
    const navigate = useNavigate()

    const handleDelete = async (e) => {
        e.preventDefault()

        await dispatch(thunkDeleteAircraft(aircraftId))
        navigate("/")
        closeModal()
    }


return (
<div>
    <form onSubmit={handleDelete} className="">
        <div>
            <h2>Confirm Delete</h2>
        </div>
        <div className="">
                <p>Are you sure you want to remove Aircraft?</p>
        </div>
        <div className="">
            <button type="submit" className="">Yes (Delete Aircraft)</button>
            <button onClick={() => closeModal()} className="">No (Keep Aircraft)</button>
        </div>
        </form>
    </div>
    )
}

export default DeleteAircraft