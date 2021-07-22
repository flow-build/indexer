const path = require('path');
const BASE_PATH = path.join(__dirname, 'db');

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        }
    },
    test: {
        client: 'pg',
        connection: {
            host: "127.0.0.1",
            user: "postgres",
            password: "postgres",
            database: "workflow"
        },
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        }
    }
};
