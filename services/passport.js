const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	// null = no error
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

// promise based code
// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: keys.googleClientID,
// 			clientSecret: keys.googleClientSecret,
// 			callbackURL: '/auth/google/callback',
// 			proxy: true
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			User.findOne({ googleId: profile.id }).then(existingUser => {
// 				if (existingUser) {
// 					// we already have a record with the given profile ID
// 					// null = no error and we return the user
// 					done(null, existingUser);
// 				} else {
// 					// we don't have a user record with this ID, make a new one and save it
// 					new User({ googleId: profile.id }).save().then(user => done(null, user));
// 				}
// 			});
// 		}
// 	)
// );

// async await refactor
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				return done(null, existingUser);
			}
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
		}
	)
);
