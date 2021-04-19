import "./styles.css";

/**
 * BLUR
 */
let blur;

const addBlur = () => {
  blur = createBlur();
  document.body.appendChild(blur);
};

const createBlur = () => {
  const blur = document.createElement("div");
  blur.classList.add("blur");
  return blur;
};

const removeBlur = () => {
  blur.remove();
};

/**
 * SCROLLING
 */
const disableScrolling = () => {
  document.body.classList.add("disable-scroll");
};

const enableScrolling = () => {
  document.body.classList.remove("disable-scroll");
};

/**
 * COOKIE POPUP
 */
let popup;
const COOKIE_NAME = "acceptedVendorIds";

const addCookiePopup = (vendors) => {
  popup = createCookiePopup(vendors);
  document.body.appendChild(popup);
};

const createCookiePopup = (vendors) => {
  const container = createCookiePopupContainer();

  const title = createCookiePopupTitle("GDPR Consent");
  const form = createCookiePopupVendorForm(vendors);
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

const createCookiePopupVendorForm = (vendors) => {
  const inputName = "vendors[]";

  const handleSubmit = (event) => {
    saveVendorsInCookie(event, inputName);
    teardown();
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

const removeCookiePopup = () => {
  if (popup) {
    popup.remove();
  }
};

/**
 * COMPONENTS
 */
const createCheckboxSlider = () => {
  const span = document.createElement("span");
  span.classList.add("slider", "round");
  return span;
};

const createButton = ({ text, onClick, type, classes }) => {
  const button = document.createElement("button");
  if (text) button.innerText = text;
  if (type) button.type = type;
  if (onClick) button.addEventListener("click", onClick);
  if (classes) button.classList.add(...classes);
  return button;
};

const wrapInAccordion = ({ title, element }) => {
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

const wrapInModal = (element) => {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  modalBody.append(element);
  modalDialog.append(modalBody);
  modal.append(modalDialog);

  return modal;
};

/**
 * COOKIE UTILS
 */
const saveCookie = (key, value, expiresIn) => {
  document.cookie = `${key}=${value}; expires=${expiresIn}`;
};

const hasCookie = (key) => {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith(`${key}=`));
};

/**
 * FETCHING VENDORS
 */
const fetchVendors = async () => {
  const url = "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json";
  const response = await fetch(url);
  return response.json();
};

/**
 * Misc. utilities
 */
const addHours = (date, hours) => {
  const copy = new Date(date);
  copy.setTime(copy.getTime() + hours * 60 * 60 * 1000);
  return copy;
};

const setup = async () => {
  if (!hasCookie(COOKIE_NAME)) {
    const { vendors } = await fetchVendors();
    disableScrolling();
    addBlur();
    addCookiePopup(vendors);
  }
};

const teardown = () => {
  removeCookiePopup();
  removeBlur();
  enableScrolling();
};

window.onload = async () => {
  await setup();
};
