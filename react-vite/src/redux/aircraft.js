const LOAD_SINGLE_PARKING_SPOT = "loadSingleParkingSpot"



const getSingleAircraft = (singleAircraft) => ({
    type: LOAD_SINGLE_PARKING_SPOT,
    payload: singleAircraft
})


export const thunkGetSingleAircraft = (aircraftId) => async (dispatch) => {
    const res = await fetch(`/api/aircrafts/${aircraftId}`)
    if (res.ok) {
        const data = await res.json();
        console.log("Fetched  aircrafts:", data);
        if (data.errors) {
            return;
        }
        await dispatch(getSingleAircraft(data))
    }
}

function aircraftReducer(state = {}, action) {
    switch(action.type){
        case LOAD_SINGLE_PARKING_SPOT: {
            console.log("this is inside the reducer", action.payload);
            const newState = {...state,[action.payload.id]: action.payload}
            return newState
        }
        default:
            return state;
    }
}

export default aircraftReducer;