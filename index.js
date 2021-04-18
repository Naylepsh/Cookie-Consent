let blur;

/**
 * BLUR
 */
const addBlur = () => {
  blur = document.createElement("div");
  blur.classList.add("blur");
  document.body.appendChild(blur);
};

const removeBlur = () => {
  blur.remove();
};

/**
 * SCROLLING
 */
const disableScrolling = () => {
  const x = window.scrollX;
  const y = window.scrollY;
  window.onscroll = () => window.scrollTo(x, y);
};

const enableScrolling = () => {
  window.onscroll = () => {};
};

/**
 * COOKIE POPUP
 */
let popup;

const addCookiePopup = () => {
  disableScrolling();
  popup = createCookiePopup();
  document.body.appendChild(popup);
};

const createCookiePopup = () => {
  const popup = document.createElement("div");
  popup.classList.add("cookie-pop-up");

  const container = createCookiePopupContainer();
  const title = createCookieTitle("Sample Title");

  container.appendChild(title);
  popup.appendChild(container);

  return popup;
};

const createCookiePopupContainer = () => {
  const container = document.createElement("div");
  container.classList.add("cookie-pop-up-container");
  return container;
};

const createCookieTitle = (title) => {
  const titleComponent = document.createElement("p");
  titleComponent.innerText = title;
  return titleComponent;
};

const removeCookiePopup = () => {
  enableScrolling();
  popup.remove();
};

window.onload = () => {
  addBlur();
  addCookiePopup();
  // setTimeout(() => {
  //   removeBlur(), removeCookiePopup();
  // }, 5000);
};
