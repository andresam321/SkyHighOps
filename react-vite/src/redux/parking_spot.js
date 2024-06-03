const LOAD_ALL_PARKING_SPOTS_WITH_PLANES = "planesWithParkingSpots/LOAD_ALL_PARKING_SPOTS_WITH_PLANES";
const LOAD_EMPTY_PARKING_SPOTS = "emptyParkingSpots/LOAD_EMPTY_PARKING_SPOTS";
const LOAD_SINGLE_PARKING_SPOT = "loadSingleParkingSpot/LOAD_SINGLE_PARKING_SPOT";
const ADD_PARKING_SPOT = "addParkingSpot/ADD_PARKING_SPOT"
const UPDATE_PARKING_SPOT = "updateParkingSpot/UPDATE_PARKING_SPOT"
const DELETE_PARKING_SPOT = "deleteParkingSpot/DELETE_PARKING_SPOT"
const REMOVE_AIRCRAFT_FROM_PARKING_SPOT = "removeAircraftFromParkingSpot/REMOVE_AIRCRAFT_FROM_PARKING_SPOT"
const ASSIGN_AIRCRAFT_TO_PARKING_SPOT = "assignAircraftToParkingSpot/ASSIGN_AIRCRAFT_TO_PARKING_SPOT"
const UPDATE_PARKING_SPOT_STATUS = "updateParkingSpotStatus/UPDATE_PARKING_SPOT_STATUS";


const getAllParkingSpotsWithPlanes = (planesWithParkingSpots) => ({
    type: LOAD_ALL_PARKING_SPOTS_WITH_PLANES,
    payload: planesWithParkingSpots,
});

const getAllEmptyParkingSpots = (emptyParkingSpots) => ({
    type: LOAD_EMPTY_PARKING_SPOTS,
    payload: emptyParkingSpots,
});

const getSingleParkingSpot = (singleParkingSpot) => ({
    type: LOAD_SINGLE_PARKING_SPOT,
    payload: singleParkingSpot
});

const createParkingSpot = (addParkingSpot) => ({
    type: ADD_PARKING_SPOT,
    payload: addParkingSpot
});

const updateParkingSpot = (updatingParkingSpot) => ({
    type: UPDATE_PARKING_SPOT,
    payload: updatingParkingSpot
});

const deleteParkingSpot = (parkingSpotDeleted) => ({
    type: DELETE_PARKING_SPOT,
    payload: parkingSpotDeleted
});

// const removeAircraftFromParkingSpot = (parking_spotId, aircraftId) => ({
//     type: REMOVE_AIRCRAFT_FROM_PARKING_SPOT,
//     payload: { parking_spotId, aircraftId }
// });

const assignAircraftToParkingSpot = (parking_spotId, aircraftId) => ({
    type: ASSIGN_AIRCRAFT_TO_PARKING_SPOT,
    payload: { parking_spotId, aircraftId }
});


const updateParkingSpotStatus = (parkingSpot) => ({
    type: UPDATE_PARKING_SPOT_STATUS,
    payload: parkingSpot
});

// Thunks
export const thunkGetAllParkingSpotsWithPlanes = () => async (dispatch) => {
    const res = await fetch("/api/parking_spots/with_aircrafts");
    if (res.ok) {
        const data = await res.json();
        if (!data.errors) {
            await dispatch(getAllParkingSpotsWithPlanes(data.parkingSpots));
        }
    }
};

export const thunkGetAllEmptyParkingSpots = () => async (dispatch) => {
    const res = await fetch("/api/parking_spots/empty");
    if (res.ok) {
        const data = await res.json();
        if (!data.errors) {
            await dispatch(getAllEmptyParkingSpots(data.parkingSpots));
        }
    }
};

export const thunkGetSingleParkingSpot = (parking_spotId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/${parking_spotId}`);
    if (res.ok) {
        const data = await res.json();
        if (!data.errors) {
            await dispatch(getSingleParkingSpot(data));
        }
    }
};

export const thunkCreateParkingSpot = (parkingSpot) => async (dispatch) => {
    const res = await fetch("/api/parking_spots/new", {
        method: "POST",
        body: parkingSpot
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(createParkingSpot(data));
        return data;
    }
    return data.errors;
};

export const thunkUpdateParkingSpot = (parkingSpot, parking_spotId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/${parking_spotId}`, {
        method: "PUT",
        body: parkingSpot
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(updateParkingSpot(data));
    } else {
        return { "errors": data };
    }
};

export const thunkDeleteParkingSpot = (parking_spotId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/${parking_spotId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(deleteParkingSpot(parking_spotId));
        return parking_spotId;
    } else {
        return { "errors": data };
    }
};

// export const thunkRemoveAircraftFromParkingSpot = (parking_spotId, aircraftId) => async (dispatch) => {
//     const res = await fetch(`/api/parking_spots/${parking_spotId}/remove_plane/${aircraftId}`, {
//         method: 'POST',
//     });
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(removeAircraftFromParkingSpot(parking_spotId, aircraftId));
//         dispatch(updateParkingSpotStatus({ id: parking_spotId, is_reserved: "No" }));
//         await dispatch(thunkGetAllParkingSpotsWithPlanes());
//         await dispatch(thunkGetAllEmptyParkingSpots());
//         return data;
//     }
// };

// export const thunkAssignAircraftToParkingSpot = (parking_spotId, aircraftId) => async (dispatch) => {
//     const res = await fetch(`/api/parking_spots/${parking_spotId}/assign_plane/${aircraftId}`, {
//         method: 'POST',
//     });
//     if (res.ok) {
//         const data = await res.json();
//         if (data.message) {
//             dispatch(assignAircraftToParkingSpot(parking_spotId, aircraftId));
//         }
//     }
// };

export const thunkAssignAircraftToParkingSpot = (parking_spotId, aircraftId) => async (dispatch) => {
    const res = await fetch(`/api/parking_spots/assign_aircraft_to_parking_spot`, {
        method: 'POST',
    });
    if (res.ok) {
        const data = await res.json();
        if (data.message) {
            dispatch(assignAircraftToParkingSpot(parking_spotId, aircraftId));
        }
    }
};

// Reducer
function parkingSpotReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_ALL_PARKING_SPOTS_WITH_PLANES: {
            return { ...state, planeWithSpots: action.payload };
        }
        case LOAD_EMPTY_PARKING_SPOTS: {
            return { ...state, emptySpots: action.payload };
        }
        case LOAD_SINGLE_PARKING_SPOT: {
            const newState = { ...state, [action.payload.id]: action.payload };
            return newState;
        }
        case ADD_PARKING_SPOT: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case UPDATE_PARKING_SPOT: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case DELETE_PARKING_SPOT: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case REMOVE_AIRCRAFT_FROM_PARKING_SPOT: {
            const { parking_spotId } = action.payload;
            const newState = { ...state };
            newState.planeWithSpots = newState.planeWithSpots.map((spot) =>
                spot.id === parking_spotId ? { ...spot, is_reserved: "No" } : spot
            );
            return newState;
        }
        case ASSIGN_AIRCRAFT_TO_PARKING_SPOT: {
            const { parking_spotId, aircraftId } = action.payload;
            const newState = { ...state };
            newState[parking_spotId] = {
                ...newState[parking_spotId],
                aircraft_id: aircraftId
            };
            return newState;
        }
        default:
            return state;
    }
}

export default parkingSpotReducer;