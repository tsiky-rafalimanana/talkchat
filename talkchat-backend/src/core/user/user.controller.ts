import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../security/auth.guard';
import { CurrentUser } from '../../security/currentUser.decorator';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {

  }

  @Get('/all')
  async getAllUsers(@CurrentUser() me) {
    try {
      const users = await this.userService.getAllUsers(me);
      return {
        success: true,
        data: users,
      };
    } catch (error) {
      console.log("🚀 ~ file: user.controller.ts ~ line 22 ~ UserController ~ getAllUsers ~ error", error)
      return {
        success: false,
        message: error,
      };
    }
  }
}
