const { join } = require('path');

exports.getDonate = (req, res) => {
  res.render(join('main', 'donate'), {
    js: [join('user', 'donateDom')],
    css: [join('user', 'donate'), join('partials', 'homeNav')],
  });
};

exports.postDonate = (request, response) => {
  response.send({ msg: 'donation added sucsesfully' });
};
