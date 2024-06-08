import { thunkGetAllParkingSpotsWithPlanes, } from "./parking_spot"

const LOAD_SINGLE_AIRCRAFT_BY_ID = "loadSingleAircraftById/LOAD_SINGLE_AIRCRAFT_BY_ID"
const LOAD_ALL_AIRCRAFT = "loadAllAicraft/LOAD_ALL_AIRCRAFT"
const ADD_AIRCRAFT = "addAllAirCraft/ADD_ALL_AIRCRAFT"
const EDIT_AIRCRAFT = "editAircraft/EDIT_AIRCRAFT"
const DELETE_AIRCRAFT = "deleteAircraft/DELETE_AIRCRAFT"
const ASSIGN_AIRCRAFT_TO_PARKING_SPOT = "assignAircraftToParkingSpot/ASSIGN_AIRCRAFT_TO_PARKING_SPOT"
const UNASSIGN_AIRCRAFT_FROM_PARKING_SPOT = "unassignAircraftFromParkingSpot/UNASSIGN_AIRCRAFT_FROM_PARKING_SPOT"


// const ADD_SINGLE_AIRCRAFT = "loadSingleAircraft/LOAD_SINGLE_AIRCRAFT";
// const ASSIGN_AIRCRAFT = "assignAircraft/ASSIGN_AIRCRAFT"


const getSingleAircraftById = (singleAircraft) => ({
    type: LOAD_SINGLE_AIRCRAFT_BY_ID,
    payload: singleAircraft
})

const getAllAircraft = (aircraft) => ({
    type: LOAD_ALL_AIRCRAFT,
    payload: aircraft
})

const addAircraft = (aircraft) => ({
    type: ADD_AIRCRAFT,
    payload: aircraft
})

const updateAircraft = (aircraft) => ({
    type: EDIT_AIRCRAFT,
    payload: aircraft
})

const deleteAircraft = (aircraft) => ({
    type:DELETE_AIRCRAFT,
    payload:aircraft
})

const assignAircraftToParking = (aircraft) => ({
    type: ASSIGN_AIRCRAFT_TO_PARKING_SPOT,
    payload: aircraft
})

const unAssignAircraftFrmParkingSpot = (aircraft) => ({
    type: UNASSIGN_AIRCRAFT_FROM_PARKING_SPOT,
    payload: aircraft
});


// const addSingleAircraft = (addAircraft) => ({
//     type: ADD_SINGLE_AIRCRAFT,
//     payload: addAircraft
// })

// const getAssignAircraft = (assignAircraft) => ({
//     type: ASSIGN_AIRCRAFT,
//     payload: assignAircraft
// })

export const thunkUnAssignAircraftFromParkingSpot = (aircraftId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/aircrafts/unassign_aircraft_from_parking_spot`, {
            method: "POST", 
            body: JSON.stringify({ aircraft_id: aircraftId }),
            headers: {
                "Content-Type": "application/json" 
            }
        });
        if (!res.ok) {
            throw new Error("Failed to unassign aircraft from parking spot");
        }
        const data = await res.json();
        await dispatch(unAssignAircraftFrmParkingSpot(data));
        // console.log("line75 data", data)
        await dispatch(thunkGetAllParkingSpotsWithPlanes());
    } catch (error) {
        return {
            "errors": error.message
        };
    }
};

export const thunkAssignAircraftToParkingSpot = (aircraft) => async (dispatch) => {
    try {
        const res = await fetch(`/api/aircrafts/assign_aircraft_to_parking_spot`, {
            method: "POST", 
            body: JSON.stringify(aircraft), 
            headers: {
                "Content-Type": "application/json" 
            }
        });
        if (!res.ok) {
            throw new Error("Failed to assign aircraft to parking spot");
        }
        const data = await res.json();
        await dispatch(assignAircraftToParking(data));
        await dispatch(thunkGetAllParkingSpotsWithPlanes());
    } catch (error) {
        return {
            "errors": error.message
        };
    }
};

export const thunkUpdateAircraft = (aircraft, aircraftId) => async (dispatch) => {
    const res = await fetch(`/api/aircrafts/${aircraftId}`, {
        method: "PUT", 
        body: aircraft
    })
    const data = await res.json();
    // console.log("UPDATE  aircrafts:", data);
    if (res.ok) {
        await dispatch(updateAircraft(data));
    } else {
        return { "errors": data };
    }
}


export const thunkGetSingleAircraft = (aircraftId) => async (dispatch) => {
    const res = await fetch(`/api/aircrafts/${aircraftId}`)
    if (res.ok) {
        const data = await res.json();
        // console.log("Fetched  aircrafts:", data);
        if (data.errors) {
            return;
        }
        await dispatch(getSingleAircraftById(data))
    }
}

export const thunkAddAircraft = (aircraft) => async (dispatch) => {
    const res = await fetch(`/api/aircrafts/new`, {
        method: "POST",
        body: aircraft
    })
    if (res.ok) {
        const data = await res.json();
        // console.log("Fetched  aircrafts:", data);
        if (data.errors) {
            return;
        }

        await dispatch(addAircraft(data))
        return data
    } else {
        const errorData = await res.json();
        return { errors: errorData.errors };
    
    }
}

export const thunkDeleteAircraft = (aircraftId) => async (dispatch) => {
    const res = await fetch(`/api/aircrafts/${aircraftId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(deleteAircraft(aircraftId));
        return data;
    } else {
        return { "errors": data };
    }
}
// export const thunkAddSingleAircraft = () => async (dispatch) => {
//     const res = await fetch(`/api/aircrafts/available`, {
//         method: POST
//     })
//     if (res.ok) {
//         const data = await res.json();
//         console.log("Fetched  aircrafts:", data);
//         if (data.errors) {
//             return;
//         }
//         await dispatch(addSingleAircraft(data))
// }
// }

// export const thunkGetAssignAircraft = () => async (dispatch) => {
//     const res = await fetch ("/api/aircrafts/assigned")
//     if (res.ok) {
//         const data = await res.json();
//         console.log("Getting asigned aircraft", data);
//         if (data.errors) {
//             return;
            
//         }
//         await dispatch(getAssignAircraft(data))
// }
//}

export const thunkGetAllAircrafts = () => async (dispatch) => {
    const res = await fetch(`/api/aircrafts/all`)
    if (res.ok) {
        const data = await res.json();
        // console.log("Fetched  aircrafts:", data);
        if (data.errors) {
            return;
        }
        await dispatch(getAllAircraft(data.aircrafts))
    }
}




function aircraftReducer(state = {}, action) {
    switch(action.type){
        case LOAD_SINGLE_AIRCRAFT_BY_ID: {
            // console.log("this is inside the reducer", action.payload);
            const newState = {...state,[action.payload.id]: action.payload}
            return newState
        }
        case LOAD_ALL_AIRCRAFT: {
            return {
                ...state,
                allAircraft: action.payload,
            };
        }
        case ADD_AIRCRAFT: {
            // console.log("this is inside the reducer", action.payload);
            const newState = { ...state };
            newState[action.payload.id] = action.payload
            return newState
        }
        case EDIT_AIRCRAFT: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case DELETE_AIRCRAFT: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case ASSIGN_AIRCRAFT_TO_PARKING_SPOT :{
            const newState = { ...state };
            newState[action.payload.id] = action.payload
            return newState
        }
        case UNASSIGN_AIRCRAFT_FROM_PARKING_SPOT: {
            const { aircraft_id, parking_spot_id } = action.payload;
            return {
                ...state,
                [aircraft_id]: {
                    ...state[aircraft_id],
                    parking_spot_id: parking_spot_id
                }
            }
        }
        default:
            return state;
    }
}

export default aircraftReducer;