const LOAD_ALL_OWNERS_THAT_CORRESPOND_TO_AIRCRAFT = "loadAllOwnersThatCorrespondToAircraft/LOAD_ALL_OWNERS_THAT_CORRESPOND_TO_AIRCRAFT"
const LOAD_ONE_OWNER_BY_ID = "loadOneOwnerById/LOAD_ONE_OWNER_BY_ID"
const ADD_OWNER = "addOwner/ADD_OWNER"
const EDIT_OWNER= "editOwner/EDIT_OWNER"
const DELETE_OWNER = "deleteOwner/DELETE_OWNER"
const CLEAR_OWNERS = 'clearOwners/CLEAR_OWNERS'; 


const getAllOwnersFromAircraft = (owners) => ({
    type:LOAD_ALL_OWNERS_THAT_CORRESPOND_TO_AIRCRAFT,
    payload:owners
})
const getOneOwnerById = (owner) => ({
    type: LOAD_ONE_OWNER_BY_ID,
    payload:owner
})

const addOwnerToAircraftId = (owner) => ({
    type: ADD_OWNER,
    payload:owner
})

const updateOwner = (owner) => ({
    type:EDIT_OWNER,
    payload:owner
})

const deleteOwner = (owner) => ({
    type: DELETE_OWNER,
    payload:owner
})

export const clearOwners = () => ({
    type: CLEAR_OWNERS,
});

export const thunkDeleteOwner = (aircraftId, ownerId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/owners/${aircraftId}/owner/${ownerId}`, {
            method: "DELETE",
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to delete owner');
        }

        // Assuming the backend returns a success message without errors
        await dispatch(deleteOwner(ownerId));
        console.log("Owner deleted:", ownerId);
    } catch (error) {
        console.error('Error deleting owner:', error);
    }
};

export const thunkUpdateOwner = (aircraftId, ownerId, owner) => async (dispatch) => {
    try {
        const res = await fetch(`/api/owners/${aircraftId}/owner/${ownerId}`, {
            method: "PUT",
            body:owner
        });
        
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to update owner');
            }
            
            const data = await res.json();
            // console.log("Updated owner data:", data);

        if (!data.errors) {
            await dispatch(updateOwner(data));
        }
    } catch (error) {
        console.error('Error updating owner:', error);
    }
};

export const thunkCreateOwner = (aircraft_id, owner) => async (dispatch) => {
    try {
        const res = await fetch(`/api/owners/${aircraft_id}/new/owner/to_aircraft`, {
            method: "POST",
            body: owner
        })
        if (res.ok) {
            const data = await res.json();
            await dispatch(addOwnerToAircraftId(data));
        }
    } catch (error) {
        console.error('Error fetching owners:', error);
    }
}

export const thunkGetOneOwnerById = (id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/owners/${id}`)
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch owner');
        }

        const data = await res.json();
        // console.log("line13 owner thunk, action", data);

        if (!data.errors) {
            await dispatch(getOneOwnerById(data));
        }
    } catch (error) {
        console.error('Error fetching owners:', error);
    }
}

export const thunkGetAllOwnersThatCorrespondToAircraft = (aircraft_id) => async (dispatch) => {
    try {
        const res = await fetch(`/api/owners/aircrafts/${aircraft_id}`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to fetch owners');
        }

        const data = await res.json();
        // console.log("line13 owner thunk, action", data);

        if (!data.errors) {
            await dispatch(getAllOwnersFromAircraft(data));
        }
    } catch (error) {
        console.error('Error fetching owners:', error);
    
    }
};

function ownerReducer(state = {}, action) {
    switch (action.type){
        case LOAD_ALL_OWNERS_THAT_CORRESPOND_TO_AIRCRAFT: {
            const newState = { ...state };
            // console.log("ownerReducer", action.payload);
            action.payload.owners.forEach((owner) => {
                newState[owner.id] = owner;
            });
            return newState;
        }
        case LOAD_ONE_OWNER_BY_ID:{
            return {
                ...state,
                [action.payload.id]: action.payload
            };
            
        }
        case ADD_OWNER:{
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            // console.log("100",action.payload)
            return newState;
        }
        case EDIT_OWNER : {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case DELETE_OWNER: {
            const newState = { ...state };
            delete newState[action.payload];
            // console.log("Owner deleted from state:", newState);
            return newState;
        }
        case CLEAR_OWNERS:
            return {}
        default:
        return state;

    }
}

export default ownerReducer