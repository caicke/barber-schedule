import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from 'src/users/dtos';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SignInDto } from 'src/users/dtos/auth/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    /**
     * Service with auhthorization methods
     * SIGNIN, SIGNUP
     */
    constructor(
        private _prisma: PrismaService, 
        private _jwt: JwtService,
        private _config: ConfigService) {}

    async signup(dto: AuthDto) {
        // Generate hash password
        const hash = await argon.hash(dto.password);

        try {
            
            // Save the new user
            const user = await this._prisma.user.create({
                data: {
                    email: dto.email,
                    password: hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName
                },
                select: {
                    email: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true
                }
            })

            // Return the saved user
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                // The .code property can be accessed in a type-safe manner
                if (error.code === 'P2002') {
                  throw new ForbiddenException("Email already exists.")
                }
              }
              throw error
        }
    }

    async signin(dto: SignInDto) {
        try {
            // find the user by email
            // if user not exist throw exception

            const user = await this._prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            })

            if (!user)
                throw new NotFoundException('User not found');
            
            // compare password
            // if dont match throw exeption

            const pwdMatches = await argon.verify(user.password, dto.password)

            if (!pwdMatches)
                throw new ForbiddenException('Password incorrect');

            // return the user
            return this.signToken(user.id, user.email);
        }
        catch(error) {
            throw error;
        }
    }

    async signToken(userId: string, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this._config.get('JWT_SECRET');

        const token = await this._jwt.signAsync(payload, {
            secret: secret,
            expiresIn: '15m'
        })

        return {
            access_token: token
        }
    }
}
