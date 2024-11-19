import { IsArray, IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(3)
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(3)
    @IsStrongPassword({
        minUppercase: 0,
        minLength: 3,
        minNumbers: 1,
        minSymbols:1,
    })
    password: string;
}