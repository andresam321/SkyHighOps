const LOAD_SINGLE_PARKING_SPOT = "loadSingleParkingSpot"



const getSingleAircraft = (singleAircraft) => ({
    type: LOAD_SINGLE_PARKING_SPOT,
    payload: singleAircraft
})


export const thunkGetSingleAircraft = () => async (disatch) => {
    const res = await fetch(`/api/aircrafts/${id}`)
    if (res.ok) {
        const data = await res.json();
        console.log("Fetched  aircrafts:", data);
        if (data.errors) {
            return;
        }
        dispatchEvent(getSingleAircraft(data))
    }
}

function aircraftReducer(state = {}, action) {
    switch(action.type){
        case LOAD_SINGLE_PARKING_SPOT: {
            const newState = {...state,[action.payload.id]: action.payload}
            return newState
        }
        default:
            return state;
    }
}

export default aircraftReducer;