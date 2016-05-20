
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

            return user.save().then(() => {
                console.log('SAVED!!!');
                return user;
            });

        }).catch((err) => console.log(err));
    }

}}

