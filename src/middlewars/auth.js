const checkCookie = require('./../utillity/checkCookie.js');

module.exports = (req, res, next) => {
  if (!req.cookies) res.redirect('/admin/login');
  else if (!req.cookies.jwt) res.redirect('/admin/login');
  else {
    checkCookie(req.cookies.jwt)
      .then((payload) => {
        req.token = { email: payload.email, name: req.cookies.name };
        next();
      })
      .catch(() => {
        res.clearCookie('jwt');
        res.redirect('/admin/login');
      });
  }
};
