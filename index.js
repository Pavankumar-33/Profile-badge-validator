
const { validateBadge } = require('./lib/validator');
const { convertToBadge } = require('./lib/converter');

const imagePath = 'publicFiles/uploads/transparent-spider-man.png';

validateBadge(imagePath)
  .then(() => console.log('Badge validation successful!'))
  .catch((error) => console.error('Badge validation failed:', error));

// Example of image conversion
const outputImagePath = 'public/uploads/converted_badge.png';

convertToBadge(imagePath, outputImagePath)
  .then(() => console.log('Image converted successfully!'))
  .catch((error) => console.error('Image conversion failed:', error));
