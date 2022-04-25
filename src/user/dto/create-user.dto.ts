import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {

    use_id?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'John Jairo' })
    use_name: string;

    @IsString()
    @ApiProperty({ example: 'Abreo Arenas' })
    use_lastname: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'johnabreo@gmail.com' })
    use_email: string;

    @IsString()
    @ApiProperty({ example: '123456' })
    use_password: string;

    @IsString()
    @ApiProperty({ example: 'https://images.com/1' })
    use_image: string;

    @IsDate()
    @Type(() => Date)
    @ApiProperty({ example: '1999-04-19T14:21:00+02:00' })
    use_birthday: string | Date;

    @IsString()
    @ApiProperty({ example: 'I am a Software Developer in the Teleperformance Company' })
    use_description: string;


    post?: Prisma.PostUncheckedCreateNestedManyWithoutUserInput;


    Comment?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
}
