exports.up = (knex, Promise) => {
    return knex.schema.createTable('users', (table) => {
        table.increments();
        table.string('username').unique().notNullable();
        table.string('firstname');
        table.string('lastname');
        table.string('teamId');
        table.string('password').notNullable();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('users');
};