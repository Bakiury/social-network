import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Tokens } from './types';
import { SigninUserDto } from './dto/signin-user.dto';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public() // It tells, don't check for access_token
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.userService.create(createUserDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.CREATED) // 201 this is the default of a Post request
  signIn(@Body() signinUserDto: SigninUserDto): Promise<Tokens> {
    return this.userService.signIn(signinUserDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK) // 200
  logOut(@GetCurrentUserId() userId: number) {
    return this.userService.logOut(userId);
  }

  @Public() // To bypass the access_token (since it was implemented globally) guard
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK) // 200
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string
  ) {
    return this.userService.refreshTokens(userId, refreshToken);
  }

  @Post('auth-user')
  authUser(@GetCurrentUserId() userId: number) {
    return this.userService.authUser(userId);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
