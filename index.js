// Create object of redux
const redux = require("redux");

// Create object of store
const createStore = redux.createStore;

// Actions
const LAPTOP_ORDERED = "LAPTOP_ORDERED";
const LAPTOP_RESTOCKED = "LAPTOP_RESTOCKED";

// Action creator is a function that returns action object
function orderLaptop() {
  return {
    // An action is a JS object with a type property
    type: LAPTOP_ORDERED,
    quantity: 1,
  };
}

function restockLaptop(qty = 1) {
  return {
    type: LAPTOP_RESTOCKED,
    quantity: qty,
  };
}

// Initial state
const initialState = {
  numberOfLaptops: 10,
  numOfSmartphones: 5, // Corrected typo in variable name
};

// Reducers. Syntax is reducer(previousState, action) => newState
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LAPTOP_ORDERED:
      return {
        ...state,
        numberOfLaptops: state.numberOfLaptops - action.quantity,
      };
    case LAPTOP_RESTOCKED: // Corrected action type
      return {
        ...state,
        numberOfLaptops: state.numberOfLaptops + action.quantity,
      };
    default:
      return state;
  }
};

// Create store. Reducer by default will return the current state
const store = createStore(reducer);
console.log("Initial state", store.getState());

// Subscribe to store
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
); // Listener

// Trigger actions
store.dispatch(orderLaptop());
store.dispatch(orderLaptop());
store.dispatch(orderLaptop());
store.dispatch(restockLaptop(3));

// Unsubscribe
unsubscribe();
