import { HttpStatus } from '@nestjs/common';

export class CustomResponseDto {
  constructor(httpStatus, data) {
    this.data = data;
    this.retCode = httpStatus;
    this.httpStatus = httpStatus;
  }

  readonly httpStatus: HttpStatus;

  readonly retCode: number;

  readonly data: any;
}
