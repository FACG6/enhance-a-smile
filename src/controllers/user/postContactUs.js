exports.postContactUs = (request, response) => {
  console.log(request.body);
  response.send({ msg: 'done' });
};
