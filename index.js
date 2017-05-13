const fs = require('fs');
const path = require('path');

const DIRECTORIES_TO_SKIP = [
  '.git',
  '.hg',
  '.svn'
];

const FILES_TO_SKIP = [
  '.gitkeep',
  '.hgkeep',
  '.keep'
];

cleanseDirectory(__dirname);

function cleanseDirectory(directoryPath) {
  const fileNames = fs.readdirSync(directoryPath);

  for (fileName of fileNames) {
    const filePath = path.join(directoryPath, fileName);
    const fileStats = fs.lstatSync(filePath);

    if (fileStats.isDirectory()) {
      const skip = DIRECTORIES_TO_SKIP.includes(fileName);

      if (!skip) {
        cleanseDirectory(filePath);
      }
    } else {
      tryDeletingFile(fileName, filePath, fileStats);
    }
  }

  tryDeletingDirectory(directoryPath);
}

function tryDeletingDirectory(directoryPath) {
  const fileNames = fs.readdirSync(directoryPath);
  const empty = fileNames.length === 0;

  if (empty) {
    try {
      fs.rmdirSync(directoryPath);
      console.log(`Empty directory removed: "${directoryPath}"`);
    } catch (error) {
      console.error(`Cannot delete empty directory: "${directoryPath}"\n\t${error}`);
    }
  }
}

function tryDeletingFile(fileName, filePath, fileStats) {
  const skip = FILES_TO_SKIP.includes(fileName);
  const empty = fileStats.size === 0;

  if (!skip && empty) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Empty file removed: "${filePath}"`);
    } catch (error) {
      console.error(`Cannot delete empty file: "${filePath}"\n\t${error}`);
    }
  }
}
