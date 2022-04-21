import { Injectable } from '@nestjs/common';
import { userInfo } from 'os';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  private readonly _include = {
    post: {
      select: {
        pos_description: true
      }
    },
    Comment: {
      select: {
        com_description: true
      }
    }
  }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
      include: this._include
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: this._include
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { use_id: id }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: updateUserDto,
      where: { use_id: id }
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { use_id: id }
    });
  }
}
