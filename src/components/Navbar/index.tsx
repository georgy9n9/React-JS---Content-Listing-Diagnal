import { Suspense, lazy, useState } from "react";

import Loader from "../../common/components/Loader";
import { useGetDataQuery } from "../../reducer/slices/api-query/content";
import { INITIAL_PAGE } from "../../utils/constants";
import { SearchButtonImg } from "../../utils/images";
import "./styles.scss";

// Loading lazily because this component isn't rendered right away.
const SearchBox = lazy(() => import("./SearchBox"));

const Navbar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  // The query can be reused here because the API call is cached.
  // Default value for "data" is set to { page: {} } in case it is undefined.
  const {
    data: { page: { title: pageHeader } } = { page: {} },
    error,
    isError,
  } = useGetDataQuery(INITIAL_PAGE);

  return (
    <div className="navbar">
      <div>
        {!isSearchActive ? (
          <div className="button-container">
            <div className="header-text">{pageHeader}</div>
            <div
              className="button"
              onClick={() => {
                setIsSearchActive(true);
              }}
            >
              <img src={SearchButtonImg} alt="search" />
            </div>
          </div>
        ) : (
          <Suspense fallback={<Loader />}>
            <SearchBox setIsSearchActive={setIsSearchActive} />
          </Suspense>
        )}
      </div>
      {isError && error && "status" in error && (
        <div className="load-error">
          {error.status} {JSON.stringify(error.data)}
        </div>
      )}
    </div>
  );
};

export default Navbar;
