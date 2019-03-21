const { join } = require('path');
const insertHelpOther = require('./../../database/queries/user/addHelpOthers.js');

exports.get = (req, res) => {
  res.render(join('main', 'helpOthers'), {
    js: ['domUyils', join('user', 'helpOthers')],
    css: [join('partials', 'homeNav'), join('user', 'helpOthers')],
  });
};

exports.post = (req, res) => {
  insertHelpOther(req.body)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).end();
    });
};
