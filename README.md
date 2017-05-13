# git-cleanse
## Description
This command line tool will recursively remove all empty files (except `.gitkeep`, `.hgkeep` & `.keep`) and empty directories (except `.git`, `.hg` & `.svn`) from your file system, starting from your current working directory.

This tool is not configurable.

Requires Node.js 6.0.0 or later.

## Use cases
1. When working in a team, you may encounter a situation where someone else renames (or deletes) a directory in your project. After syncing your local repository with remote, you will be left with directory structure that is of no use anymore.
2. You have redundant empty files in your project.

Those files or directories may clutter your IDE, file system, or simply annoy you.

## Installation

```
npm install -g git-cleanse
```

## Usage

Change your current working directory to your repository directory, eg.
```
cd ~/projects/my-project
```
Run `git-cleanse`
```
git-cleanse
```
