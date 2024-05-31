const jwt = require('jsonwebtoken');
const tokenSecret = process.env.TOKEN_SECRET;
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Assuming the token is sent as a Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, tokenSecret);
    req.medic = decoded; // Attach the decoded payload to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
