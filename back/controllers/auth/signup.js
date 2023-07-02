
const errors = require('../../misc/errors')
const { hash } = require ('simple-stateless-auth-library')
const { createNewUser } = require('../../models/auth')

module.exports = (db) => async (req,res,next) =>  {

    const {username , password, email }= req.body;

    console.info(username,password, email )

    if(!username || !password) return next (errors[400])

    const encrypted = await hash.encrypt(password)

    const response = await createNewUser (await db)(username,encrypted,email)

    if(!response.ok) return next (errors[500])

    res.status(200).json({
        success: true,
    })
}