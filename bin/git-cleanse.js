#!/usr/bin/env node

const gitCleanse = require('../index.js');
const directoriesToSkip = require('./directories-to-skip.json');
const filesToSkip = require('./files-to-skip.json');

gitCleanse(process.cwd(), directoriesToSkip, filesToSkip);
