const { DIAGNAL_BASE_URL, DIAGNAL_IMAGE_PATH } = import.meta.env;
import {
  BACK_BUTTON_IMAGE_NAME,
  NAVBAR_IMAGE_NAME,
  PLACEHOLDER_IMAGE_NAME,
  SEARCH_BUTTON_IMAGE_NAME,
} from "./constants";

export const NavbarShadeImg =
  DIAGNAL_BASE_URL + DIAGNAL_IMAGE_PATH + NAVBAR_IMAGE_NAME;
export const BackButtonImg =
  DIAGNAL_BASE_URL + DIAGNAL_IMAGE_PATH + BACK_BUTTON_IMAGE_NAME;
export const SearchButtonImg =
  DIAGNAL_BASE_URL + DIAGNAL_IMAGE_PATH + SEARCH_BUTTON_IMAGE_NAME;
export const PlaceholderForMissingImg =
  DIAGNAL_BASE_URL + DIAGNAL_IMAGE_PATH + PLACEHOLDER_IMAGE_NAME;