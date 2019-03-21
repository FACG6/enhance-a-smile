exports.postRequest = (request, response) => {
  const requestInformation = request.body;
  response.send({ msg: 'Your request added sucsesfully' });
};
