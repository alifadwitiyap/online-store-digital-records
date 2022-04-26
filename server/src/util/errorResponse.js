class ErrorResponse extends Error {
    constructor(msg, code) {
        super(msg, code)
        this.code = code
    }
}

module.exports = ErrorResponse