import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if Authorization header is present and correctly formatted
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  // Extract the token from the Bearer header
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach the decoded user to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token has expired' });
    }
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Export the middleware using ES module syntax
export default authMiddleware;
