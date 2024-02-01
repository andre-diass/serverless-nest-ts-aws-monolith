import { ApiProperty } from '@nestjs/swagger';

export class CreateHello {
  @ApiProperty({ readOnly: true })
  public message: string;

  @ApiProperty()
  public quantity: number;
}

export class ResponseDto<T extends object> {
  @ApiProperty({ readOnly: true })
  public statusCode: number;

  @ApiProperty()
  public code: string;

  @ApiProperty()
  public data: T;
}
