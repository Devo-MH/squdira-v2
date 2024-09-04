const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    console.log('Token:', token);  // Log the token for debugging
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);  // Log the decoded token
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);  // Log the error
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
