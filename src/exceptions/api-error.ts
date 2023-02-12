type TApiErrorStatus = 400 | 401 | 403 | 404 | 500;

interface IApiError extends Error {
  status: TApiErrorStatus;
}

class ApiError extends Error implements IApiError {
  status: TApiErrorStatus;

  constructor(status: TApiErrorStatus, message: string) {
    super(message);
    this.status = status;
  }

  static Unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }

  static Forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }

  static NotFound() {
    return new ApiError(404, 'Request source not found');
  }

  static InternalError() {
    return new ApiError(500, 'Internal server error');
  }
}

export default ApiError;
