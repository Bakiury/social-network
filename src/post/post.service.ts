import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }

  private readonly _include = {
    Comment: {
      select: {
        com_description: true
      }
    }
  }

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: createPostDto,
      include: this._include
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      orderBy: [
        {
          updatedAt: 'desc',
        },
      ],
      include: {
        Comment: {
          orderBy: [
            {
              updatedAt: 'desc',
            },
          ],
          select: {
            com_description: true,
            com_use_id: true,
            updatedAt: true,
            user: {
              select: {
                use_name: true,
                use_lastname: true,
                use_image: true
              }
            }
          }
        },
        user: {
          select: {
            use_name: true,
            use_lastname: true,
            use_image: true
          }
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { pos_id: id }
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      data: updatePostDto,
      where: { pos_id: id }
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: { pos_id: id }
    });
  }
}
