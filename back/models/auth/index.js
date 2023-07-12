
const { insertUser, selectUser, location } = require("./queries")


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

const selectByUsername = (db) => async (username,compareFn) => {
    try{
        const user = await db.maybeOne(selectUser(username)) // En la query selectUser seleccionamos username y password, (la password aqui está encriptada)
        console.log(">password encriptada", user)

        if(!user) return {
            ok: false,
            error_code : 'wrong_data'
        }

        
        const areEqual = await compareFn(user.password) //El password encriptado lo está tomando de la query, por ello utiliza user. 
        console.log(">son iguales? ", areEqual)

        if(!areEqual) return {
            ok: false,
            error_code : 'wrong_data'
        }

        return {
            ok :true,
            content : {
                username: user.username
            }
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

const createLocation = (db) => async (id_user, lat,long,name) => {
    try{
        await db.query(location(id_user, lat,long,name))
        return {
            ok :true
        }
    }
    
    catch (error){
        console.info(">create new country", error.message)
        return {
            ok:false,
            message: error.message,
        }
    }
}

module.exports = {
    createNewUser,
    selectByUsername,
    createLocation,
}