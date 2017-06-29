import fetch from 'isomorphic-fetch';
import config from '../config';
import { Repository, User } from './models';

// Add and remove webhook from Github repo
export async function updateWebhook(userId, repoId, isActive) {
  const user = await User.findById(userId);
  const repo = await Repository.findById(repoId);

  if (isActive) {
    const resp = await fetch(`https://api.github.com/repos/${user.userName}/${repo.name}/hooks`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'GitDude',
        'Authorization': (user && user.accessToken) ? `Bearer ${user.accessToken}` : 'No accessToken',
      },
      body: JSON.stringify({
        'name': 'web',
        'events': ['push'],
        'active': true,
        'config': {
          'url': config.api.webHookUrl,
          'content_type': 'json',
          'secret': config.auth.github.webhookSecret,
        }
      })
    });
    const { id } = await resp.json();
    return id;
  } else {
    const resp = await fetch(`https://api.github.com/repos/${user.userName}/${repo.name}/hooks/${repo.webhookId}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'GitDude',
        'Authorization': (user && user.accessToken) ? `Bearer ${user.accessToken}` : 'No accessToken',
      },
    });
    return null;
  }

  return null;
}
