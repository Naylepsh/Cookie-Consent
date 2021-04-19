import "./checkbox-slider.css";

export const createCheckboxSlider = () => {
  const span = document.createElement("span");
  span.classList.add("slider", "round");
  return span;
};
