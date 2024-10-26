import { useCallback, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../reducer/hooks";
import { searchValue, setSearchValue } from "../../../reducer/slices/search";
import {
  MAX_CHAR_LIMIT_ERROR,
  MAX_SEARCH_CHAR_LIMIT,
  SEARCH_PLACE_HOLDER,
} from "../../../utils/constants";
import { validateSearchText } from "../../../utils/helper";
import { BackButtonImg } from "../../../utils/images";
import { SearchBarProps } from "../types";
import "./styles.scss";

const SearchBox = ({ setIsSearchActive }: SearchBarProps) => {
  // Getting the dispatch function from the app's Redux store
  // to enable dispatching actions within this component.
  const dispatch = useAppDispatch();

  const [showError, setShowError] = useState("");

  // Selecting the current search value from the Redux store
  // using the custom useAppSelector hook.
  const searchText = useAppSelector(searchValue);

  // Callback function to handle the back button action.
  // It deactivates the search, clears any error messages,
  // and resets the search value in the state.
  // Using useCallback for memoization to prevent unnecessary re-renders.
  const backButtonAction = useCallback(() => {
    setIsSearchActive(false);
    setShowError("");
    dispatch(setSearchValue(""));
  }, [dispatch]);

  return (
    <div className="search-container">
      <div className="search-segment">
        <div
          className="button"
          onClick={() => {
            backButtonAction();
          }}
        >
          <img src={BackButtonImg} alt="back" />
        </div>

        <input
          autoFocus={true}
          placeholder={SEARCH_PLACE_HOLDER}
          value={searchText}
          onChange={(e) => {
            const [isValidText, errorMessage] = validateSearchText(
              e.target.value
            );
            if (isValidText) {
              setShowError("");
            } else {
              setShowError(errorMessage);
            }
            if (errorMessage !== MAX_CHAR_LIMIT_ERROR) {
              dispatch(setSearchValue(e.target.value));
            }
          }}
        />
        <div className="character-counter">
          <small>
            {searchText.length}/{MAX_SEARCH_CHAR_LIMIT}
          </small>
        </div>
      </div>
      {showError && <p className="search-error">{showError}</p>}
    </div>
  );
};

export default SearchBox;
