
const LOAD_ALL_PARKING_SPOTS_WITH_PLANES = "planesWithParkingSpots/LOAD_ALL_PARKING_SPOTS_WITH_PLANES";
const LOAD_EMPTY_PARKING_SPOTS = "emptyParkingSpots/LOAD_EMPTY_PARKING_SPOTS";
const LOAD_SINGLE_PARKING_SPOT = "loadSingleParkingSpot/LOAD_SINGLE_PARKING_SPOT";
const ADD_PARKING_SPOT = "addParkingSpot/ADD_PARKING_SPOT"


const getAllParkingSpotsWithPlanes = (planesWithParkingSpots) => ({
    type: LOAD_ALL_PARKING_SPOTS_WITH_PLANES,
    payload: planesWithParkingSpots,
});

const getAllEmptyParkingSpots = (emptyParkingSpots) => ({
    type: LOAD_EMPTY_PARKING_SPOTS,
    payload: emptyParkingSpots,
});

const getSingleParkingSpot = (singleParkingSpot) => ({
    type:LOAD_SINGLE_PARKING_SPOT,
    payload: singleParkingSpot
})

const createParkingSpot = (addParkingSpot) => ({
    type:ADD_PARKING_SPOT,
    payload:addParkingSpot
})



// Thunks
export const thunkGetAllParkingSpotsWithPlanes = () => async (dispatch) => {
    const res = await fetch("/api/parking_spots/with_aircrafts");
    if (res.ok) {
        const data = await res.json();
        if (!data.errors) {
        await  dispatch(getAllParkingSpotsWithPlanes(data.parkingSpots));
        }
    }
};

export const thunkGetAllEmptyParkingSpots = () => async (dispatch) => {
    const res = await fetch("/api/parking_spots/empty");
    if (res.ok) {
        const data = await res.json();
        // console.log("Fetched empty spots:", data);
        if (data.errors) {
            return;
        }
        await  dispatch(getAllEmptyParkingSpots(data.parkingSpots));
    }
};

export const thunkGetSingleParkingSpot = (parking_spotId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/${parking_spotId}`)
    if (res.ok) {
        const data = await res.json();
        // console.log("Fetched empty spot:", data);
        if (data.errors) {
            return;
        }

        await dispatch(getSingleParkingSpot(data))
    }

}

export const thunkCreateParkingSpot = (parkingSpot) => async (dispatch) => {
    const res = await fetch("/api/parking_spots/new",{
        method: "POST",
        body:parkingSpot
    })
    const data = await res.json()
    console.log("res is getting deniiieeed",data)

    await dispatch(createParkingSpot(data))
    return data
}

// const initialState = {
//     planeWithSpots: [],
//     emptySpots: [],
// };

function parkingSpotReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_ALL_PARKING_SPOTS_WITH_PLANES: {
            return { ...state, planeWithSpots: action.payload };
        }
        case LOAD_EMPTY_PARKING_SPOTS: {
            // console.log("Reducer - Empty Spots:", action.payload);
            return { ...state, emptySpots: action.payload };
        }
        case LOAD_SINGLE_PARKING_SPOT: {
            console.log("this is inside the reducer", action.payload);
            const newState = {...state,[action.payload.id]: action.payload}
            return newState
        }
        case ADD_PARKING_SPOT: {
            const newState = {...state};
            newState[action.payload.id] = action.payload
            return newState
        }
        default:
            return state;
    }
}

export default parkingSpotReducer;