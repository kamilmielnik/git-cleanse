const fs = require('fs');
const path = require('path');

const createDirectoryCleanser = (directoriesToSkip = [], filesToSkip = []) => {
  const cleanseDirectory = (directoryPath) => {
    const names = fs.readdirSync(directoryPath);
    for (const name of names) {
      cleanseDirectoryEntry(directoryPath, name);
    }
    if (isDirectoryEmpty(directoryPath)) {
      tryDeletingDirectory(directoryPath);
    }
  };

  const cleanseDirectoryEntry = (directoryPath, name) => {
    const fullPath = path.join(directoryPath, name);
    const stats = fs.lstatSync(fullPath);

    if (stats.isDirectory()) {
      if (shouldDeleteDirectory(name)) {
        cleanseDirectory(fullPath);
      }
    } else if (shouldDeleteFile(name, stats)) {
      tryDeletingFile(fullPath);
    }
  };

  const shouldDeleteDirectory = (name) => {
    const skip = directoriesToSkip.includes(name);
    return !skip;
  };

  const shouldDeleteFile = (name, stats) => {
    const skip = filesToSkip.includes(name);
    const empty = stats.size === 0;
    return !skip && empty;
  };

  return cleanseDirectory;
};

const isDirectoryEmpty = (fullPath) => fs.readdirSync(fullPath).length === 0;

const tryDeletingDirectory = (fullPath) => {
  try {
    fs.rmdirSync(fullPath);
    console.log(`Directory deleted: "${fullPath}"`);
  } catch (error) {
    console.error(`Cannot delete directory: "${fullPath}"\n\t${error}`);
  }
};

const tryDeletingFile = (fullPath) => {
  try {
    fs.unlinkSync(fullPath);
    console.log(`File deleted: "${fullPath}"`);
  } catch (error) {
    console.error(`Cannot delete file: "${fullPath}"\n\t${error}`);
  }
};

module.exports = createDirectoryCleanser;
