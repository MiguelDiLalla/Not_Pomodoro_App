// Simple deploy script that works around the ENAMETOOLONG error
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure we have a clean dist folder
console.log('Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}

// Create a deployment folder to avoid long path issues
const deployDir = path.join(__dirname, 'deploy-temp');
console.log(`Creating temporary deployment directory: ${deployDir}`);

// Clean or create the directory
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir);

// Copy the dist folder to the deployment directory
console.log('Copying build files...');
fs.cpSync(path.join(__dirname, 'dist'), deployDir, { recursive: true });

// Initialize git in the deployment directory
console.log('Initializing git repository...');
process.chdir(deployDir);

// Determine the repository URL (with token if provided)
const githubToken = process.env.GITHUB_TOKEN;
const repoUrl = githubToken 
  ? `https://${githubToken}@github.com/MiguelDiLalla/not-pomodoro-app.git`
  : `https://github.com/MiguelDiLalla/not-pomodoro-app.git`;

try {
  execSync('git init', { stdio: 'inherit' });
  execSync('git add .', { stdio: 'inherit' });
  execSync('git config --local user.email "auto-deploy@flowloop.app"', { stdio: 'inherit' });
  execSync('git config --local user.name "FlowLoop Auto Deploy"', { stdio: 'inherit' });
  execSync('git commit -m "Deploy FlowLoop app"', { stdio: 'inherit' });
  
  // Force push to the gh-pages branch
  console.log('Pushing to GitHub Pages...');
  execSync(`git push -f ${repoUrl} HEAD:gh-pages`, { stdio: 'inherit' });
  
  console.log('Successfully deployed!');
} catch (error) {
  console.error('Deployment error:', error);
  process.exit(1);
} finally {
  // Clean up - return to original directory
  process.chdir(__dirname);
  
  // Optional: remove the temp directory when done
  console.log('Cleaning up temporary files...');
  fs.rmSync(deployDir, { recursive: true, force: true });
}