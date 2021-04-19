export const disableScrolling = () => {
  document.body.classList.add("disable-scroll");
};

export const enableScrolling = () => {
  document.body.classList.remove("disable-scroll");
};
