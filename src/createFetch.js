/* @flow */

import fetch from 'isomorphic-fetch';

type Options = {
  baseUrl: string,
  cookie?: string,
  user?: object,
};

const gitApiUrl = 'https://api.github.com/graphql';

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch({ baseUrl, cookie, user }: Options) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST', // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(cookie ? { Cookie: cookie } : null),
    },
  };

  const gitDefaults = {
    method: 'POST', // handy with GraphQL backends
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: (user && user.accessToken) ? `Bearer ${user.accessToken}` : 'No accessToken',
    },
  };

  return (url, options) => {

    // External request to github
    if (url.startsWith(gitApiUrl)) {
      return fetch(gitApiUrl, {
        ...gitDefaults,
        ...options
      });
    }
    // Internal request to graphql
    else if (url.startsWith('/graphql') || url.startsWith('/api')) {
      return fetch(`${baseUrl}${url}`, {
        ...defaults,
        ...options,
        headers: {
          ...defaults.headers,
          ...(options && options.headers),
        }
      });
    }

    return fetch(url, options);

  }

}

export default createFetch;
