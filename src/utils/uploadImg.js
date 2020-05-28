const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = async (file, resize, folder) => {
  const { filename: avatar } = file;

  const [imgName] = avatar.split('.');
  const fileName = `${Date.now()}-${imgName}.jpg`;

  await sharp(file.path)
    .resize(resize)
    .jpeg({ quality: 70 })
    .toFile(
      path.resolve(file.destination, folder, fileName),
    );

  fs.unlinkSync(file.path);

  return fileName;
};
