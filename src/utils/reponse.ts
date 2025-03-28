import { HttpStatus } from '@nestjs/common';

export default function sendResponse<T>({
  data = null,
  message,
  statusCode = HttpStatus.OK,
}): {
  data: T | null;
  message: string;
  statusCode: HttpStatus;
} {
  return {
    data,
    message,
    statusCode,
  };
}
