import { allowedFiles } from './webhookUtils';

const gitFiles = (req, res, next) => {
  const commits = req.body.commits;
  const files = [];

  if (!commits) {
    return res.send('No commited files.'); // Initial test web hook
  }

  // Check if files exists
  for (var i = 0; i < commits.length; i++) {
    // Avoid re-linting files when merging branches
    if (commits[i].distinct) {
      const commitFiles = allowedFiles(commits[i]);

      if (commitFiles.length > 0) {
        files.push(commitFiles);
      }
    }
  }

  if (files.length === 0) {
    return res.send('No files to lint.');
  }

  return next();
};

export default gitFiles;
