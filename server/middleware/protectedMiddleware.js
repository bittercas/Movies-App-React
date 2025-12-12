import jwt from 'jsonwebtoken';

const protectRoutes = (req, res, next) => {
    const headerAuthorized = req.headers.authorization;

    if (!headerAuthorized || !headerAuthorized.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = headerAuthorized.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guarda los datos del usuario para usar después
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default protectRoutes;