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

const addCookiePopup = (vendors) => {
  popup = createCookiePopup(vendors);
  document.body.appendChild(popup);
};

const createCookiePopup = (vendors) => {
  const container = createCookiePopupContainer();

  const title = createCookieTitle("GDPR Consent");
  const form = createCookiePopupVendorForm(vendors);
  container.append(title, form);

  return wrapInModal(container);
};

const createCookiePopupContainer = () => {
  const container = document.createElement("div");
  container.classList.add("container", "cookie-popup");
  return container;
};

const createCookieTitle = (title) => {
  const titleComponent = document.createElement("p");
  titleComponent.classList.add("cookie-pop-up-title");
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
  form.append(...vendorList);

  const [accept, reject] = createCookiePopupFormButtons({
    onReject: handleReject,
  });
  form.append(accept, reject);

  return form;
};

const saveVendorsInCookie = (event, inputName) => {
  const inputs = event.target.elements[inputName];
  const values = Array.from(inputs)
    .filter((input) => input.checked)
    .map((input) => ({
      value: input.checked,
      id: parseInt(input.dataset.id),
    }));
  console.log({ values });
};

const createCookiePopupVendorList = ({ inputName, vendors }) => {
  const vendorComponents = Object.values(vendors).map((vendor) =>
    createCookiePopupVendor({ ...vendor, inputName })
  );
  return vendorComponents;
};

const createCookiePopupVendor = ({ id, name, policyUrl, inputName }) => {
  const vendorComponent = document.createElement("li");

  const nameComponent = document.createElement("p");
  nameComponent.innerText = name;

  const policyUrlComponent = document.createElement("p");
  policyUrlComponent.innerText = policyUrl;

  const slider = createCookiePopupVendorSlider({ inputName, vendorId: id });

  vendorComponent.append(nameComponent, policyUrlComponent, slider);

  return vendorComponent;
};

const createCookiePopupVendorSlider = ({ inputName, vendorId }) => {
  const label = document.createElement("label");
  label.classList.add("switch");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = inputName;
  checkbox.dataset.id = vendorId;

  const slider = createCheckboxSlider();

  label.append(checkbox, slider);

  return label;
};

const createCheckboxSlider = () => {
  const span = document.createElement("span");
  span.classList.add("slider", "round");
  return span;
};

const createCookiePopupFormButtons = ({ onReject }) => {
  const accept = createButton({ text: "Accept" });
  const reject = createButton({ text: "Reject", onClick: onReject });

  return [accept, reject];
};

const createButton = ({ text, onClick, type }) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.type = type;
  button.addEventListener("click", onClick);
  return button;
};

const removeCookiePopup = () => {
  if (popup) {
    popup.remove();
  }
};

/**
 * MODAL
 */
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

const setup = async () => {
  const { vendors } = await fetchVendors();
  disableScrolling();
  addBlur();
  addCookiePopup(vendors);
};

const teardown = () => {
  removeCookiePopup();
  removeBlur();
  enableScrolling();
};

/**
 * FETCHING VENDORS
 */
const fetchVendors = async () => {
  const url = "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json";
  const response = await fetch(url);
  return response.json();
};

window.onload = async () => {
  await setup();
};
