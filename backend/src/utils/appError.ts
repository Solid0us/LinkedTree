// Error response template
class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  type?: string;

  constructor(message: string, statusCode: number, type: string | null = null) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failure" : "error";
    this.isOperational = true;
    // Optional "type" field used to pass specific form validators
    type ? (this.type = type) : null;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
