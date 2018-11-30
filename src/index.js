const { Signale } = require('signale');
const config = require('./config');

const options = {
    types: {
        debug: {
            badge: '👉',
            label: '',
        },
        error: {
            badge: '🔥',
            label: 'Errors in configuration\n',
        },
        note: {
            badge: '📖',
            color: 'blue',
            label: 'Configuration description\n',
        },
        success: {
            badge: '👍',
            color: 'greenBright',
            label: 'The configuration is valid\n',
        },
    },
};
const signale = new Signale(options);

const validateConfiguration = () => {
    config.load({});
    try {
        config.validate({ allowed: 'strict' });
        signale.success();
    } catch (error) {
        signale.error(`\n${error.message}\n`);
    }
    displayConfiguration();
};

const generateEmptyConfiguration = () => {
    const schemaProperties = config.getSchema().properties;
    Object.keys(schemaProperties).map(variable => {
        signale.log(`${variable}=`);
    });
};

const displayConfiguration = () => {
    const currentProperties = config.getProperties();
    signale.note();
    const schemaProperties = config.getSchema().properties;
    Object.keys(schemaProperties).map(variable => {
        const currentValue = !!currentProperties[variable]
            ? `    ✅ Current value is "${currentProperties[variable]}"`
            : `    ❌ This value is not yet configured`;
        signale.debug(
            `${variable} => ${
                schemaProperties[variable].doc
            }\n${currentValue}\n`,
        );
    });
};

if (process.argv[2] === 'display') {
    displayConfiguration();
}
if (process.argv[2] === 'validate') {
    validateConfiguration();
}
if (process.argv[2] === 'create') {
    generateEmptyConfiguration();
}
