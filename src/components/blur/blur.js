import "./blur.css";

let blur;

export const addBlur = () => {
  blur = createBlur();
  document.body.appendChild(blur);
};

const createBlur = () => {
  const blur = document.createElement("div");
  blur.classList.add("blur");
  return blur;
};

export const removeBlur = () => {
  blur.remove();
};
