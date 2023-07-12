
const errors = require("../../misc/errors");
const { createLocation } = require("../../models/auth");



module.exports = (db) => async (req,res,next) =>  {

   const {id_user, ltd, long , name} = req.body
   
   console.log(req.body)

   if (!id_user || !ltd || !long || ! name) return next (errors[400])
   console.log("ha pasado if")

   const response = await createLocation  (await db)(id_user, ltd, long , name);
   console.log(response)

   if(!response.ok) return next (errors[500]);

    res.status(200).json({
        success: true,
    });
};
