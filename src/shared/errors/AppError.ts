class AppError {
  public readonly message: String;
  public readonly statusCode: number;

  constructor(message: String, statuscode: number = 400) {
    this.message = message;
    this.statusCode = statuscode;
  }
}

export default AppError;
