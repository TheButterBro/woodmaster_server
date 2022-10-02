class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badReq(message) {
    return new ApiError(404, message);
  }

  static Internal(message) {
    return new ApiError(500, message);
  }

  static forBidden(message) {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
