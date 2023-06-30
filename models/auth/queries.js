const { sql } = require('slonik')

const insertUser = () => sql.unsafe `
INSERT INTO users (
    username, password, email
) VALUES (
    ${username},${password},${email}
)
`