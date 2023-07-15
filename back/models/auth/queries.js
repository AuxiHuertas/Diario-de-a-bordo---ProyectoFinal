const { sql } = require("slonik");

const insertUser = (username, password, email) => sql.unsafe`
INSERT INTO users (
    username, password, email
) VALUES (
    ${username},${password},${email}
)
`;

const selectUser = (username) => sql.unsafe`

    SELECT username, password, id
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

const pictures = (id_country, img) => sql.unsafe `
INSERT INTO img (
    id_country, img
) VALUES (
    ${id_country}, ${img}
)

`

const infoUsers = (username) => sql.unsafe `
SELECT
  country.id AS country_id,
  country.lat_country,
  country.lng_country,
  country.name AS country_name,
  (
    SELECT JSON_AGG(
      JSON_BUILD_OBJECT(
        'name_activity', activities.name_activity,
        'date_activity', activities.date_activity,
        'hour_activity', activities.hour_activity,
        'files' , activities.files
      )
    )
    FROM activities
    WHERE activities.id_country = country.id
  ) AS activities,
  (
    SELECT JSON_AGG(img.img)
    FROM img
    WHERE img.id_country = country.id
  ) AS images
FROM
  users
INNER JOIN
  country ON users.id = country.id_user
WHERE
   users.username = ${username}
GROUP BY
  country.id, country.lat_country, country.lng_country, country.name;
`


module.exports = {
  insertUser,
  selectUser,
  location,
  activity,
  pictures,
  infoUsers
};
