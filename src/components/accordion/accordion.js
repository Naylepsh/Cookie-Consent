import { createButton } from "../button/button";
import "./accordion.css";

export const wrapInAccordion = ({ title, element }) => {
  const toggler = createButton({
    classes: ["secondary", "accordion-toggler"],
    text: title,
    onClick: (event) => {
      element.classList.toggle("hidden");
      event.target.classList.toggle("active");
      event.preventDefault();
    },
  });
  const accordion = document.createElement("div");
  element.classList.add("hidden");

  accordion.append(toggler, element);

  return accordion;
};
