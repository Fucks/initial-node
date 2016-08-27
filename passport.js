'use strict';
module.exports = function(passport, Strategy, User){
    // Configure the local strategy for use by Passport.
    //
    // The local strategy require a `verify` function which receives the credentials
    // (`username` and `password`) submitted by the user.  The function must verify
    // that the password is correct and then invoke `cb` with a user object, which
    // will be set at `req.user` in route handlers after authentication.
    passport.use(new Strategy(
        function(username, password, callback) {
            User.scope({ method: ['findByEmail', username]}).find().then(function(user) {
                if (!user) {
                    return callback(null, false); 
                }
                if (user.password != password) {
                    return callback(null, false); 
                }
                return callback(null, user);
            }, function(err){
                return callback(err);
            });
        }));


    // Configure Passport authenticated session persistence.
    //
    // In order to restore authentication state across HTTP requests, Passport needs
    // to serialize users into and deserialize users out of the session.  The
    // typical implementation of this is as simple as supplying the user ID when
    // serializing, and querying the user record by ID from the database when
    // deserializing.
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function(id, cb) {
        User.findById(id).then(function(user){
            cb(null, user);
        }, function(err){
            return cb(err); 
        });
    });
}