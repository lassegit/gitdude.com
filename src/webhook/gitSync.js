import path from 'path';
import exec from 'async-exec';

const gitSync = async (req, res, next) => {
  const repoPath = path.resolve(__dirname, `../repos/${req.repo.id}`);
  const repoUrl = `https://${req.user.accessToken}@github.com/${req.user.userName}/${req.repo.name}`;

  try {
    __DEV__ ? await exec(`git -C ${repoPath} pull ${repoUrl}`) : await exec(`git -C ${repoPath} pull --depth 1 ${repoUrl}`);
    return next();
  } catch (e) {
    return res.status(500).send('Failed to pull git repository.');
  }

};

export default gitSync;
