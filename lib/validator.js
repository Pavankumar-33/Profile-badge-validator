
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

function validateCircle(image) {
  return new Promise((resolve, reject) => {
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY);

    // Iterate through each pixel and check if it is outside the circle
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

        if (distance > radius && image.getPixelColor(x, y) !== 0) {
          reject('Non-transparent pixels must be within a circle.');
          return;
        }
      }
    }

    resolve(true);
  });
}

function validateHappyColors(image) {
  return new Promise((resolve, reject) => {
    const width = image.bitmap.width;
    const height = image.bitmap.height;

    // Thresholds for happy colors (adjust these based on your definition)
    const redThreshold = 150;
    const greenThreshold = 150;
    const blueThreshold = 150;

    // Iterate through each pixel and check for happy colors
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const pixelColor = Jimp.intToRGBA(image.getPixelColor(x, y));

        if (
          pixelColor.r > redThreshold &&
          pixelColor.g > greenThreshold &&
          pixelColor.b > blueThreshold
        ) {
          // Pixel has a significant amount of red, green, and blue, considered "happy"
          continue;
        } else if (pixelColor.a !== 0) {
          // Non-transparent pixel does not meet happy color criteria
          reject('Image colors do not give a "happy" feeling.');
          return;
        }
      }
    }

    resolve(true);
  });
}

module.exports = {
  validateBadge,
  validateHappyColors,
};
