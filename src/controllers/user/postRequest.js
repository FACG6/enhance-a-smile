const insertQuery = require('../../database/queries/user/insertQuery');

exports.postRequest = (request, response) => {
  const requestInformation = request.body;
  insertQuery('requests', requestInformation).then(re => console.log(re)).catch(re => console.log(re));


  response.send({ msg: 'Your request added sucsesfully' });
};
