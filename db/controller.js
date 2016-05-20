
export default (db) => { return {
    getOrCreateUser(id) {
        return db.User.findOne({ where: { id: id } }).then((existingUser) => {
            if (existingUser) {
                console.log('EXISTING: ', existingUser);
                return existingUser;
            }

            const user = db.User.build({
                id: id
            });

            console.log('NEW: ', user);

            return user.save().then((err) => {
                console.log('SAVED!!!');
                if (err) {
                    console.log('ERROR saving new user: ', err);
                    return err;
                }

                return user;
            });

        }).catch((err) => console.log(err));
    },

    createResponse(userId, data) {
        const props = Object.assign({}, data, { userId });

        return db.Response.create(props);
    }

}}
