import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString } from 'class-validator';
import { Post } from '../entities/post.entity';

export class CreatePostDto extends Post {
    pos_id?: number;

    @IsString()
    @ApiProperty({ example: 'My first test' })
    pos_description: string;

    @IsString()
    @ApiProperty({ example: 'My title #1' })
    pos_title: string;

    @IsString()
    @ApiProperty({ example: 'https://images-posts.com/1' })
    pos_image: string;

    pos_use_id?: number;


    Comment?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
}
