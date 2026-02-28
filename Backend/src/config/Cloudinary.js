const { v2 } = require("cloudinary");
const fs = require("fs");
const uploadonCloudinary = async (filepath) => {
  v2.config({
    cloud_name: "dfqfl4scd",
    api_key: "457249742482826",
    api_secret: "h5cdBxdZC-loKI9LmNCSjNrDL8w",
  });
  try {
    const uploadResult = await v2.uploader.upload(filepath);
    return uploadResult.secure_url;
    fs.unlinkSync(filepath);
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filepath);
    return resizeBy
      .status(500)
      .send({ message: "error on Cloudinary file", success: false });
  }

  //   const optimizeUrl = v2.url("shoes", {
  //     fetch_format: "auto",
  //     quality: "auto",
  //   });

  //   console.log(optimizeUrl);

  //   // Transform the image: auto-crop to square aspect_ratio
  //   const autoCropUrl = cloudinary.url("shoes", {
  //     crop: "auto",
  //     gravity: "auto",
  //     width: 500,
  //     height: 500,
  //   });

  //   console.log(autoCropUrl);
};

module.exports = uploadonCloudinary;
