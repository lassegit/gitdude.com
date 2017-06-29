import path from 'path';
import exec from 'async-exec';

const gitSync = async (req, res, next) => {
  const repoPath = path.resolve(__dirname, `../files/repos/${req.repo.id}`);

  try {
    const pull = await exec(`git -C ${repoPath} pull`);
    return next();
  } catch (e) {
    throw new Error('Failed to pull git repository.');
  }
};

export default gitSync;
