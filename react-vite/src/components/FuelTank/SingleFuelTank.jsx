import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkLoadOneTank, thunkLoadAllTanks } from '../../redux/fuel_tank'
import { useParams } from 'react-router-dom'
import FuelGauge from './FuelGauge'
import "./SingleFuelTank.css"


const SingleFuelTank = () => {

    const dispatch = useDispatch()
    // let dispatch = useDispatch()
    const {tankId} = useParams()
    console.log("line11",tankId)

    const tank = useSelector((state) => state.fuelTankReducer[tankId]);
    console.log("line14",tank)

    useEffect(() => {
      dispatch(thunkLoadOneTank(tankId));
      // console.log("Tanks after dispatch:", tank);
  }, [dispatch, tankId]);
    // const tankId = useSelector((state) => state.fuelTankReducer[id])
  return (
    <div>
    <div className="single-fuel-tank">
        <FuelGauge tank={tank} className="tank" />
    </div>
    <div className="single-fuel-tank-details">
        <p>
            <span>Next Inspection Date:</span> {tank?.next_inspection_due || 'N/A'}
        </p>
        <p>
            <span>Last Inspection Date:</span> {tank?.last_inspection_date || 'N/A'}
        </p>
        <p>
            <span>Maintenance Status:</span> {tank?.maintenance_status || 'N/A'}
        </p>
        <p>
            <span>Threshold Level:</span> {tank?.threshold_level || 'N/A'}
        </p>
    </div>
</div>
);
};

export default SingleFuelTank
