const { StatusCodes: statusCodes } = require('http-status-codes');

function AllExceptionsHandler (app) {
    app.use((err, req, res, next) => {
        let status = err?.status ?? err?.statusCode;
        if (!status || isNaN(+status) || status > 511 || status < 200 ) status = 500;
        res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
            message: err?.message ?? err?.stack ?? "INTERNAL_SERVER_ERROR"
        })
    })
}

module.exports = AllExceptionsHandler