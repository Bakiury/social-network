import { Prisma } from '@prisma/client';

export class Comment implements Prisma.CommentUncheckedCreateInput {
    com_id?: number;
    com_description: string;
    com_use_id?: number;
    com_pos_id?: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;

}
