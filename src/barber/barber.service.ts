import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBarberDto } from 'src/users/dtos/barber/create-barber.dto';

@Injectable()
export class BarberService {
    constructor(private _prisma: PrismaService) {}

    async getBarbers() {
        const barbers = await this._prisma.barber.findMany({
            select: {
                id: true,
                fullName: true,
                schedules: true
            }
        })

        return barbers;
    }

    async createBarber(barber: CreateBarberDto) {
        return this._prisma.barber.create({
            data: {
                fullName: barber.fullName,
                photoUrl: barber.photoUrl
            }
        })
    }
}
