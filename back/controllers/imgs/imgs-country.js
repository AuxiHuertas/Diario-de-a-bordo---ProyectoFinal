
const errors = require("../../misc/errors");
const { newImg } = require("../../models/auth");



module.exports = (db) => async (req,res,next) =>  {

   const {id_country, img} = req.body
   
   console.log(req.body)

   if (!id_country) return next (errors[400])

   const response = await newImg  (await db)(id_country,img);

   console.log(response)

   if(!response.ok) return next (errors[500]);

    res.status(200).json({
        success: true,
    });
};
