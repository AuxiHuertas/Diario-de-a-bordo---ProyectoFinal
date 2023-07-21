const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'ds6kuyqqv', 
    api_key: '353575967114277', 
    api_secret: 'nWjld3E1jKfuw0pqdkViApVf6o4' 
  });

  module.exports = cloudinary;