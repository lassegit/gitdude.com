import path from 'path';
import exec from 'async-exec';

const gitSync = async (req, res, next) => {
  const repoPath = path.resolve(__dirname, `../repos/${req.repo.id}`);
  const repoUrl = `https://${req.user.accessToken}@github.com/${req.user.userName}/${req.repo.name}`;

  try {
    if (__DEV__) {
      await exec(`git -C ${repoPath} fetch --no-recurse-submodules ${repoUrl}`);
    } else {
      await exec(`git -C ${repoPath} fetch --depth 1 --no-recurse-submodules ${repoUrl}`);
    }

    return next();
  } catch (e) {
    return res.status(500).send(e);
  }

};

export default gitSync;
