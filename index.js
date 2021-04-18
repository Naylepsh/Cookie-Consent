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
const addCookiePopup = () => {
  disableScrolling();
};

const removeCookiePopup = () => {
  enableScrolling();
};

window.onload = () => {
  addBlur();
  addCookiePopup();
  setTimeout(() => {
    removeBlur(), enableScrolling();
  }, 5000);
};
