import AxiosService from "./AxiosService";

export class AuthService {

  static async signup(data: any): Promise<any> {
    return AxiosService.post({url: 'auth/signin', data});
  }

  static async login(data: any): Promise<any> {
    return AxiosService.post({url: 'auth/login', data});
  }
}