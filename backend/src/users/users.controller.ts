import { Controller, Get, Put, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Put(":id/toggle")
  async toggleUserStatus(@Param("id") id: string) {
    return this.usersService.toggleUserStatus(id);
  }
}
