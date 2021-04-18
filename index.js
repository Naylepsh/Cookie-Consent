let blur;

/**
 * BLUR
 */
const addBlur = () => {
  blur = document.createElement("div");
  blur.classList.add("blur");
  document.body.appendChild(blur);
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

const addCookiePopup = async () => {
  disableScrolling();
  popup = await createCookiePopup();
  document.body.appendChild(popup);
};

const createCookiePopup = async () => {
  const container = createCookiePopupContainer();
  const title = createCookieTitle("GDPR Consent");
  container.appendChild(title);

  const vendorList = await createCookiePopupVendorList();
  container.append(...vendorList);

  const [accept, reject] = createCookiePopupFormButtons();
  container.append(accept, reject);

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

const createCookiePopupVendorList = async () => {
  const { vendors } = await fetchVendors();
  const vendorComponents = Object.values(vendors).map(createCookiePopupVendor);
  return vendorComponents;
};

const createCookiePopupVendor = ({ name, policyUrl }) => {
  const vendorComponent = document.createElement("li");

  const nameComponent = document.createElement("p");
  nameComponent.innerText = name;

  const policyUrlComponent = document.createElement("p");
  policyUrlComponent.innerText = policyUrl;

  const slider = createCookiePopupVendorSlider();

  vendorComponent.append(nameComponent, policyUrlComponent, slider);

  return vendorComponent;
};

const createCookiePopupVendorSlider = () => {
  const label = document.createElement("label");
  label.classList.add("switch");

  const input = document.createElement("input");
  input.type = "checkbox";

  const span = document.createElement("span");
  span.classList.add("slider", "round");

  label.append(input, span);

  return label;
};

const createCookiePopupFormButtons = () => {
  const accept = createCookiePopupFormAcceptButton();
  const reject = createCookiePopupFormRejectButton();

  return [accept, reject];
};

const createCookiePopupFormAcceptButton = () => {
  const onClick = () => {
    removeBlur();
    removeCookiePopup();
  };
  return createButton({ text: "Accept", onClick });
};

const createCookiePopupFormRejectButton = () => {
  const onClick = () => {
    removeBlur();
    removeCookiePopup();
  };
  return createButton({ text: "Reject", onClick });
};

const createButton = ({ text, onClick }) => {
  const button = document.createElement("button");
  button.innerText = text;
  button.addEventListener("click", onClick);
  return button;
};

const removeCookiePopup = () => {
  enableScrolling();
  popup.remove();
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

/**
 * FETCHING VENDORS
 */
const fetchVendors = async () => {
  const url = "https://optad360.mgr.consensu.org/cmp/v2/vendor-list.json";
  const response = await fetch(url);
  return response.json();
};

window.onload = async () => {
  addBlur();
  await addCookiePopup();
};
