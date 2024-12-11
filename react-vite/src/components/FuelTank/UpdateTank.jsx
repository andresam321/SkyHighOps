import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkUpdatFuelTank } from '../../redux/fuel_tank'
import { useModal } from '../../context/Modal'
import { useParams } from 'react-router-dom'


const UpdateTank = () => {

const dispatch = useDispatch()
const {closeModal} = useModal()
const {tankId} = useParams()
const[fuel_capacity, setFuel_capacity] = useState("")
const[fuel_type, setFuel_type] = useState("")
const[last_inspection_date, setLast_inspection_date] = useState("")
const[next_inspection_due, setNext_inspection_due] = useState("")
const[maintenance_status, setMaintenance_status] = useState("")
const[notes, setNotes] = useState("")
const[tank_name, setTank_name] = useState("")
const[threshold_level, setThreshold_level] = useState("")
const[usable_fuel, setUsable_fuel ] = useState("")


const tankById = useSelector((state) => state.fuelTankReducer[+tankId])

useEffect(() => {
    if(tankById){
      setFuel_capacity(tankById.fuel_capacity || "")    
      setFuel_type(tankById.fuel_type || "")
      setMaintenance_status(tankById.maintenance_status || "")
      setLast_inspection_date(tankById.last_inspection_date || "")
      setNext_inspection_due(tankById.next_inspection_due || "")
      setTank_name(tankById.tank_name || "")
      setThreshold_level(tankById.threshold_level || "")
      setNotes(tankById.notes || "")
      setUsable_fuel(tankById.usable_fuel || "")
    }
}, [tankById])

const handleSubmit = async (e) => {
  e.preventDefault()
  const formData = new FormData()
  formData.append("fuel_capacity", fuel_capacity)
  formData.append("fuel_type", fuel_type)
  formData.append("maintenance_status", maintenance_status)
  formData.append("last_inspection_date", last_inspection_date)
  formData.append("next_inspection_due", next_inspection_due)
  formData.append("tank_name", tank_name)
  formData.append("threshold_level", threshold_level)
  formData.append("notes", notes)
  formData.append("usable_fuel", usable_fuel)

  try {
    await dispatch(thunkUpdatFuelTank(formData, tankId))
    closeModal()
  } catch (error) {
    console.error("Failed to update tank:", error);
  }
}

  return (
    <div>
      <div className=''>
        <form className='' onSubmit={handleSubmit}>
            <div className=''>
                <label>Fuel Type</label>
                <select value={fuel_type} onChange={(e) => setFuel_type(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="100ll AvGas">100ll AvGas</option>
                    <option value="94 unleaded">94 unleaded</option>
                    <option value="Jet-A">Jet-A</option>
                    <option value="100 unleaded">100 unleaded</option>
                    <option value="Diesel">Diesel</option>
                </select>
            </div>
            <div className=''>
                <label>Maintenance Status</label>
                <select value={maintenance_status} onChange={(e) => setMaintenance_status(e.target.value)}>
                    <option value="">Select an option</option>
                    <option value="Operational">Operational</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                    <option value="Awaiting Parts">Awaiting Parts</option>
                    <option value="Testing">Testing</option>
                    <option value="Out of Service">Out of Service</option>
                </select>
            </div>
            <div className=''>
                <label>Last inspection Date</label>
                <input
                    type='date'
                    value={last_inspection_date}
                    onChange={(e) => setLast_inspection_date(e.target.value)}
                />
            </div>
            <div className=''>
                <label>Next inspection Date</label>
                <input
                    type='date'
                    value={next_inspection_due}
                    onChange={(e) => setNext_inspection_due(e.target.value)}
                />
            </div>
            <div className=''>
                <label>Tank Name</label>
                <input
                    type=''
                    value={tank_name}
                    onChange={(e) => setTank_name(e.target.value)}
                />
            </div>
            <div className=''>
                <label>Fuel Capacity</label>
                <input
                    type='number'
                    value={fuel_capacity}
                    onChange={(e) => setFuel_capacity(e.target.value)}
                />
            </div>
            <div className=''>
                <label>Threshold level</label>
                <input
                    type='number'
                    value={threshold_level}
                    onChange={(e) => setThreshold_level(e.target.value)}
                />
            </div>
            <div className=''>
                <label>Usable Fuel</label>
                <input
                    type='number'
                    value={usable_fuel}
                    onChange={(e) => setUsable_fuel(e.target.value)}
                />
            </div>
            <div className=''>
                <label>Notes</label>
                <input
                    type='text'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateTank