import { Injectable } from '@nestjs/common';
import { MESSAGE } from '../../constants/message';
import { User } from '../../models/user/entity/user.entity';
import { jwtEncode } from '../../utils/jwtUtils';
import { hashPassword, verifyPassword } from '../../utils/passwordUtils';
import { LoginDTO } from './dto/login.dto';
import { SigninDTO } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor() {}

  async signin(user: SigninDTO) {
    try {
      // hashing pwd before inserting t db
      const password = await hashPassword(user.password);
      const newUser = await User.save(User.create({ ...user, password }));
      delete newUser.password;
      return newUser;
    } catch (error) {
      return error;
    }
  }

  async login(data: LoginDTO) {
    const { email, password } = data;
    // get user from db
    const user = await User.findOneOrFail({
      where: {
        email: email,
      },
    }).catch(error => {throw new Error(MESSAGE.ACCOUNT_NOT_EXIST)});
    // if user exists verify password and generate a token else send error msg
    if (user) {
      const isPasswordCorrect = await verifyPassword(password, user.password);
      console.log(
        '🚀 ~ file: auth.service.ts ~ line 37 ~ AuthService ~ login ~ isPasswordCorrect',
        isPasswordCorrect,
      );
      if (isPasswordCorrect) {
        const token = this.getAccessToken(user);
        return {
          id: user.id,
          token: token,
        };
      } else {
        console.log('here');
        throw new Error(MESSAGE.INVALID_PASSWORD);
      }
    } else {
      throw new Error(MESSAGE.ACCOUNT_NOT_EXIST);
    }
  }

  getAccessToken(loggedUser: User) {
    try {
      return jwtEncode({
        id: loggedUser.id,
        name: `${loggedUser.firstname} ${loggedUser.firstname}`,
      });
    } catch (error) {
      return error;
    }
  }
}
