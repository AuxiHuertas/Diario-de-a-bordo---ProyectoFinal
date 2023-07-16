const errors = require("../../misc/errors");
const { updateMarket } = require("../../models/auth");

module.exports = (db) => async (req,res,next) =>  {

   const {id, ltd, long , name} = req.body
   
   console.log(req.body)

   if (!id || !ltd || !long || ! name) return next (errors[400])
  

   const response = await updateMarket (await db)(id, ltd, long , name);
   console.log(response)

   if(!response.ok) return next (errors[500]);

    res.status(200).json({
        success: true,
    });
};