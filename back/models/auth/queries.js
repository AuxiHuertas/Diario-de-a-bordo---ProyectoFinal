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


module.exports = {
  insertUser,
  selectUser,
  location,
};
