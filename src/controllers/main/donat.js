exports.donate = (req, res) => {
  res.render('main/donate', {
    js: ['donateDom'],
    css: ['donate'],
  });
};
