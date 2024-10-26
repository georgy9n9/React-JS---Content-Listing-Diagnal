import { ContentItems } from "../common/types";
import {
  MAX_CHAR_LIMIT_ERROR,
  MAX_SEARCH_CHAR_LIMIT,
  MIN_CHAR_LIMIT_ERROR,
  MIN_SEARCH_CHAR_LIMIT,
} from "./constants";

// Validate search text
// Max: 50 characters
// Min: 3 characters
export const validateSearchText = (text: string): [boolean, string] => {
  if (text.length > MAX_SEARCH_CHAR_LIMIT) {
    return [false, MAX_CHAR_LIMIT_ERROR];
  }
  if (text.length < MIN_SEARCH_CHAR_LIMIT) {
    return [false, MIN_CHAR_LIMIT_ERROR];
  }
  return [true, ""];
};

//filter movies content based on search string
export const searchMovies = (
  contentList: ContentItems[],
  searchString: string
) => {
  const searchExp = new RegExp(searchString, "i");
  const filteredMovies = contentList.filter(({ name }) => searchExp.test(name));
  return filteredMovies;
};
