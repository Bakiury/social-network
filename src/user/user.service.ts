import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

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

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        email
      }, {
        secret: 'at-secret',
        expiresIn: 60 * 15 // 15 min
      }),

      this.jwtService.signAsync({
        sub: userId,
        email
      }, {
        secret: 'rt-secret',
        expiresIn: 60 * 60 * 24 * 7 // 1 week
      })
    ]);

    return {
      access_token: at,
      refresh_token: rt
    }
  }

  async create(createUserDto: CreateUserDto): Promise<Tokens> {
    const myPass = await bcrypt.hash(createUserDto.use_password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        use_name: createUserDto.use_name,
        use_lastname: createUserDto.use_lastname,
        use_email: createUserDto.use_email,
        use_password: myPass,
        use_image: createUserDto.use_image,
        use_birthday: createUserDto.use_birthday,
        use_description: createUserDto.use_description
      },
      include: this._include
    });

    const tokens = await this.getTokens(newUser.use_id, newUser.use_email);
    await this.updateRtHash(newUser.use_id, tokens.refresh_token);
    return tokens;
  }

  async signIn(signinUserDto: SigninUserDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        use_email: signinUserDto.use_email
      }
    });
    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await bcrypt.compare(signinUserDto.use_password, user.use_password);
    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.use_id, user.use_email);
    await this.updateRtHash(user.use_id, tokens.refresh_token);
    return tokens;
  }

  async logOut(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        use_id: userId,
        use_hashedRt: {
          not: null
        }
      },
      data: {
        use_hashedRt: null
      }
    });
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        use_id: userId
      }
    });
    if (!user || !user.use_hashedRt) throw new ForbiddenException('Access denied');

    const rtMatches = bcrypt.compare(rt, user.use_hashedRt);
    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.use_id, user.use_email);
    await this.updateRtHash(user.use_id, tokens.refresh_token);
    return tokens;
  }

  async authUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      select: {
        use_id: true,
        use_name: true,
        use_lastname: true,
        use_email: true,
        use_image: true,
        use_birthday: true,
        use_description: true
      },
      where: {
        use_id: userId
      }
    });

    return user;
  }

  async updateRtHash(userId: number, rt: string) {
    const myPass = await bcrypt.hash(rt, 10);

    await this.prisma.user.update({
      where: {
        use_id: userId
      },
      data: {
        use_hashedRt: myPass
      }
    })
  }

  findAll() {
    return this.prisma.user.findMany({
      include: this._include
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      select: {
        use_id: true,
        use_name: true,
        use_lastname: true,
        use_email: true,
        use_image: true,
        use_birthday: true,
        use_description: true,
        post: {
          orderBy: [
            {
              updatedAt: 'desc',
            },
          ],
          select: {
            pos_id: true,
            pos_title: true,
            pos_description: true,
            pos_image: true,
            updatedAt: true,
            Comment: {
              orderBy: [
                {
                  updatedAt: 'desc',
                },
              ],
              select: {
                com_description: true,
                updatedAt: true,
                user: {
                  select: {
                    use_name: true,
                    use_lastname: true,
                    use_image: true
                  }
                }
              }
            }
          }
        },
      },
      where: { use_id: id }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.use_password) {
      updateUserDto.use_password = await bcrypt.hash(updateUserDto.use_password, 10);
    }

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
