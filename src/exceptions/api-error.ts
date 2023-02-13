type TApiErrorStatus = 400 | 401 | 403 | 404 | 409 | 500;

interface IApiError extends Error {
  status: TApiErrorStatus;
}

class ApiError extends Error implements IApiError {
  status: TApiErrorStatus;

  constructor(status: TApiErrorStatus, message: string) {
    super(message);
    this.status = status;
  }
}

class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}

class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(403, message);
  }
}

class BadRequestError extends ApiError {
  constructor(message: string) {
    super(400, message);
  }
}

class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message);
  }
}

class NotFoundError extends ApiError {
  constructor(message: string = 'Request source not found') {
    super(404, message);
  }
}

class InternalError extends ApiError {
  constructor() {
    super(500, 'Internal server error');
  }
}

export {
  ApiError,
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
  ConflictError,
  NotFoundError,
  InternalError,
};
