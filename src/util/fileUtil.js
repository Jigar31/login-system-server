const fs = require("fs");
const util = require("util");
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

async function moveProfilePicture(oldPath, newPath, profilePicture) {
  await mkdir(newPath, { recursive: true });
  await moveFile(oldPath, newPath + "/" + profilePicture);
}

async function moveFile(oldPath, newPath) {
  try {
    let data = await readFile(oldPath);
    await writeFile(newPath, data);
    await unlink(oldPath);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function saveProfilePicture(oldPath, newPath) {
  let data = await readFile(oldPath);
  await writeFile(newPath, data);
}

module.exports = {
  moveProfilePicture,
  saveProfilePicture,
};
