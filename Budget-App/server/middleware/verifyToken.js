const admin = require('firebase-admin');

async function verifyToken(req, res, next) {
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] == "Bearer"){
    const authToken = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(authToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: 'Invalid Bearer Token' });
    }
  } else{
    return res.status(401).json({ error: 'Missing Bearer Token' });
  }
  
}

module.exports = verifyToken
