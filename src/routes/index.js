/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./contact').default,
    require('./login').default,
    require('./about').default,
    require('./privacy').default,
    require('./profile').default,
    // Wildcard routes, e.g. { path: '*', ... } (must go last)
    require('./notFound').default,
  ],
  async action({ next, isAuthenticated }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - gitdude.com`;
    route.description = route.description || '';

    // Require auth
    if (route.authRequired && !isAuthenticated) {
      return { redirect: '/login' };
    }

    return route;
  }
};
