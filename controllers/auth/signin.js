const { hash } = require('simple-stateless-auth-library')
const errors = require("../../misc/errors");
const { selectByUsername } = require ("../../models/auth")

module.exports = (db) => async (req, res, next) => {
  const { username, password, email } = req.body;

  console.info(">password sin encriptar",username, password, email)

  if (!username || !password || !email) return next(errors[400]); // Esto controla que uno de los campos no viene dado en el body, pero no si está erroneo.

  const response = await selectByUsername(await db)(username, hash.compare(password)) // Con el método compare de la libreria, comparamos la password recibida en el controllador y en la query con la que tenemos, para controlar que sean similares. 

  if (!response.ok) return next (errors[response.error_code || 500]) // Aquí estamos controlando que el username sea igual que en db, es decir, que exista en base de datos y no sera erroneo. 

  res.status(200).json({
    success: true,
  });
};
