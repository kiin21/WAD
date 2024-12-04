class MyError extends Error {
    constructor(statusCode, message, description = '') {
        super(message);
        this.statusCode = statusCode;
        this.description = description;
        // Capture the stack trace
        // Error.captureStackTrace(this, this.constructor);
    }
};

module.exports = MyError;