exports.client = (req, res) => {
  res.status(404).render('error', {
    errorStatus: 404,
    errorMsg: 'Page Not Found',
    css: ['error'],
    js: ['error'],
    layout: 'error',
  });
};

exports.server = (req, res) => {
  res.status(500).render('error', {
    errorStatus: 500,
    errorMsg: 'Internal Server Error',
    css: ['error'],
    js: ['error'],
    layout: 'error',
  });
};
