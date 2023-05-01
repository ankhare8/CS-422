const admin = require('firebase-admin');

async function verifyToken(req, res, next) {
  const authToken = req.headers.authorization; //bit that goes into postman
  try {
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
    verifyToken
}

// middleware is used in every route - every request then has user auth.