const fs = require('fs');
const path = require('path');

const createDirectoryCleanser = (directoriesToSkip = [], filesToSkip = []) => {
  const cleanseDirectory = (directoryPath) => {
    const names = fs.readdirSync(directoryPath);

    for (const name of names) {
      cleanseDirectoryEntry(directoryPath, name);
    }

    const empty = fs.readdirSync(directoryPath).length === 0;
    if (empty) {
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

const tryDeletingDirectory = (fullPath) => {
  try {
    fs.rmdirSync(fullPath);
    console.log(`Empty directory deleted: "${fullPath}"`);
  } catch (error) {
    console.error(`Cannot delete empty directory: "${fullPath}"\n\t${error}`);
  }
};

const tryDeletingFile = (fullPath) => {
  try {
    fs.unlinkSync(fullPath);
    console.log(`Empty file deleted: "${fullPath}"`);
  } catch (error) {
    console.error(`Cannot delete empty file: "${fullPath}"\n\t${error}`);
  }
};

module.exports = (directoryPath, directoriesToSkip, filesToSkip) => {
  createDirectoryCleanser(directoriesToSkip, filesToSkip)(directoryPath);
};
