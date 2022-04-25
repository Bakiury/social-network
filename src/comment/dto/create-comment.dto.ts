import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Comment } from '../entities/comment.entity'

export class CreateCommentDto extends Comment {
    com_id?: number;

    @IsString()
    @ApiProperty({ example: 'My first comment' })
    com_description: string;

    com_use_id?: number;

    com_pos_id?: number;
}
