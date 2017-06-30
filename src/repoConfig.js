import path from 'path';
import fs from 'fs';
import { Repository } from './data/models';

const repoConfig = (app) => {
  app.post('/api/configs/eslintrc/:id/:action', async (req, res, next) => {
    const id = req.params.id;
    const filePath = path.resolve(__dirname, `../configs/eslintrc-${id}.json`);

    if (!req.isAuthenticated()) {
      return res.status(403).send('Permission denied.');
    }

    if (req.params.action === 'get') {
      const repo = await Repository.findById(id);

      if (repo.userId !== req.user.id) {
        return res.status(403).send('Permission denied.');
      }

      if (!repo.hasConfig) {
        return res.status(404).send('Not found.');
      }

      return res.sendFile(filePath);
    }

    try {
      const config = JSON.parse(req.body.config);

      fs.writeFile(filePath, config, async (err) => {
        if (err) throw err;

        if (!req.body.hasConfig) {
          const repo = await Repository.update({ hasConfig: true }, { where: { id: id } });
        }

        return res.json();
      });
    } catch (e) {
      return res.status(500).send('Something when wrong.');
    }
  });
}

export default repoConfig;
