import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }

  private readonly _include = {
    user: {
      select: {
        use_name: true
      }
    },
    post: {
      select: {
        pos_description: true
      }
    }
  }

  create(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: createCommentDto,
      include: this._include
    });;
  }

  findAll() {
    return this.prisma.comment.findMany({
      include: this._include
    });
  }

  findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { com_id: id }
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      data: updateCommentDto,
      where: { com_id: id }
    });
  }

  remove(id: number) {
    return this.prisma.comment.delete({
      where: { com_id: id }
    });
  }
}
