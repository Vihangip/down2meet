const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./mongoDB/User'); // Replace this with the path to your user model


passport.serializeUser((user, done) => {
    console.log("----Serialized with id: ", user.id);
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user with id:", id);
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
        callbackURL: 'http://localhost:3001/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if the user already exists in the database
          const existingUser = await User.findOne({ user_id: profile.id });
  
          if (existingUser) {
            // User already exists, return the user
            done(null, existingUser);
          } else {
            // User does not exist, create a new user and save it to the database
            const newUser = new User({
              user_id: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              picture: profile.photos[0].value,
              friends: [],
              groups: [],
              events: [],
              availability: false,
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
