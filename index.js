const addBlur = () => {
  const div = document.createElement("div");
  div.classList.add("blur");
  document.body.appendChild(div);
};

window.onload = () => {
  addBlur();
};
