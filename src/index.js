import { addBlur, removeBlur } from "./components/blur/blur";
import { disableScrolling, enableScrolling } from "./utils/scrolling";
import { hasCookie } from "./utils/cookies";
import { fetchVendors } from "./utils/fetch";
import {
  COOKIE_NAME,
  addCookiePopup,
  removeCookiePopup,
} from "./components/cookie-popup/cookie-popup";
import "./styles.css";

const setup = async () => {
  if (!hasCookie(COOKIE_NAME)) {
    const { vendors } = await fetchVendors();
    disableScrolling();
    addBlur();
    addCookiePopup({ vendors, onSubmit: teardown });
  }
};

export const teardown = () => {
  removeCookiePopup();
  removeBlur();
  enableScrolling();
};

window.onload = async () => {
  await setup();
};
