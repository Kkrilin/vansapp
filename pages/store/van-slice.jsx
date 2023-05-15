import { createSlice } from "@reduxjs/toolkit";

const vanState = {
  vansData: [],
  filterData: [],
};

const vanSlice = createSlice({
  name: "showVans",
  initialState: vanState,
  reducers: {
    updateState(state, action) {
      state.vansData = action.payload;
      state.filterData = action.payload;
    },
    filterVans(state, action) {
      state.filterData = state.vansData.filter(
        (van) => van.type === action.payload
      );
    },
  },
});

export const vanActions = vanSlice.actions;

export default vanSlice.reducer;
