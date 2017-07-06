import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { User } from './data/models';
import config from './config';

passport.use(new GitHubStrategy({
    clientID: config.auth.github.id,
    clientSecret: config.auth.github.secret,
    callbackURL: config.auth.github.callbackURL,
    passReqToCallback: true,
    // https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-scopes-for-oauth-apps/
    scope: ['user', 'user:email', 'repo'],
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      let email = null;
      for (var i = profile.emails.length - 1; i >= 0; i--) {
        email = profile.emails[i].value;
        break;
      }

      const userObject = {
        gitId: profile.id,
        userName: profile.username,
        displayName: profile.displayName,
        email: email,
        location: profile._json.location,
        company: profile._json.company,
        accessToken: accessToken,
      };

      let user;
      const currentUser = await User.findOne({ where: { gitId: profile.id } });
      if (currentUser) {
        user = await User.update(userObject, { where: { gitId: profile.id } });
        user = await User.findOne({ where: { gitId: profile.id } });
      } else {
        user = await User.create(userObject);
      }

      done(null, { id: user.id, gitId: user.gitId });
    } catch (err) {
      done(err);
    }
  }
));


export default passport;
