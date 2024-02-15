
const Jimp = require('jimp');

function convertToBadge(inputImagePath, outputImagePath) {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await Jimp.read(inputImagePath);

      // Resize image to 512x512
      image.resize(512, 512);

      // Save the converted image
      await image.writeAsync(outputImagePath);

      resolve(outputImagePath);
    } catch (error) {
      reject(error.message);
    }
  });
}

module.exports = {
  convertToBadge,
};
