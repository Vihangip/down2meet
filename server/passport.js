const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./mongoDB/User'); 

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

passport.use(
    new GoogleStrategy(
      {
        clientID: '1011482531322-6d1dp35f941hr37vnn7cvjdstntunnru.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: `${process.env.REACT_APP_URL3001}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ user_id: profile.id });
  
          if (existingUser) {
            done(null, existingUser);
          } else {
            const newUser = new User({
              user_id: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              picture: profile.photos[0].value,
              friends: [],
              groups: [],
              events: [],
              hangouts: [],
              availability: 'Available',
            });
  
            
            await newUser.save();
            done(null, newUser);
          }
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
