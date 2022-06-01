import { Prisma } from "@prisma/client";

export class User implements Prisma.UserUncheckedCreateInput {
    use_id?: number;
    use_name?: string;
    use_lastname?: string;
    use_email: string;
    use_password: string;
    use_image: string;
    use_birthday: string;
    use_description: string;
    post?: Prisma.PostUncheckedCreateNestedManyWithoutUserInput;
    Comment?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    createdAt?: string | Date;
    updatedAt?: string | Date;

}