import { configureStore } from "@reduxjs/toolkit";
import vanReducer from "./van-slice";

const store = configureStore({
  reducer: { vans: vanReducer },
});

export default store;
