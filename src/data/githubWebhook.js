import fetch from 'isomorphic-fetch';
import config from '../config';
import { Repository, User } from './models';

const githubWebhook = async (userId, repoId) => {
  const user = await User.findById(userId);
  const repo = await Repository.findById(repoId);
  let data = {};

  // Add webhook
  if (!repo.isActive) {
    const resp = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/hooks`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'GitDude',
        Authorization: (user && user.accessToken) ? `Bearer ${user.accessToken}` : 'No accessToken',
      },
      body: JSON.stringify({
        name: 'web',
        events: ['push'],
        active: true,
        config: {
          url: config.api.webHookUrl,
          content_type: 'json',
          secret: config.auth.github.webhookSecret,
        },
      }),
    });
    data = await resp.json();

    if (user.userName !== repo.owner && resp.status === 404) {
      data.error = `An error occurred trying to activate webhook on ${repo.name}. \nPlease make sure you have granted Gitdude access to ${repo.owner} under: \n${repo.owner} => Settings => Third-party access`;
    } else if (resp.status === 422) {
      data.error = `An error occurred trying to activate webhook on ${repo.name} because the repository already have a webhook.`;
    }
    else if (resp.status !== 201) {
      data.error = `An error trying to activate webhook on ${repo.name}. \nPlease make sure Gitdude have been granted access to ${repo.name}`;
    }

    return data;
  }

  // Remove webhook
  const resp = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.name}/hooks/${repo.webhookId}`, {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'GitDude',
      Authorization: (user && user.accessToken) ? `Bearer ${user.accessToken}` : 'No accessToken',
    },
  });

  if (resp.status !== 204) {
    data.error = `An error trying to activate webhook on ${repo.name}. \nPlease make sure Gitdude have been granted access to ${repo.name}`;
  }

  return data;
};

export default githubWebhook;
