exports.seed = (knex, Promise) => {
    return knex('users').del()
        .then(() => {
            return Promise.join(
                knex('users').insert({
                    username: 'sharmav',
                    firstname: 'Vivek',
                    lastname: 'Sharma',
                    password: 'password'
                }),
                knex('users').insert({
                    username: 'kamatha',
                    firstname: 'Arun',
                    lastname: 'Kamath',
                    password: 'password'
                })
            );
        });
};