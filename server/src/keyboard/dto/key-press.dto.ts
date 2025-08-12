import { IsString, IsNumber } from "class-validator";

export class KeyPressDto {
  @IsString()
  key!: string;

  @IsNumber()
  timestamp!: number;
}
