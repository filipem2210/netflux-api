const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = async (file, width, height, folder) => {
  const { filename: image } = file;

  const [imageName] = image.split('.');
  const fileName = `${Date.now()}-${imageName}.jpg`;

  await sharp(file.path)
    .resize(width, height)
    .jpeg({ quality: 70 })
    .toFile(
      path.resolve(file.destination, folder, fileName),
    );

  fs.unlinkSync(file.path);

  return fileName;
};
