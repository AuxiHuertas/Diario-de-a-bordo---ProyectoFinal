const e = require("express")
const { insertUser } = require("./queries")

const createNewUser = (db) => async (username,password,email) => {
    try{
        await db.query(insertUser(username,password,email))
        return {
            ok :true
        }
    }
    
    catch (error){
        console.info(">create new user error", error.message)
        return {
            ok:false,
            message: error.message,
        }
    }
}

module.export = {
    createNewUser,
}