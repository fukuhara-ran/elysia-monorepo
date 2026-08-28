export class UnauthorizedException extends Error {
  status = 401;
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedException";
  }
}
