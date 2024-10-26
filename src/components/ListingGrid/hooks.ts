import { useEffect, useMemo, useState } from "react";

import { ContentItems } from "../../common/types";
import { useAppSelector } from "../../reducer/hooks";
import { useGetDataQuery } from "../../reducer/slices/api-query/content";
import { searchValue } from "../../reducer/slices/search";
import { EMPTY_SEARCH_RESULTS_ERROR } from "../../utils/constants";
import { searchMovies } from "../../utils/helper";

// Hook to fetch the data for listing
export const useListingData = (pageNumber: number) => {
  const { data, isError, isLoading, isSuccess, error } =
    useGetDataQuery(pageNumber);

  // Selecting the current search value from the Redux store
  // using the custom useAppSelector hook.
  const searchText = useAppSelector(searchValue);

  const [currentListingData, setCurrentListingData] = useState<ContentItems[]>(
    []
  );

  useEffect(() => {
    setCurrentListingData([
      ...currentListingData,
      ...(data?.page["content-items"].content || []),
    ]);
  }, [data]);

  // Memoizing the listing data based on the current search text.
  // If searchText is present, it filters the currentListingData
  // using the searchMovies function; otherwise, it returns
  // the original currentListingData. This optimization helps
  // prevent unnecessary recalculations on re-renders.
  const listingData = useMemo(
    () =>
      searchText
        ? searchMovies(currentListingData, searchText)
        : currentListingData,
    [currentListingData, searchText]
  );

  return {
    data: listingData,
    isError,
    isLoading,
    isSuccess,
    error:
      (!listingData.length && { data: EMPTY_SEARCH_RESULTS_ERROR }) || error,
  };
};
