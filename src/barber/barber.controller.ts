import { Body, Controller, Get, Post } from "@nestjs/common";
import { BarberService } from './barber.service';
import { CreateBarberDto } from "src/users/dtos/barber/create-barber.dto";

@Controller('barbers')
export class BarberController {
    constructor(private _service: BarberService) {}

    @Get()
    async getBarbers() {
        const barbers = await this._service.getBarbers();

        return barbers;
    }

    @Post('/create')
    async createBarber(@Body() barberName: CreateBarberDto) {
        return this._service.createBarber(barberName);
    }
}
