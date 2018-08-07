exports.seed = (knex, Promise) => {
    return knex('users').del()
        .then(() => {
            return Promise.join(
                knex('users').insert({
                    username: 'sharmav',
                    firstname: 'Vivek',
                    lastname: 'Sharma',
                    password: 'password',
                    teamid:3
                }),
                knex('users').insert({
                    username: 'kamatha',
                    firstname: 'Arun',
                    lastname: 'Kamath',
                    password: 'password',
                    teamid:4
                })
            );
        });
};