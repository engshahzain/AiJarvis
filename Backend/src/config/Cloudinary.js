const { v2 } = require("cloudinary");
const uploadonCloudinary = async (filepath) => {
  v2.config({
    cloud_name: "dfqfl4scd",
    api_key: "457249742482826",
    api_secret: "h5cdBxdZC-loKI9LmNCSjNrDL8w",
  });
  try {
    const uploadResult = await v2.uploader.upload(filepath).catch((error) => {
      console.log(error);
    });
    console.log(uploadResult); // Optimize delivery by resizing and applying auto-format and auto-quality
  } catch (error) {
    console.log(error);
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
