import {  useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetFlightIdent } from '../../redux/flightaware';
import { useModal } from '../../context/Modal';
import { thunkGetSingleAircraft } from '../../redux/aircraft';
import "./FlightIdent.css"

const FlightIdent = ({aircraftId}) => {

  const [tail_number, setTail_number] = useState('')
  const dispatch = useDispatch()
  const {closeModal} = useModal()
  const aircraftIdentification = useSelector((state) => state.flightAwareReducer);
  const aircraft = useSelector((state) => state.aircraftReducer[aircraftId]);
  console.log("line12",aircraft)

  console.log("line11", aircraftIdentification)

  const handleSubmit = (e) => {
        e.preventDefault();
        if (tail_number) {
            dispatch(thunkGetFlightIdent(tail_number));
        }
    };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('modal-container')) {
      closeModal();
    }
  };



    useEffect(() => {
        if (aircraftId) {
        dispatch(thunkGetSingleAircraft(aircraftId)); 
        }
    }, [dispatch, aircraftId]);

    useEffect(() => {
        if (aircraft) {
        setTail_number(aircraft.tail_number || '');
    }
    }, [aircraft]);

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString() : "Not Available";
  };

  return (
    <div className="modal-container" onClick={handleOutsideClick}>
      <div className="modal-content">
        <h1 className="heading">Aircraft Status</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <label className="form-label">Tail Number Starting with N:</label>
          <input
            type="text"
            value={tail_number}
            onChange={(e) => setTail_number(e.target.value)}
            placeholder="Enter tail number starting ex: N458MM"
            className="form-input"
          />
          <button type="submit" className="view-details-button">Get Info</button>
        </form>

        {aircraftIdentification && aircraftIdentification.data && aircraftIdentification.data.length > 0 ? (
          <div className="data-list">
            {aircraftIdentification.data.map((item, index) => (
              <div key={index} className="data-item">
                <h2 className="flight-title">Flight #{index + 1}</h2>
                <div className="flight-info-container">
                  <div className="flight-info-section">
                    <h3>Origin</h3>
                    <p>City: {item?.origin?.city}</p>
                    <p>Code: {item?.origin?.code}</p>
                    <p>Name: {item?.origin?.name}</p>
                  </div>
                  <div className="flight-info-section">
                    <h3>Destination</h3>
                    <p>City: {item?.destination?.city}</p>
                    <p>Code: {item?.destination?.code}</p>
                    <p>Name: {item?.destination?.name}</p>
                  </div>
                </div>
                <div className="flight-details">
                  <p>Status: {item.status}</p>
                  <p>registration: {item.registration}</p>
                  <p>Departure Delay: {item.departure_delay} seconds</p>
                  <p>Arrival Delay: {item.arrival_delay} seconds</p>
                  <p>Scheduled Departure: {formatDate(item.scheduled_out)}</p>
                  <p>Estimated Departure: {formatDate(item.estimated_out)}</p>
                  <p>Scheduled Arrival: {formatDate(item.scheduled_on)}</p>
                  <p>Estimated Arrival: {formatDate(item.estimated_on)}</p>
                  <p>Aircraft Type: {item.aircraft_type}</p>
                  <p>Route: {item.route}</p>
                  <p>Route Distance: {item.route_distance} nm</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No aircraft data available.</p>
        )}
      </div>
    </div>
  );
};

export default FlightIdent