/*import jwt from 'jsonwebtoken';

export function createToken(name) {
    return jwt.sign(
        {
            id: Math.random(),
            name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h'
        },
    );
}

export function ensureTokenIsValid(token) {
    if(!token) {
        throw new Error('There is no token');
    }

    jwt.verify(token, process.env.JWT_SECRET, { complete: true });
}*/

import jwt from 'jsonwebtoken';

// Crear el token con los datos del usuario
export function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
}

// Verificar el token
export function ensureTokenIsValid(token) {
  if (!token) {
    throw new Error('There is no token');
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}
