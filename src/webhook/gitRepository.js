import fs from 'fs';
import path from 'path';
import exec from 'async-exec';

const gitRepo = async (req, res, next) => {
  const repoPath = path.resolve(__dirname, `../files/repos/${req.repo.id}`);
  const repoUrl = `https://${req.user.accessToken}@github.com/${req.user.userName}/${req.repo.name}`;

  if (!fs.existsSync(repoPath)) {
    try {
      const clone = (__DEV__) ? await exec(`git clone ${repoUrl} ${repoPath}`) : await exec(`git clone --depth 1 ${repoUrl} ${repoPath}`);
      return next();
    } catch (e) {
      return res.status(500).send('Failed to clone repository.');
    }
  }

  return next();
}

export default gitRepo;
