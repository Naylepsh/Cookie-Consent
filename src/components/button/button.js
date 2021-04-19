export const createButton = ({ text, onClick, type, classes }) => {
  const button = document.createElement("button");
  if (text) button.innerText = text;
  if (type) button.type = type;
  if (onClick) button.addEventListener("click", onClick);
  if (classes) button.classList.add(...classes);
  return button;
};
