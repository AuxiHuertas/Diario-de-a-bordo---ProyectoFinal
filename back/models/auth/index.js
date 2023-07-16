const {
  insertUser,
  selectUser,
  location,
  activity,
  pictures,
  infoUsers,
  deleteLocation,
  deleteActivities,
  deleteImg,
  updateActivity,
} = require("./queries");

const createNewUser = (db) => async (username, password, email) => {
  try {
    await db.query(insertUser(username, password, email));
    return {
      ok: true,
    };
  } catch (error) {
    console.info(">create new user error", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

const selectByUsername = (db) => async (username, compareFn) => {
  try {
    const user = await db.maybeOne(selectUser(username)); // En la query selectUser seleccionamos username y password, (la password aqui está encriptada)
    console.log(">password encriptada", user);

    if (!user)
      return {
        ok: false,
        error_code: "wrong_data",
      };

    const areEqual = await compareFn(user.password); //El password encriptado lo está tomando de la query, por ello utiliza user.
    console.log(">son iguales? ", areEqual);

    if (!areEqual)
      return {
        ok: false,
        error_code: "wrong_data",
      };

    return {
      ok: true,
      content: {
        username: user.username,
        id: user.id,
      },
    };
  } catch (error) {
    console.info(">create new user error", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

const createLocation = (db) => async (id_user, lat, long, name) => {
  try {
    await db.query(location(id_user, lat, long, name));
    return {
      ok: true,
    };
  } catch (error) {
    console.info(">create new country", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

const createActivity =
  (db) =>
  async (id_country, name_activity, date_activity, hour_activity, files) => {
    try {
      await db.query(
        activity(id_country, name_activity, date_activity, hour_activity, files)
      );
      return {
        ok: true,
      };
    } catch (error) {
      console.info(">create new activity", error.message);
      return {
        ok: false,
        message: error.message,
      };
    }
  };

const newImg = (db) => async (id_country, img) => {
  try {
    await db.query(pictures(id_country, img));
    return {
      ok: true,
    };
  } catch (error) {
    console.info("> new img", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

const getUserInfo = (db) => async (username) => {
  try {
    const dbres = await db.query(infoUsers(username));

    return {
      ok: true,
      response: dbres.rows,
    };
  } catch (error) {
    console.info("> info user", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

const deleteCountry = (db) => async (id) => {
  try {
    await db.transaction(async (transaction) => {
      await transaction.query(deleteActivities(id));

      await transaction.query(deleteImg(id));

      await transaction.query(deleteLocation(id));
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.info("> delete ", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

const deleteImgOnly = (db) => async (id) => {
  try {
    await db.query(deleteImg(id));

    return {
      ok: true,
    };
  } catch (error) {
    console.info("> deleteImgOnly ", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

const deleteActOnly = (db) => async (id) => {
  try {
    await db.query(deleteActivities(id));

    return {
      ok: true,
    };
  } catch (error) {
    console.info("> deleteActOnly ", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

const updateActivities = (db) => async (id, name, date, hour, files) => {
  try {
    await db.query(updateActivity(id, name, date, hour, files));

    return {
      ok: true,
    };
  } catch (error) {
    console.info("> updateActOnly ", error.message);
    return {
      ok: false,
      message: error.message,
    };
  }
};

module.exports = {
  createNewUser,
  selectByUsername,
  createLocation,
  createActivity,
  newImg,
  getUserInfo,
  deleteCountry,
  deleteImgOnly,
  deleteActOnly,
  updateActivities
};
