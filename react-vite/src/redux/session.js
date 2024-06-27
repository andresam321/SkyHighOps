const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});


function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Check if CSRF token is retrieved correctly
const csrfToken = getCookie('csrf_token');
console.log("Retrieved CSRF Token:", csrfToken);


export const thunkAuthenticate = () => async (dispatch) => {
  const csrfToken = getCookie('csrf_token');
  console.log("CSRF Token:", csrfToken);  // Debugging line

  const response = await fetch("/api/auth/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    }
  });

  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }
    dispatch(setUser(data));
  }
};

export const thunkLogin = (credentials) => async dispatch => {
  const csrfToken = getCookie('csrf_token');
  console.log("CSRF Token:", csrfToken);  // Debugging line

  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "X-CSRF-Token": csrfToken
    },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    console.log("Error messages:", errorMessages);  // Debugging line
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};


export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
