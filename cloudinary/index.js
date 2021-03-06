const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.Cloudinary_name,
  cloud_key: process.env.cloudinary_key,
  cloud_secret: process.env.Cloudinary_secret,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "some-folder-name",
    allowsFormat : ["png","jpg","jpeg"]
  },
});

module.exports = {storage, cloudinary}
