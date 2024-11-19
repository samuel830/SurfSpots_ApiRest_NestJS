import { IsEmail, IsString, MinLength } from "class-validator";

export class SigninUserDto {
    @IsString()
    @MinLength(3)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    password: string;
}