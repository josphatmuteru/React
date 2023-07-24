import { applyMiddleware, combineReducers, createStore } from "redux";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountSlice";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// store.dispatch(requestLoan(500, "Buy stuff"));
// store.dispatch(createCustomer("Josphat", "jakdkafkak"));

// console.log(store.getState());
