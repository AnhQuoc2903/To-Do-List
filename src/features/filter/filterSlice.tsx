import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FilterStatus = "all" | "completed" | "incomplete";

const initialState = "all" as FilterStatus;

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterStatus>) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
