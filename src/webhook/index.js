import path from 'path';
import exec from 'async-exec';
import gitAuth from './gitAuth';
import gitRepo from './gitRepository';
import gitSync from './gitSync';
import gitFiles from './gitFiles';
import { allowedFiles, postComment, commentMarkdown, saveCommit } from './webhookUtils';

const linter = require('eslint').linter;
const CLIEngine = require('eslint').CLIEngine;

const webhook = (app) => {
  app.post('/webhook', gitAuth, gitFiles, gitRepo, gitSync, async (req, res, next) => {
    const repoPath = path.resolve(__dirname, `../repos/${req.repo.id}/`);
    const configFile = path.resolve(__dirname, `../configs/eslintrc-${req.repo.id}.json`);
    const commits = req.body.commits;
    const webhookRes = [];
    let webhookResErr = false;
    let cli;
    let esLintConfig;

    try {
      cli = new CLIEngine({
        fix: false,
        cache: false,
        configFile: configFile,
        useEslintrc: false,
        rules: {
          'import/no-unresolved': 0,
          'import/extensions': 0,
        },
      });
      esLintConfig = cli.getConfigForFile(configFile);
    } catch (e) {
      return res.status(500).send(e);
    }

    // Iterate over the commits
    for (var i = 0; i < commits.length; i++) {
      const commitId = commits[i].id;
      const files = allowedFiles(commits[i]);
      const lintedFiles = [];

      if (files.length === 0) {
        continue; // No files to lint
      } else if (files.length > 20) {
        continue; // Don't lint too many files
      } else if (!commits[i].distinct) {
        continue; // Don't re-lint files
      }

      // Iterate over the commited files and lint them
      for (var x = 0; x < files.length; x++) {
        try {
          const snippet = await exec(`git -C ${repoPath} show ${commitId}:${files[x]}`);
          const lint = linter.verify(snippet, esLintConfig);

          lintedFiles.push({ name: files[x], lint: lint });
        } catch (e) {
          lintedFiles.push({ name: files[x], lint: `File not found in commit: ${commitId}` });
        }
      }

      const comment = commentMarkdown(lintedFiles, req.user, req.repo, commitId);
      const postData = await postComment(req.user, req.repo, commitId, comment);
      await saveCommit(commits[i], req.user, req.repo, postData, req.body, lintedFiles);

      // Add info to res
      if (postData.error) {
        webhookResErr = true;
        webhookRes.push(postData);
      } else {
        webhookRes.push({ message: 'success', commitId: commitId });
      }
    }


    if (webhookResErr) {
      return res.status(500).json(webhookRes);
    }

    return res.json(webhookRes);
  });
};

export default webhook;
