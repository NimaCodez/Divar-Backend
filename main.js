require('dotenv').config();
const express = require('express');
const { LoadSwagger } = require('./src/config/swagger.config');
const morgan = require('morgan');
const mainRouter = require('./src/app.routes');
const NotFoundHandler = require('./src/common/exeptions/not-found.handler');
const AllExceptionsHandler = require('./src/common/exeptions/all-exceptions.handler');

async function bootstrap() {
    const { PORT } = process.env;
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('tiny'));
    app.use(mainRouter);

    require(require('path').join(
        __dirname,
        'src',
        'config',
        'mongoose.config.js',
    ));

    LoadSwagger(app);
    NotFoundHandler(app);
    AllExceptionsHandler(app);
    
    app.listen(PORT, () =>
        console.log(`App is listening on http://localhost:${PORT}`),
    );
}
bootstrap();
