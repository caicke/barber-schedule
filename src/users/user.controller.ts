import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { IResult } from "src/helpers/models/result.model";
import { UserService } from "./user.service";
import { CreateUserDto } from "src/users/dtos/user.dto";
import { Request } from 'express';
import { JwtGuard } from "src/auth/guard";

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private _service: UserService) {}

    @Get('me')
    getMe(@Req() req: Request) {

        return req.user;
    }

    @Get()
    async findAll(): Promise<IResult> {

        var users = await this._service.getAll();
        var result: IResult;
        result = {
            status: 200,
            message: "Sucesso",
            data: users
        };

        return result;
    }

    @Post('create')
    create(@Body() newUser: CreateUserDto): IResult {
        var users = this._service.create(newUser);
        var result: IResult;
        result = {
            status: 200,
            message: "Sucesso",
            data: users
        };

        return result;
    }
}