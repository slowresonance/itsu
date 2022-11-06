export const getItemFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const saveItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
