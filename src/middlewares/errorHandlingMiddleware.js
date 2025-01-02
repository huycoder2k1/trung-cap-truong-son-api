import { StatusCodes } from 'http-status-codes'

export const errorHandlingMiddleware = (err, req, res, next) => {
    if (!err.StatusCodes) err.StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR

    const responseError = {
        statusCode: err.StatusCodes,
        message: err.message || StatusCodes[err.StatusCodes],
        stack: err.stack
    }

    res.status(responseError.statusCode).json(responseError)
}
