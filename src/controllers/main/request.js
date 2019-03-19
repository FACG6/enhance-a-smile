exports.request = (req, res) => {
  res.render('main/request', {
    css: ['request'],
    js: ['requestDom'],
  });
};
