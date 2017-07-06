import crypto from 'crypto';
import config from '../config';
import { Repository, User } from '../data/models';

const gitAuth = async (req, res, next) => {
  if (!__DEV__) {
    const reqSignature = req.headers['x-hub-signature'];

    if (!reqSignature) {
      return res.status(403).send({ error: 'X-Hub-Signature not present.' });
    }

    const localSignature = `sha1=${crypto.createHmac('sha1', config.auth.github.webhookSecret).update(new Buffer(JSON.stringify(req.body))).digest('hex')}`;
    if (localSignature !== reqSignature) {
      return res.status(403).send({ error: 'X-Hub-Signature mismatch.' });
    }
  }

  // Attach user and repo to request
  req.user = await User.find({ where: { gitId: req.body.sender.id } });
  req.repo = await Repository.find({ where: { name: req.body.repository.name, userId: req.user.id } });

  return next();
};

export default gitAuth;
