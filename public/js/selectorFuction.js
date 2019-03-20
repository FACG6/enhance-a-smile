const querySelectors = (selectorsName, enterTypeofQuery) => {
  if (selectorsName.length !== enterTypeofQuery.length) return false;
  const elements = {};
  enterTypeofQuery.map(
    (e, i) => {
      elements[selectorsName[i]] = document.querySelector(e);
      return '';
    },
  );
  return elements;
};

if (typeof module !== 'undefined') {
  module.exports = querySelectors;
}
