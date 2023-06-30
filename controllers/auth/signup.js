const errors = require('../../misc/errors')

module.exports = (db) => async (req,res,next) =>  {

    const {username , password}= req.body;

    console.info(username,password)

    if(!username || !password) return next(errors[400])

    res.status(200).json({
        success: true,
    })
}