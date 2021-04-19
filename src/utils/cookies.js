export const saveCookie = (key, value, expiresIn) => {
  document.cookie = `${key}=${value}; expires=${expiresIn}`;
};

export const hasCookie = (key) => {
  return document.cookie
    .split(";")
    .some((item) => item.trim().startsWith(`${key}=`));
};
