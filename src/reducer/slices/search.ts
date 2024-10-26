import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Interface defining the state structure for the search slice
export interface SearchSliceState {
  value: string; // The current search value
}

// Initial state for the search slice
const initialState: SearchSliceState = {
  value: "",
};

// Creating the search slice with reducers and selectors
export const searchSlice = createSlice({
  name: "search", // Name of the slice
  initialState,
  reducers: (create) => ({
    // Reducer to update the search value in the state
    setSearchValue: create.reducer((state, action: PayloadAction<string>) => {
      state.value = action.payload; // Update the state with the new search value
    }),
  }),
  // Selectors to access the search state
  selectors: {
    searchValue: (search) => search.value, // Selector to get the current search value
  },
});

// Exporting the action for updating the search value
export const { setSearchValue } = searchSlice.actions;
// Exporting the selector for accessing the search value
export const { searchValue } = searchSlice.selectors;
