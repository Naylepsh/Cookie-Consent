import { createCheckboxSlider } from "../checkbox-slider/checkbox-slider";
import { createButton } from "../button/button";
import { saveCookie } from "../../utils/cookies";
import { wrapInAccordion } from "../accordion/accordion";
import { wrapInModal } from "../modal/modal";
import { addHours } from "../../utils/date";
import "./cookie-popup.css";

let popup;

export const COOKIE_NAME = "acceptedVendorIds";

export const removeCookiePopup = () => {
  if (popup) {
    popup.remove();
  }
};

export const addCookiePopup = ({ vendors, onSubmit }) => {
  popup = createCookiePopup({ vendors, onSubmit });
  document.body.appendChild(popup);
};

const createCookiePopup = ({ vendors, onSubmit }) => {
  const title = createCookiePopupTitle("GDPR Consent");
  const form = createCookiePopupVendorForm({ vendors, onSubmit });

  const container = createCookiePopupContainer();
  container.append(title, form);

  return wrapInModal(container);
};

const createCookiePopupContainer = () => {
  const container = document.createElement("div");
  container.classList.add("container", "cookie-popup");
  return container;
};

const createCookiePopupTitle = (title) => {
  const titleComponent = document.createElement("h2");
  titleComponent.classList.add("cookie-popup-title");
  titleComponent.innerText = title;
  return titleComponent;
};

const createCookiePopupVendorForm = ({ vendors, onSubmit }) => {
  const inputName = "vendors[]";

  const handleSubmit = (event) => {
    saveVendorsInCookie(event, inputName);
    onSubmit();
  };

  const handleReject = () => {
    const inputs = form.elements[inputName];
    for (const input of inputs) {
      input.checked = false;
    }
  };

  const form = document.createElement("form");
  form.addEventListener("submit", (event) => handleSubmit(event, inputName));

  const vendorList = createCookiePopupVendorList({ inputName, vendors });
  const vendorsAccordion = wrapInAccordion({
    title: "Vendor list",
    element: vendorList,
  });

  const [accept, reject] = createCookiePopupFormButtons({
    onReject: handleReject,
  });

  form.append(vendorsAccordion, accept, reject);

  return form;
};

const createCookiePopupVendorList = ({ inputName, vendors }) => {
  const vendorList = document.createElement("ul");
  vendorList.classList.add("vendor-list", "hidden");

  const vendorListItems = Object.values(vendors).map((vendor) => {
    return createCookiePopupVendorListItem({ ...vendor, inputName });
  });

  vendorList.append(...vendorListItems);

  return vendorList;
};

const createCookiePopupVendorListItem = ({
  id,
  name,
  policyUrl,
  inputName,
}) => {
  const nameComponent = document.createElement("p");
  nameComponent.classList.add("vendor-name");
  nameComponent.innerText = name;

  const policyUrlComponent = document.createElement("a");
  policyUrlComponent.href = policyUrl;
  policyUrlComponent.innerText = policyUrl;

  const policyComponent = document.createElement("span");
  policyComponent.innerText = "Policy Url: ";
  policyComponent.appendChild(policyUrlComponent);

  const vendorDetailsComponent = document.createElement("div");
  vendorDetailsComponent.append(nameComponent, policyComponent);

  const slider = createCookiePopupVendorSlider({
    inputName,
    vendorId: id,
    checked: true,
  });
  const sliderWrapper = document.createElement("div");
  sliderWrapper.appendChild(slider);
  sliderWrapper.classList.add("switch-wrapper");

  const vendorComponent = document.createElement("li");
  vendorComponent.append(vendorDetailsComponent, sliderWrapper);

  return vendorComponent;
};

const createCookiePopupVendorSlider = ({ inputName, vendorId, checked }) => {
  const label = document.createElement("label");
  label.classList.add("switch");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = inputName;
  checkbox.checked = !!checked;
  checkbox.dataset.id = vendorId;

  const slider = createCheckboxSlider();

  label.append(checkbox, slider);

  return label;
};

const createCookiePopupFormButtons = ({ onReject }) => {
  const accept = createButton({
    text: "Accept",
    type: "submit",
    classes: ["primary"],
  });
  const reject = createButton({
    text: "Reject",
    type: "submit",
    onClick: onReject,
    classes: ["secondary"],
  });

  return [accept, reject];
};

const saveVendorsInCookie = (event, inputName) => {
  const inputs = event.target.elements[inputName];
  const acceptedVendorIds = Array.from(inputs)
    .filter((input) => input.checked)
    .map((input) => parseInt(input.dataset.id));

  saveCookie(
    COOKIE_NAME,
    JSON.stringify(acceptedVendorIds),
    addHours(new Date(), 24)
  );
};
