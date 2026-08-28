export class NotFoundException extends Error {
  status = 404;
  constructor(message = "Not Found") {
    super(message);
    this.name = "NotFoundException";
  }
}
