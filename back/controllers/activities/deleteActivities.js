const errors = require("../../misc/errors");
const { deleteActOnly } = require("../../models/auth");

module.exports = (db) => async (req,res,next) =>  {

   const {id} = req.body
   
   console.log(req.body)

   if (!id ) return next (errors[400])
  

   const response = await deleteActOnly (await db)(id);
   console.log(response)

   if(!response.ok) return next (errors[500]);

    res.status(200).json({
        success: true,
    });
};

