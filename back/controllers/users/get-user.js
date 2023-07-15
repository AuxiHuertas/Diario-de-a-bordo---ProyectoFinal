const errors = require("../../misc/errors");
const { getUserInfo } = require("../../models/auth");

module.exports = (db) => async (req, res, next) => {
  const { username, id } = res.locals;

  if (!username) return next(errors[400]);

  const response = await getUserInfo(await db)(username);
  console.log(response);

  res.status(200).json({
    success: true,
    data: {
      username, id,
      response,
    },
  });
};
