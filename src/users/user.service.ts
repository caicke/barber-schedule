import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { IResult } from "src/helpers/models/result.model";
import { CreateUserDto } from "src/users/dtos/user.dto";
import { User } from "prisma/prisma-client";
import { UserModel } from "src/helpers/models/user.model";
import { PrismaService } from "src/prisma/prisma.service";
import { resolve } from "path";

@Injectable()
export class UserService {
    constructor(private _prisma: PrismaService) {}

    // users
    async getAll(): Promise<IResult> {
        let result = await this._prisma.user.findMany();

        console.log(result);

        return new Promise<IResult>((res, rej) => {
            let users = [];
            result.map(user => {
                let item: UserModel = {
                    email: user.email,
                    name: user.firstName,
                    id: user.id
                };
                users.push(item);
            })

            var dto: IResult = {
                data: users,
                status: 200,
                message: "Sucess"
            };

            
            res(dto);
        })
    }

    // users/create
    create(newUser: CreateUserDto): IResult {
        var result: IResult = {
            message: "Success",
            status: 200,
            data: []
        }

        return result;
    }
}