
export class ServiceError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

export class NotFoundError extends ServiceError {
  constructor(message: string) {
    super(message, 404); // 404 - Not Found
  }
}

export class ValidationError extends ServiceError {
  constructor(message: string) {
    super(message, 400); // 400 - Bad Request
  }
}

export class InternalServerError extends ServiceError {
  constructor(message = "Internal Server Error") {
    super(message, 500); // 500 - Internal Server Error
  }
}