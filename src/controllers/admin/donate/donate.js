const {
  join
} = require('path');
const donates = require('../../../database/queries/admin/getQuery');
const insertOne = require('../../../database/queries/admin/insertOne');

exports.getDonates = (request, response) => {
  donates('donates', {})
    .then((card) => {
      response.render('admin/donates', {
        js: ['domUyils', join('admin', 'donateDom')],
        css: [join('admin', 'donate')],
        layout: 'admin',
        card,
      });
    }).catch(err => console.log(err));
};

exports.postDonates = (request, response) => {
  const {
    id,
    obj,
  } = request.body;
  if (obj.current) {
    insertOne('donates', id, obj)
      .then(() => {
        console.log('response from the the insert query');
        response.send({
          msg: 'sfignsfingisfngoinsfoignsoiffngoi',
        });
      })
      .catch(er => console.log('error from catch database', er));
  } else if (obj.done) {
    insertOne('donates', id, obj)
      .then(res => console.log(res))
      .catch(er => console.log(er))
  }
};


// insertOne('donates', '5c9a33d41825e40420839561', {
//   current: 'current',
// }).then(res => console.log(res)).catch(er => console.log(er));
