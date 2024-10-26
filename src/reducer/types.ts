import { ContentItems } from "../common/types";

interface Page {
  title: string;
  "total-content-items": string;
  "page-num-requested": string;
  "page-size-requested": string;
  "page-size-returned": string;
  "content-items": {
    content: ContentItems[];
  };
}
export interface Data {
  page: Page;
}
