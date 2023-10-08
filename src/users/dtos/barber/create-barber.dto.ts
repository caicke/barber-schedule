import { IsNotEmpty } from "class-validator";

export class CreateBarberDto {
    @IsNotEmpty({ message: 'Deve inserir o nome do barbeiro.' })
    fullName: string;
    photoUrl: string
}