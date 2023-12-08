const { StatusCodes: statusCodes } = require('http-status-codes');

function NotFoundHandler (app) {
    app.use((req, res, next) => {
        res.status(statusCodes.NOT_FOUND).json({
            message: 'مسیر مورد نظر شما وجود ندارد 🔍☹️'
        })
    })
}

module.exports = NotFoundHandler