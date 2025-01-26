export const storeInSession = (key, value) => {
  return sessionStorage.setItem(key, value);
};

export const lookInSession = (key) => {
  return sessionStorage.getItem(key);
};

export const removeInSession = (key) => {
  return sessionStorage.removeItem(key);
};

export const logOutUser = () => {
  sessionStorage.clear();
};
