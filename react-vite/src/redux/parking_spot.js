const LOAD_ALL_PARKING_SPOTS_WITH_PLANES = "planesWithParkingSpots/LOAD_ALL_PARKING_SPOTS_WITH_PLANES";
const LOAD_EMPTY_PARKING_SPOTS = "emptyParkingSpots/LOAD_EMPTY_PARKING_SPOTS";


const getAllParkingSpotsWithPlanes = (planesWithParkingSpots) => ({
    type: LOAD_ALL_PARKING_SPOTS_WITH_PLANES,
    payload: planesWithParkingSpots,
});

const getAllEmptyParkingSpots = (emptyParkingSpots) => ({
    type: LOAD_EMPTY_PARKING_SPOTS,
    payload: emptyParkingSpots,
});

// Thunks
export const thunkGetAllParkingSpotsWithPlanes = () => async (dispatch) => {
    const res = await fetch("/api/parking_spots/with_aircrafts");
    if (res.ok) {
        const data = await res.json();
        if (!data.errors) {
            dispatch(getAllParkingSpotsWithPlanes(data.parkingSpots));
        }
    }
};

export const thunkGetAllEmptyParkingSpots = () => async (dispatch) => {
    const res = await fetch("/api/parking_spots/empty");
    if (res.ok) {
        const data = await res.json();
        console.log("Fetched empty spots:", data);
        if (data.errors) {
            return;
        }
        dispatch(getAllEmptyParkingSpots(data.parkingSpots));
    }
};

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
            console.log("Reducer - Empty Spots:", action.payload);
            return { ...state, emptySpots: action.payload };
        }
        default:
            return state;
    }
}

export default parkingSpotReducer;