import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateBeachDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  description: string;

  @IsBoolean()
  lifeguard: boolean;

  // @IsNumber()
  // userId: number;
}
