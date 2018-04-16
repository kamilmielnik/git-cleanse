#!/usr/bin/env node

const gitCleanse = require('../index.js');
const directoriesToSkip = require('./directories-to-skip.json');
const filesToSkip = require('./files-to-skip.json');
const cleanseDirectory = createDirectoryCleanser({ directoriesToSkip, filesToSkip });
cleanseDirectory(process.cwd());
