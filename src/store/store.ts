import { configureStore, combineReducers } from "@reduxjs/toolkit";
// @ts-expect-error
import  searchReducer  from "./slice";

const rootReducer = combineReducers({
  search: searchReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch