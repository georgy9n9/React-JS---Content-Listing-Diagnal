import { useMemo } from "react";

import HighlightedText from "../../../common/components/SearchText";
import { useAppSelector } from "../../../reducer/hooks";
import { searchValue } from "../../../reducer/slices/search";
import { PlaceholderForMissingImg } from "../../../utils/images";
import { CardProps } from "../types";

const { DIAGNAL_BASE_URL, DIAGNAL_IMAGE_PATH } = import.meta.env;

const Card = ({ titleText, imageName }: CardProps) => {
  // Memoizing the image URL to construct it based on the image name.
  // This ensures that the URL is only recalculated when the imageName changes,
  // improving performance by avoiding unnecessary recalculations on re-renders.
  const imageUrl = useMemo(
    () => DIAGNAL_BASE_URL + DIAGNAL_IMAGE_PATH + imageName,
    [imageName]
  );
  
  // Selecting the current search value from the Redux store
  // using the custom useAppSelector hook.
  const searchText = useAppSelector(searchValue);

  return (
    <div className="card-container">
      <img
        src={imageUrl}
        onError={(e: any) => {
          e.target.src = PlaceholderForMissingImg;
        }}
        alt={`${imageUrl}`}
      />
      <div className="title-text">
        <HighlightedText text={titleText} matchingText={searchText} />
      </div>
    </div>
  );
};

export default Card;
