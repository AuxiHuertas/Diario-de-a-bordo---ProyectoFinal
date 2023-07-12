const { sql } = require("slonik");

const insertUser = (username, password, email) => sql.unsafe`
INSERT INTO users (
    username, password, email
) VALUES (
    ${username},${password},${email}
)
`;

const selectUser = (username) => sql.unsafe`

    SELECT username, password
    FROM users
    WHERE username LIKE ${username};

`;

const location = (id_user, lat, long, name) => sql.unsafe`

INSERT INTO country ( 
   id_user, lat_country, lng_country, name
    ) VALUES (
        ${id_user},${lat}, ${long},${name}
    )
`;

const activity = (id_country, name_activity, date_activity, hour_activity, files) => sql.unsafe `
INSERT INTO activities(
    id_country, name_activity, date_activity, hour_activity, files
) VALUES (
    ${id_country}, ${name_activity}, ${date_activity}, ${hour_activity},${files}
)

`


module.exports = {
  insertUser,
  selectUser,
  location,
  activity,
};
