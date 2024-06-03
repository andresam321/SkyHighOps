const LOAD_SINGLE_AIRCRAFT_BY_ID = "loadSingleAircraftById/LOAD_SINGLE_AIRCRAFT_BY_ID"
const LOAD_ALL_AIRCRAFT = "loadAllAicraft/LOAD_ALL_AIRCRAFT"
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

// const addSingleAircraft = (addAircraft) => ({
//     type: ADD_SINGLE_AIRCRAFT,
//     payload: addAircraft
// })

// const getAssignAircraft = (assignAircraft) => ({
//     type: ASSIGN_AIRCRAFT,
//     payload: assignAircraft
// })


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
        await dispatch(getAllAircraft(data))
    }
}




function aircraftReducer(state = {}, action) {
    switch(action.type){
        case LOAD_SINGLE_AIRCRAFT_BY_ID: {
            console.log("this is inside the reducer", action.payload);
            const newState = {...state,[action.payload.id]: action.payload}
            return newState
        }
        case LOAD_ALL_AIRCRAFT: {
            return {
                ...state,
                allAircraft: action.payload,
            };
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