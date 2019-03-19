exports.postRegisterEmail = (request, response) => {
  console.log(request.body);
  response.send({ msg: 'done' });
};
