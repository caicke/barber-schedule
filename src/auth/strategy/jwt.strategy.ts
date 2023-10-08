import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt') {
    
    constructor( private _config: ConfigService,
                 private _prisma: PrismaService ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _config.get('JWT_SECRET')
        });
    }

    async validate(payload: { sub: string; email: string; }) {
        
        const user = await this._prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })

        delete user.password;

        return user; 
    }
}