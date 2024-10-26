import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { contentApiSlice } from "./slices/api-query/content";
import { searchSlice } from "./slices/search";

// Combine individual slices into a single root reducer
const rootReducer = combineSlices(contentApiSlice, searchSlice);

// Define the RootState type based on the rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Configure the Redux store with the combined reducer and middleware
export const store = configureStore({
  reducer: rootReducer,
  // Add middleware for RTK Query caching and handling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contentApiSlice.middleware),
});

// Define types for the AppStore and AppDispatch for better type safety
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
