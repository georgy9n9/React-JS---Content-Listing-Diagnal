import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Data } from "../../types";

// Creating a slice of the API for handling data fetching and caching
export const contentApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.DIAGNAL_BASE_URL }), // Set the base URL for API requests
  reducerPath: "dataApi", // Unique key for the slice in the Redux store
  tagTypes: ["Data"], // Define tag types for caching and invalidation
  endpoints: (builder) => ({
    // Define an endpoint for fetching data, caching based on the page number
    getData: builder.query<Data, number>({
      query: (pageNo = 1) => `/data/page${pageNo}.json`, // Construct the API endpoint with the page number
      providesTags: (_result, _error, id) => [{ type: "Data", id }], // Tags for invalidating cached data
    }),
  }),
});

// Export the generated hook for querying the data
export const { useGetDataQuery } = contentApiSlice;
