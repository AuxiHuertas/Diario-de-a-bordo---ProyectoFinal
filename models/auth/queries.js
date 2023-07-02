const { sql } = require('slonik')


const insertUser = (username,password,email) => sql.unsafe `
INSERT INTO users (
    username, password, email
) VALUES (
    ${username},${password},${email}
)
`

const selectUser = (username) => sql.unsafe `

    SELECT username, password
    FROM users
    WHERE username LIKE ${username};

`
module.exports = {
    insertUser,
    selectUser,
}