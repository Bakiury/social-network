import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class SigninUserDto extends User {

    use_id?: number;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'johnabreo@gmail.com' })
    use_email: string;

    @IsString()
    @ApiProperty({ example: '123456' })
    use_password: string;
}
