const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const docOptions = swaggerJSDoc({
    swaggerDefinition: {
        openapi: "3.0.2",
        info: {
            title: 'Divar Backend Website Documentation!',
            version: '0.0.1',
            contact: {
                email: 'nimacodes@gmail.com',
                name: 'Nima',
                url: 'https://github.com/itsDevNima',
            },
            description: 'A side project to learn a bunch of things.',
            license: 'MIT',
        },
    },
    apis: [process.cwd() + '/src/modules/**/*.swagger.js'],
});

const SwaggerUIConfig = swaggerUI.setup(docOptions, {
    explorer: true,
});

function LoadSwagger (expressApp) {
    expressApp.use('/api-docs', swaggerUI.serve, SwaggerUIConfig)
}

module.exports = {
    LoadSwagger
}
