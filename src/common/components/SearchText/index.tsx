import { Fragment } from "react";
import { HightlightTextProps } from "../../types";

const HighlightedText = ({ text, matchingText }: HightlightTextProps) => {
  const matchRegex = RegExp(matchingText, "ig");

  //Matches array needed to ensure the correct letter casing is maintained.
  const matches = [...text.matchAll(matchRegex)];

  return text.split(matchRegex).map((nonBoldText, index, arr) => (
    <Fragment key={index}>
      {nonBoldText}
      {index + 1 !== arr.length && <mark>{matches[index]}</mark>}
    </Fragment>
  ));
};

export default HighlightedText;
