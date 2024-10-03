import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { findUserByUsername, findUserById } from '../models/user.js';

export default function(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await findUserByUsername(username);
                
                if (!user) {
                    return done(null, false, { message: 'Incorrect username' });
                }

                const isMatch = await bcrypt.compare(password, user.password_hash);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            } catch (err) {
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        console.log("id is :", user.id);
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById(id);
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err) {
            console.log(err);
            done(err, false);
        }
    });
}
