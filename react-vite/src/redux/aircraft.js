

const LOAD_SINGLE_AIRCRAFT_BY_ID = "loadSingleAircraftById/LOAD_SINGLE_AIRCRAFT_BY_ID"
const LOAD_ALL_AIRCRAFT = "loadAllAicraft/LOAD_ALL_AIRCRAFT"
const ADD_AIRCRAFT = "addAllAirCraft/ADD_ALL_AIRCRAFT"
const EDIT_AIRCRAFT = "editAircraft/EDIT_AIRCRAFT"
const DELETE_AIRCRAFT = "deleteAircraft/DELETE_AIRCRAFT"


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

// const addSingleAircraft = (addAircraft) => ({
//     type: ADD_SINGLE_AIRCRAFT,
//     payload: addAircraft
// })

// const getAssignAircraft = (assignAircraft) => ({
//     type: ASSIGN_AIRCRAFT,
//     payload: assignAircraft
// })

export const thunkUpdateAircraft = (aircraft, aircraftId) => async (dispatch) => {
    const res = await fetch(`/api/aircrafts/${aircraftId}`, {
        method: "PUT", 
        body: aircraft
    })
    const data = await res.json();
    console.log("UPDATE  aircrafts:", data);
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
        console.log("Fetched  aircrafts:", data);
        if (data.errors) {
            return;
        }

        await dispatch(addAircraft(data))
    
    }
}

export const thunkDeleteAircraft = (aircraftId) => async (dispatch) => {
    const res = await fetch(`/api/aircrafts/${aircraftId}`, {
        method: "DELETE"
    });
    const data = await res.json();
    if (res.ok) {
        await dispatch(deleteAircraft(aircraftId));
        return parking_spotId;
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
            const newState = {... state };
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
        // case ADD_SINGLE_AIRCRAFT: {
        //     const newState = {...state,[action.payload.id]: action.payload}
        //     return newState
        // }
        // case ASSIGN_AIRCRAFT: {
        //     return {
        //         ...state,
        //         assignedAircraft: action.payload,
        //     };
        // }
        default:
            return state;
    }
}

export default aircraftReducer;