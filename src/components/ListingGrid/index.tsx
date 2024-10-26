import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Loader from "../../common/components/Loader";
import { useAppSelector } from "../../reducer/hooks";
import { searchValue } from "../../reducer/slices/search";
import { TOTAL_NUMBER_OF_PAGES } from "../../utils/constants";
import Card from "./Card";
import { useListingData } from "./hooks";
import "./styles.scss";

const ListingGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Selecting the current search value from the Redux store
  // using the custom useAppSelector hook.
  const searchText = useAppSelector(searchValue);

  const { data, isError, isLoading, isSuccess, error } =
    useListingData(currentPage);

  return (
    <>
      {isLoading && <Loader />}
      <InfiniteScroll
        dataLength={data.length}
        loader={<></>}
        next={() => {
          setCurrentPage(currentPage + 1);
        }}
        hasMore={currentPage !== TOTAL_NUMBER_OF_PAGES && !searchText}
        className="listing-grid-container"
        scrollThreshold="400px"
      >
        {isSuccess &&
          data.map(({ name, "poster-image": posterImage }, index: number) => {
            return (
              <Card
                key={`card_${index}`}
                titleText={name}
                imageName={posterImage}
              />
            );
          })}
      </InfiniteScroll>
      {/* Search results error */}
      {!isError && !data.length && error && "data" in error && (
        <div className="search-result-error">{error.data as string}</div>
      )}
      {/* Fetch Query Error */}
      {isError && error && "status" in error && (
        <div className="load-error">
          {error.status} {JSON.stringify(error.data)}
        </div>
      )}
    </>
  );
};

export default ListingGrid;
