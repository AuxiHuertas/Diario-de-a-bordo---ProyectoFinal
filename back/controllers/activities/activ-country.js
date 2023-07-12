
const errors = require("../../misc/errors");
const { createActivity } = require("../../models/auth");



module.exports = (db) => async (req,res,next) =>  {

   const {id_country, name_activity, date_activity, hour_activity} = req.body
   
   console.log(req.body)

   if (!id_country || !name_activity|| !date_activity || !hour_activity) return next (errors[400])
   

   const response = await createActivity  (await db)(id_country, name_activity, date_activity, hour_activity);

   console.log(response)

   if(!response.ok) return next (errors[500]);

    res.status(200).json({
        success: true,
    });
};
