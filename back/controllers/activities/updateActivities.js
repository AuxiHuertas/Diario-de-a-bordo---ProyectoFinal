const errors = require("../../misc/errors");
const { updateActivities } = require("../../models/auth");

module.exports = (db) => async (req,res,next) =>  {

   const {id_country,name_activity,date_activity,hour_activity,files} = req.body
   
   console.log(req.body)

   if (!id_country || !name_activity || !date_activity || !hour_activity || !files ) return next (errors[400])
  
    console.log("ha llegado hasta el controller")
   const response = await updateActivities (await db)(id_country,name_activity,date_activity,hour_activity,files);
   console.log(response)

   if(!response.ok) return next (errors[500]);

    res.status(200).json({
        success: true,
    });
};

