import path from 'path';
import exec from 'async-exec';

const gitSync = async (req, res, next) => {
  const repoPath = path.resolve(__dirname, `../repos/${req.repo.id}`);
  const repoUrl = `https://${req.user.accessToken}@github.com/${req.repo.owner}/${req.repo.name}`;
  const ref = req.body.ref;

  try {
    if (__DEV__) {
      await exec(`git -C ${repoPath} fetch --force --update-head-ok --no-recurse-submodules ${repoUrl} ${ref}:${ref}`);
    } else {
      await exec(`git -C ${repoPath} fetch --force --update-head-ok --depth 1 --no-recurse-submodules ${repoUrl} ${ref}:${ref}`);
    }

    return next();
  } catch (e) {
    return res.status(500).send(e);
  }

};

export default gitSync;
