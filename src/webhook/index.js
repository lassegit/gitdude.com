import path from 'path';
import exec from 'async-exec';
import gitAuth from './gitAuth';
import gitRepo from './gitRepository';
import gitSync from './gitSync';
import { allowedFiles, postComment, commentMarkdown, saveCommit } from './webhookUtils';

const linter = require('eslint').linter;
const CLIEngine = require('eslint').CLIEngine;

const webhook = (app) => {
  app.post('/webhook', gitAuth, gitRepo, gitSync, async (req, res, next) => {
    const repoPath = path.resolve(__dirname, `../files/repos/${req.repo.id}/`);
    const configFile = path.resolve(__dirname, `../files/configs/eslintrc-${req.repo.id}.json`);
    const commits = req.body.commits;
    let webhookResErr = false;
    let webhookRes = [];

    if (!commits) {
      return res.send('No commited files.'); // Initial request
    }

    let cli = new CLIEngine({
      fix: false,
      cache: false,
      configFile: configFile,
      useEslintrc: false,
      rules: {
        'import/no-unresolved': 0,
        'import/extensions': 0
      }
    });
    let config = cli.getConfigForFile(configFile);

    // Iterate over the commits
    for (var i = 0; i < commits.length; i++) {
      const commitId = commits[i].id;
      const files = allowedFiles(commits[i]);
      let lintedFiles = [];

      if (files.length === 0) {
        continue; // No files to lint
      } else if (files.length > 20) {
        continue; // Don't lint too many files
      }

      // Iterate over the commited files and lint them
      for (var x = 0; x < files.length; x++) {
        const snippet = await exec(`git -C ${repoPath} show ${commitId}:${files[x]}`);
        const lint = linter.verify(snippet, config);

        lintedFiles.push({ 'name': files[x], 'lint': lint });
      }

      // Remove for testing...
      const comment = commentMarkdown(lintedFiles, req.user, req.repo, commitId);
      const postData = await postComment(req.user, req.repo, commitId, comment);
      const commitData = await saveCommit(commits[i], req.user, req.repo, postData, req.body, lintedFiles);

      // // Add info to res
      if (postData.error) {
        webhookResErr = true;
        webhookRes.push(postData);
      } else {
        webhookRes.push({ message: 'success', commitId: commitId });
      }
    }

    if (webhookResErr) return res.status(500).json(webhookRes);

    return res.json(webhookRes);
  });
}

export default webhook;
