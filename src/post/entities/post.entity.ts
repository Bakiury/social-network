import { Prisma } from '@prisma/client';

export class Post implements Prisma.PostUncheckedCreateInput {
    pos_id?: number;
    pos_description: string;
    pos_title: string;
    pos_image: string;
    pos_use_id?: number;
    Comment?: Prisma.CommentUncheckedCreateNestedManyWithoutPostInput;
    createdAt?: string | Date;
    updatedAt?: string | Date;

}
