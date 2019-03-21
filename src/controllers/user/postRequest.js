const { insertRequest } = require('../../database/queries/user/addRequest');

exports.postRequest = (request, response) => {
  const requestInformation = request.body;
  insertRequest(requestInformation).then(re => console.log(re)).catch(re => console.log(re));


  response.send({ msg: 'Your request added sucsesfully' });
};
