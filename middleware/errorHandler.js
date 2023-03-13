const {
    constants
} = require("../constants");

// Error handling for different type of status code different title,message and stackTrace will be responded in json format
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    if (constants.NOT_FOUND) {
        res.json({
            title: "Not Found",
            message: err.message,
            stackTrace: err.stack
        });
    } else if (constants.VALIDATION_ERROR) {
        res.json({
            title: "Validation Error",
            message: err.message,
            stackTrace: err.stack
        });
    } else if (constants.FORBIDDEN) {
        res.json({
            title: "Forbidden",
            message: err.message,
            stackTrace: err.stack
        });
    } else if (constants.UNAUTHORIZED) {
        res.json({
            title: "Unauthorized",
            message: err.message,
            stackTrace: err.stack
        });
    } else if (constants.SERVER_ERROR) {
        res.json({
            title: "Server Error",
            message: err.message,
            stackTrace: err.stack
        });
    } else {
        console.log("There ids no error");
    }

}

module.exports = errorHandler