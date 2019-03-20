// eslint-disable-next-line no-unused-vars
const querySelectors = (selectorsName, enterTypeofQuery) => {
  if (selectorsName.length !== enterTypeofQuery.length) return false;
  const elements = {};
  enterTypeofQuery.map((e, i) => {
    elements[selectorsName[i]] = document.querySelector(e);
    return '';
  });
  return elements;
};
