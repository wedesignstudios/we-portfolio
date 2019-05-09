module.exports = {

  test: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST, // Host is docker-compose service name
      user: process.env.DATABASE_USER,
      database: 'we_portfolio_test'
    },
    pool: {
      min:2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds/test'
    }
  },

  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST, // Host is docker-compose service name
      user: process.env.DATABASE_USER,
      database: 'we_portfolio',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './seeds/dev'
    }
  },

  production: {
    client: 'pg',
    debug: true,
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations'
    },
    ssl: true
  }

};
