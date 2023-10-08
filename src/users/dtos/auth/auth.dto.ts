import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDto {

    @IsNotEmpty({ message: 'First name must not be empty' })
    firstName: string;

    @IsNotEmpty({ message: 'Last name must not be empty' })
    lastName: string;

    @IsEmail()
    @IsNotEmpty({ message: 'Email must not be empty.' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password must not be empty.' })
    password: string
}