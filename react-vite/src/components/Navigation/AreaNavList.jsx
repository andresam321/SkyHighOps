import { useEffect,useState } from 'react'
import { thunkGetAllAreasWithParkingSpots } from '../../redux/airport_area';
import { useDispatch,useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';




const AreaNavList = () => {

const {id} = useParams()
const dispatch = useDispatch();
const navigate = useNavigate()

const areaName = useSelector((state) => state.airportAreasReducer?.areasWithSpots)


const areas = areaName?.airport || [];

console.log("line22", areaName)

const [selectedParking, setSelectedParking] = useState('');

useEffect(() => {
    dispatch(thunkGetAllAreasWithParkingSpots(id));
}, [dispatch,id]);

const handleSelectChange = (event) => {
  const selectedId = event.target.value;
  setSelectedParking(selectedId);
  if (selectedId) {
      navigate(`/area/parking_spot/${selectedId}`);
  }
};

    

  return (
<div>
    <select value={selectedParking} onChange={handleSelectChange}>
        <option value="">Select a Parking Area</option>
        {areas.map((val) => (
            <option key={val?.id} value={val?.id}>
                {val?.parking_name}
            </option>
        ))}
    </select>
</div>
);
};




export default AreaNavList