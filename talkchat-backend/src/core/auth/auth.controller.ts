import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MESSAGE } from '../../constants/message';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { SigninDTO } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() data: SigninDTO) {
    
    if (!data.lastname || !data.firstname || !data.email || !data.password) {
      throw new HttpException(
        MESSAGE.INVALID_INPUT_PARAMS,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const newUser = await this.authService.signin(data);
      return {
        success: true,
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
      };
    }
  }

  @Post('/login')
  async login(@Body() data: LoginDTO) {
    
    if (!data.email || !data.password) {
      throw new HttpException(
        MESSAGE.INVALID_INPUT_PARAMS,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const loggedUser = await this.authService.login(data);
      console.log("🚀 ~ file: auth.controller.ts ~ line 45 ~ AuthController ~ login ~ loggedUser", loggedUser)
      return {
        success: true,
        data: loggedUser,
      };
    } catch (error) {
      console.log("🚀 ~ file: auth.controller.ts ~ line 51 ~ AuthController ~ login ~ error", error)
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
