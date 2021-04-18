// SCROLLING WITH CSS
const disableScrolling = () => {
  document.body.classList.add("disable-scroll");
};

const enableScrolling = () => {
  document.body.classList.remove("disable-scroll");
};

/**
 * 
body.disable-scroll {
  overflow: hidden;
}
 */
