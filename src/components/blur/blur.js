import "./blur.css";

export const addBlur = () => {
  for (const child of document.body.children) {
    child.classList.add("blur");
  }
};

export const removeBlur = () => {
  for (const child of document.body.children) {
    child.classList.remove("blur");
  }
};
