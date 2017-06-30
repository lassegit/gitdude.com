import fs from 'fs';
import path from 'path';
import exec from 'async-exec';

const gitRepo = async (req, res, next) => {
  const repoPath = path.resolve(__dirname, `../repos/${req.repo.id}`);

  if (!fs.existsSync(repoPath)) {
    try {
      fs.mkdirSync(repoPath);
      // Avoid storing user access token on disk: https://github.com/blog/1270-easier-builds-and-deployments-using-git-over-https-and-oauth
      await exec(`git -C ${repoPath} init`);
      return next();
    } catch (e) {
      return res.status(500).send('Failed to clone repository.');
    }
  }

  return next();
}

export default gitRepo;
