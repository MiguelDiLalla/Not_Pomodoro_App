#!/usr/bin/env node

/**
 * deploy-simple.js - A simplified deployment script for GitHub Pages
 * 
 * This script avoids using the gh-pages package and instead uses
 * direct Git commands to deploy your app to GitHub Pages, avoiding
 * the ENAMETOOLONG error common on Windows systems.
 */

const { execSync } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

// Configuration
const GITHUB_REPO = 'MiguelDiLalla/not-pomodoro-app'; // Your GitHub username/repo
const BRANCH = 'gh-pages';                            // Branch to deploy to
const SOURCE_DIR = path.join(__dirname, 'dist');      // Directory with built files

// Create a temporary directory in the system temp folder
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'flow-deploy-'));
console.log(`Created temporary directory: ${tempDir}`);

// Ensure the source directory exists
if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`Error: Source directory ${SOURCE_DIR} does not exist.`);
  console.log('Did you forget to run "npm run build" first?');
  process.exit(1);
}

// Copy files to the temporary directory
console.log(`Copying files from ${SOURCE_DIR} to ${tempDir}...`);
fs.cpSync(SOURCE_DIR, tempDir, { recursive: true });

// Change to the temporary directory and initialize git
try {
  process.chdir(tempDir);
  console.log('Initializing Git repository...');
  
  execSync('git init');
  execSync('git config --local core.autocrlf false');
  execSync('git config --local user.name "Deployment Script"');
  execSync('git config --local user.email "deploy@flowloop.app"');
  
  // Create git files
  console.log('Adding files to Git...');
  execSync('git add .');
  execSync('git commit -m "Deploy to GitHub Pages"');
  
  // Push to GitHub Pages
  console.log(`Pushing to ${GITHUB_REPO}...`);
  execSync(`git push -f https://github.com/${GITHUB_REPO}.git master:${BRANCH}`);
  
  console.log('🎉 Successfully deployed!');
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
} finally {
  // Clean up the temporary directory
  process.chdir(__dirname);
  console.log('Cleaning up...');
  fs.rmSync(tempDir, { recursive: true, force: true });
}