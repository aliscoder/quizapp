import {
  Middleware,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import Api from "./api";
import authReducer from "./reducers/authReducer";

const reducer = combineReducers({
  [Api.reducerPath]: Api.reducer,
  auth: authReducer,
});

const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }).concat(Api.middleware),
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
