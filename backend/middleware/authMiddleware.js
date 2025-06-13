const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.cookies.Token;
  if (!token) {
    return res.json('The token not found');
  }
  // const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      return res.json('The token is invalid');
    }
    req.email = decode.email;
    req.username = decode.username;
    next();
  });
};

module.exports = verifyUser;
