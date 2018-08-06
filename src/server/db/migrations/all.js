exports.up = (knex, Promise) => {
    //return knex.schema.dropTable('users');

   return knex.schema.dropTableIfExists('deployables').then(() => {
        return knex.schema.createTable('deployables', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('bambookey').notNullable();
            table.unique(['name']);
        });
    }).then(
        function () {
            return knex.schema.dropTableIfExists('env').then(() => {
                return knex.schema.createTable('env', (table) => {
                    table.increments('id').primary();
                    table.string('name').notNullable();
                    table.unique(['name']);
                });
            })
        }
    ).then(
        function () {
           return knex.schema.dropTableIfExists('teams').then(() => {
                return knex.schema.createTable('teams', function (table) {
                    table.increments('id').primary();
                    table.string('name').notNullable();
                    table.integer('deployableid').references('id').inTable('deployables').notNull();
                    table.unique(['name']);
                });
            })
        }
    ).then(
        function () {
           return knex.schema.dropTableIfExists('users').then(() => {
                    return knex.schema.createTable('users', (table) => {
                        table.increments('id').primary();
                        table.string('username').unique().notNullable();
                        table.string('firstname');
                        table.string('lastname');
                        table.integer('teamid').references('id').inTable('teams').notNull();
                        table.string('password').notNullable();
                    });
                }
            )
        }).then(
       function () {
           return knex.schema.dropTableIfExists('releases').then(() => {
                   return knex.schema.createTable('releases', (table) => {
                       table.increments('id').primary();
                       table.string('buildnum').unique().notNullable();
                       table.integer('manager').references('id').inTable('users').notNull();
                       table.string('status');
                       table.integer('deployableid').references('id').inTable('deployables').notNull();
                   });
               }
           )
       }).then(
       function () {
           return knex.schema.dropTableIfExists('releasetracker').then(() => {
                   return knex.schema.createTable('releasetracker', (table) => {
                       table.increments('id').primary();
                       table.integer('releaseid').references('id').inTable('releases').notNull();
                       table.integer('envid').references('id').inTable('env').notNull();
                       table.string('status').notNull();
                       table.date('startdate').notNull();
                       table.date('enddate');
                   });
               }
           )
       }).then(
       function () {
           return knex.schema.dropTableIfExists('teamtracker').then(() => {
                   return knex.schema.createTable('teamtracker', (table) => {
                       table.increments('id').primary();
                       table.integer('releaseid').references('id').inTable('releases').notNull();
                       table.integer('teamid').references('id').inTable('teams').notNull();
                       table.integer('envid').references('id').inTable('env').notNull();
                       table.string('status').notNull();
                       table.dateTime('startdate').notNull();
                       table.dateTime('enddate');
                   });
               }
           )
       }).catch(function (error) {
//Error handler
        console.log("Error occured during migration", error);
    });
};

exports.down = (knex, Promise) => {
    //return knex.schema.dropTable('users');
};