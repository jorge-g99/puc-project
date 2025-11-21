import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() body: { name: string; email: string; password: string; role: string }) {
    return this.userService.createUser(body.name, body.email, body.password, body.role);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
