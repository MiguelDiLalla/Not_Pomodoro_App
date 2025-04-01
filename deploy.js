// Simple deploy script to handle long filenames
const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(
  path.join(process.cwd(), 'dist'),
  {
    // Use GitHub token if available
    repo: process.env.GITHUB_TOKEN 
      ? `https://${process.env.GITHUB_TOKEN}@github.com/MiguelDiLalla/not-pomodoro-app.git` 
      : undefined,
    message: 'Auto-deployed with custom script',
    silent: false,
    // Add git arguments to handle long paths
    git: 'git',
    args: ['--max-buffer=20971520']
  },
  (err) => {
    if (err) {
      console.error('Deployment error:', err);
      process.exit(1);
    } else {
      console.log('Successfully deployed!');
    }
  }
);