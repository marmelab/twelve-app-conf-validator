const convict = require('convict');

const isNotEmpty = val => {
    if (!val.trim()) {
        throw new Error('This environment variable cannot be empty');
    }
};

const config = convict({
    NODE_ENV: {
        default: '',
        doc: 'The application environment.',
        env: 'NODE_ENV',
        format: ['production', 'development', 'test'],
    },
    POSTGRES_PASSWORD: {
        default: '',
        doc: "PostgreSQL's user password",
        env: 'POSTGRES_PASSWORD',
        format: isNotEmpty,
    },
    POSTGRES_USER: {
        default: '',
        doc: "PostgreSQL's user",
        env: 'POSTGRES_USER',
        format: isNotEmpty,
    },
});

module.exports = config;
