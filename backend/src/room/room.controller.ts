import { Controller, Post, Get, Param, Body, Delete } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Post()
  create(@Body() body: { name: string; type: string; capacity?: number }) {
    return this.roomService.createRoom(body.name, body.type, body.capacity);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findById(Number(id));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomService.deleteRoom(Number(id));
  }
}
