
const Jimp = require('jimp');
const pixelmatch = require('pixelmatch');

function validateBadge(imagePath) {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await Jimp.read(imagePath);

      // Check size
      if (image.bitmap.width !== 512 || image.bitmap.height !== 512) {
        throw new Error('Invalid image size. Must be 512x512.');
      }

      // Check transparency
      const isCircle = validateCircle(image);
      if (!isCircle) {
        throw new Error('Non-transparent pixels must be within a circle.');
      }

      // Check happy colors
      const isHappyColor = validateHappyColors(image);
      if (!isHappyColor) {
        throw new Error('Image colors do not give a "happy" feeling.');
      }

      resolve(true);
    } catch (error) {
      reject(error.message);
    }
  });
}

module.exports = {
  validateBadge,
};
